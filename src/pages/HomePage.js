import React, { Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { userSelector, UserInfo, clearUser } from '../slices/User';
import 'bootstrap/dist/css/bootstrap.min.css';
import {List} from '../components/List';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Stack from '@material-ui/core/Stack';
import { ModalNewContact } from '../components/ModalNewContact';
import Hi from '../assets/emo.gif';
import { graphcontacts, gcontactsSelector } from '../slices/GraphContacts';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
  import {clearNewContact, new_contactSelector} from '../slices/New_contact';
  import toast from 'react-hot-toast';
  import {get_contacts} from '../slices/Contacts';

const HomePage = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const [contacttotal, setContactTotal] = useState(0);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(UserInfo({token: localStorage.getItem('token')}));
        }
    }, [dispatch]);
    
    
    const {username, email, pk, isErrorUser, isSuccess, isLoading} = useSelector(userSelector);
    
    useEffect(() => {
        if (isErrorUser) {
            dispatch(clearUser());
            history.push('/login');
        }
    }, [isErrorUser, dispatch, history])

    const token = localStorage.getItem('token');
    

    const Total = (contacts) => {
        var contactos = contacts.length;
        useEffect(() => {
            setContactTotal(contactos);
        }, [contactos])
    };
    
    var today = new Date().toLocaleDateString();

    const handleShow = () =>{
        setModalShow(true);
    };

    const handleClose = () => setModalShow(false);

    useEffect(() => {
        if(isSuccess){
            dispatch(graphcontacts({pk}))
        }
    }, [dispatch, pk, isSuccess]);

    const {Gcontacts} = useSelector(gcontactsSelector);
    console.log(Gcontacts);

    const {SuccessContact, ErrorContact, errorMessage} = useSelector(new_contactSelector);

    useEffect(() => {
        if (ErrorContact){
            toast.error(errorMessage);
            dispatch(clearNewContact());
        }
        if (SuccessContact) {
            dispatch(clearNewContact());
            const data = {
                pk: pk,
                token: token
            };
            dispatch(get_contacts(data));
        }

    }, [dispatch, ErrorContact, SuccessContact, errorMessage, pk, token]);

    return (
        <div className="container contacts">
            {isLoading ? (
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            ): (
                <Fragment>
                    <div className="row int-contacts">
                        <div className="col-lg-3">
                            <Box
                                className="contacts-indicators"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 220,
                                    height: 200,
                                    },
                                }}
                            >
                                <Paper>
                                    <h3 className="title-contacts">Profile of User</h3>
                                    <Stack spacing={2}>
                                        <Avatar alt="User" src={Hi} className="avatar-user"/>
                                        <div className="div-user">
                                            <p>Name: {username}</p>
                                            <p>Email: {email}</p>
                                        </div>
                                    </Stack>
                                </Paper>
                            </Box>
                        </div>
                        <div className="col-lg-3">
                            <Box
                                className="contacts-indicators"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 220,
                                    height: 200,
                                    },
                                }}
                            >
                                <Paper>
                                    <h3 className="title-contacts">Contacts</h3>
                                    <div className="div-contacts">
                                        <h1>{contacttotal}</h1>
                                        <p>on {today}</p>
                                    </div>
                                    <Button onClick={()=>handleShow()} className="btn-contacts">
                                            Add New Contact
                                    </Button>
                                </Paper>
                                <ModalNewContact 
                                    show={modalShow}
                                    onHide={handleClose}
                                    creador={pk}
                                />
                            </Box>
                        </div>
                        <div className="col-lg-6">
                            <Box
                                className="contacts-chart"
                                sx={{
                                    '& > :not(style)': {
                                    m: 1,
                                    },
                                }}
                            >
                                <Paper>
                                    <h3 className="title-contacts">Contacts over Time</h3>
                                    <ResponsiveContainer width="95%" height={160}>
                                        <LineChart
                                            //width={600}
                                            //height={210}
                                            data={Gcontacts}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="5 5" />
                                            <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }}/>
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="TotalContacts"
                                                stroke="#150E56"
                                                activeDot={{ r: 8 }}
                                            />  
                                        </LineChart>
                                    </ResponsiveContainer> 
                                </Paper>
                            </Box>
                        </div>
                    </div>
                </Fragment>     
            )}
            <div className="row int-contacts">
                <div className="col-lg-12">
                    <Box
                        className="contacts-table"
                        sx={{
                            '& > :not(style)': {
                            m: 1,
                            },
                        }}
                    >
                        {isSuccess ? <List pk={pk} token={token} total={Total}/> : null}
                    </Box>
                </div>
            </div>
        </div>       
    );
};

export default HomePage;