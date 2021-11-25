import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {getcontactSelector, getcontact} from '../slices/Contact';
import Loader from 'react-loader-spinner';
import qs from "qs";
import { createBrowserHistory } from 'history';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/core/Alert';
import { ModalCustomer } from '../components/ModalCustomer';
import {getcustomerSelector, getcustomer} from '../slices/Getcustomer';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { ModalUpContact } from '../components/ModalUpContact';
import { ModalDeleteContact } from '../components/ModalDeleteContact';
import { ModalUpCustomer } from '../components/ModalUpCustomer';
import {ModalPlansCustomer} from '../components/ModalPlansCustomer';
import { ModalDeleteCustomer } from '../components/ModalDeleteCustomer';

export const ContactProfile = () => {
    const [contact_id, setContactId] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [modalUpContact, setModalUpContact] = useState(false);
    const [modalDeleteContact, setModalDeleteContact] = useState(false);
    const [modalUpCustomer, setModalUpCustomer] = useState(false);
    const [plansCustomer, setPlansCustomer] = useState(false);
    const [modalDeleteCustomer, setModalDeleteCustomer] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const traer = createBrowserHistory();
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const filterParams = traer.location.search.substr(1);
        const filtersFromParams = qs.parse(filterParams);
        if (filtersFromParams.contactid) {
          setContactId(Number(filtersFromParams.contactid));
        }
      }, [traer]);    
    
    console.log('Contact id', contact_id);  
    

    useEffect(() => {
        if (contact_id) {
            dispatch(getcontact({contact_id, token}));
        }    
    }, [dispatch, contact_id, token]);
    
    const {loadingContact, successContact, errorsContact, contact} = useSelector(getcontactSelector);

    useEffect(() =>{
        if(errorsContact) {
            history.push('/login');
        }
    }, [errorsContact, history]);

    //Show Modal Customer
    const handleShow = () => {
        setModalShow(true);
    };

    // Hide Modal Customer
    const handleClose = () => setModalShow(false);
    
    useEffect(() => {
        if (contact_id) {
            dispatch(getcustomer({contact_id, token}));
        } 
    }, [dispatch, contact_id, token]);

    const {successCustomer, errorsCustomer, customer} = useSelector(getcustomerSelector);

    console.log('errorCustomer', errorsCustomer);
    console.log('successCustomer', successCustomer);
     
    //Show Modal Up Contact
    const showUpContact = () => {
        setModalUpContact(true);
    };
    // Hide Modal Up Contact
    const closeUpContact = () => setModalUpContact(false); 

    // Show Modal Delete Contact
    const showDeleteContact = () => {
        setModalDeleteContact(true);
    };
    // Hide Modal Delete Contact
    const closeDeleteContact = () => setModalDeleteContact(false);

    // Show Modal Up Customer
    const showUpCustomer = () => {
        setModalUpCustomer(true);
    };
    // Hide Modal Up Customer
    const closeUpCustomer = () => setModalUpCustomer(false);

    // Show Modal Plans Customer
    const showPlansCustomer = () => {
        setPlansCustomer(true);
    };
    // Hide Modal Plans Customer
    const closePlansCustomer = () => setPlansCustomer(false);

    // Show Modal Delete Customer
    const showDeleteCustomer = () => {
        setModalDeleteCustomer(true);
    };
    // Hide
    const closeDeleteCustomer = () => setModalDeleteCustomer(false);

    return(
        <div className="container profile">
            {loadingContact === true && <Loader type="Puff" color="#00BFFF" height={100} width={100} />}
            {successContact === true ? (
                <Fragment>
                    <div className="row int-profile">
                        <div className="col-lg-6">
                            <Box
                                sx={{
                                    
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 300,
                                    height: 220,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h3 className="title-contacts">Profile to {contact.contact.name}</h3>
                                    <ul>
                                        <li>Name: {contact.contact.name}</li>
                                        <li>Phone: {contact.contact.phone}</li>
                                        <li>Email: {contact.contact.email}</li>
                                        <li>Record: {contact.contact.timestamp}</li>
                                        <li>Customer: {contact.contact.iscustomer ? (
                                            <Fragment>
                                                <span>Is Customer😃</span>
                                                <ModalUpContact 
                                                    show={modalUpContact}
                                                    onHide={closeUpContact} 
                                                    contact={contact_id}
                                                    name = {contact.contact.name}
                                                    phone = {contact.contact.phone}
                                                    email = {contact.contact.email}
                                                    creador = {contact.contact.creador}
                                                />
                                                <ModalDeleteContact 
                                                    show={modalDeleteContact}
                                                    onHide={closeDeleteContact}
                                                    contact={contact_id}
                                                />  
                                            </Fragment>
                                        ): (
                                            <Fragment>
                                                <span>No is Customer😔</span>
                                                <ModalDeleteContact 
                                                    show={modalDeleteContact}
                                                    onHide={closeDeleteContact}
                                                    contact={contact_id}
                                                />
                                            </Fragment>  
                                        )}</li>
                                    </ul>
                                    {contact.contact.iscustomer ? (
                                        <Fragment>
                                            <Button onClick={()=>showUpContact()}>Edit Contact</Button>
                                            <Button onClick={() =>showDeleteContact()}>Delete Contact</Button>
                                        </Fragment>
                                       
                                    ):(
                                        <Fragment>
                                            <Button onClick={()=>handleShow()}>Make Customer</Button>
                                            <Button onClick={() =>showDeleteContact()}>Delete Contact</Button>
                                        </Fragment>
                                    )}
                                </Paper>
                            </Box>
                        </div>
                        {
                            successCustomer === true ? (
                                <div className="col-lg-6">
                                    <Box
                                        sx={{
                                            
                                            '& > :not(style)': {
                                            m: 1,
                                            width: 300,
                                            height: 220,
                                            },
                                        }}
                                    >
                                        <Paper elevation={2}>
                                            <h3 className="title-contacts">Customer Information</h3>
                                            <ul>
                                                <li>Payment USD: {customer.payment}</li>
                                                <li>Age: {customer.age}</li>
                                                <li>Plans:<Button onClick={()=>showPlansCustomer()}>Plans 😁</Button></li>
                                            </ul>
                                            <Alert severity="success" className="alert-cprofile">
                                                 Is added to your profitability
                                            </Alert>
                                            <Button onClick={()=>showUpCustomer()}>Edit Customer</Button>
                                            <Button onClick={()=>showDeleteCustomer()}>Delete Customer</Button>
                                        </Paper>
                                    </Box>
                                    <ModalUpCustomer 
                                        show={modalUpCustomer}
                                        onHide={closeUpCustomer}
                                        contact={contact_id}
                                        planes={customer.planes}
                                        payment={customer.payment}
                                        age={customer.age}
                                        customer={customer.id}
                                    />
                                    <ModalPlansCustomer 
                                        show={plansCustomer}
                                        onHide={closePlansCustomer}
                                        planes={customer.planes}
                                    />
                                    <ModalDeleteCustomer 
                                        show={modalDeleteCustomer}
                                        onHide={closeDeleteCustomer}
                                        contact={contact_id}
                                        customer={customer.id}
                                    />
                                </div>
                            ) : (
                                <div className="col-lg-6">
                                    <Box
                                        sx={{
                                            
                                            '& > :not(style)': {
                                            m: 1,
                                            width: 300,
                                            height: 220,
                                            },
                                        }}
                                    >
                                        <Paper elevation={2}>
                                            <h4 className="title-contacts">{contact.contact.name} is not customer</h4>
                                            <ul>
                                                <li>Payment USD: 😒</li>
                                                <li>Age: ⏲️</li>
                                                <li>Plans: 📜 </li>
                                            </ul>
                                            <Alert severity="error">
                                                If the contact is not a customer, your profitability is 0 for this contact.
                                            </Alert>
                                        </Paper>
                                    </Box>
                                </div>
                            )
                        }
                    </div>
                    <div className="row int-profile">
                        <div className="col-lg-6">
                            <Box
                                sx={{
                                            
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 300,
                                    height: 350,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h4 className="title-contacts">Coverage of Plans (USD):</h4>
                                    <BarChart
                                        width={300}
                                        height={300}
                                        data={customer.planes}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 15
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="plan" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend wrapperStyle={{top: 280, left: 25}}/>
                                        <Bar dataKey="coverage" fill="#700B97" /> 
                                    </BarChart>
                                </Paper>
                            </Box>
                        </div>
                        <div className="col-lg-6">
                            <Box
                                sx={{
                                            
                                    '& > :not(style)': {
                                    m: 1,
                                    width: 300,
                                    height: 350,
                                    },
                                }}
                            >
                                <Paper elevation={2}>
                                    <h4 className="title-contacts">Deducible of Plans (USD):</h4>
                                    <BarChart
                                        width={300}
                                        height={300}
                                        data={customer.planes}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 15
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="plan" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend wrapperStyle={{top: 280, left: 25}}/>
                                        <Bar dataKey="deducible" fill="#FF0000" /> 
                                    </BarChart>
                                </Paper>
                            </Box>
                        </div>
                    </div>
                </Fragment>    
            ):(
                <Fragment>
                    {errorsContact === true && <h2>Error to load this profile contact</h2>}
                </Fragment>
            )}
            
           <ModalCustomer 
                show={modalShow}
                onHide={handleClose} 
                contact={contact_id}
           />  
        </div>
        )
};
