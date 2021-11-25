import React, {useEffect, useState, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import {getplans, plansSelector} from '../slices/Plans';
import Loader from 'react-loader-spinner';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { Infomodal } from '../components/Modal';
import Bmi from '../assets/BMI3.png';
import Salud from '../assets/SALUD.jpg';
import Confiamed from '../assets/Confiamed.jpg';


export const PlansPage = () =>{
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        dispatch(getplans({token}))
    }, [dispatch, token]);

    const {loadingPlans, errorsPlans, plans} = useSelector(plansSelector);
    const [modalShow, setModalShow] = useState(false);
    const [plan, setPlan] = useState('');
    const [deducible, setDeducible] = useState('');
    const [coverage, setCoverage] = useState('');
    const [company, setCompany] = useState('');
    
    const handleShow = (plan, deducible, coverage, company) => {
        setModalShow(true);
        setPlan(plan);
        setDeducible(deducible);
        setCoverage(coverage);
        setCompany(company);
    }
    const handleClose = () => setModalShow(false);


    return(
        <div className="container plans">
            <h1>Plans</h1>
            {loadingPlans === true && <Loader type="Puff" color="#00BFFF" height={100} width={100} />}
            {errorsPlans === true && <h2>Error to load Insurance Plans</h2>}
            <List className="plan-page">
                {plans.map(item =>(
                    <ListItem className="list-item" key={item.id} 
                    onClick={()=>handleShow(item.plan, item.deducible, item.coverage, item.company)}>
                        <ListItemAvatar>
                            <Avatar alt="plan" 
                            src={
                                item.company === 'BMI' ? Bmi 
                                : item.company==='SALUD' ? Salud 
                                : item.company ==='CONFIAMED' ? Confiamed
                                : null
                            } 
                            />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={item.company}
                            secondary={
                                <Fragment>
                                    <Typography
                                        component={'span'}
                                        varaint={'body2'}
                                        className="inline"
                                        color="textPrimary"
                                    >
                                        <strong>{item.plan}</strong>
                                    </Typography>
                                    {`Coverage: USD${item.coverage}`}
                                </Fragment>
                            }
                        />   
                    </ListItem>
                ))}
            </List>
            <Infomodal 
                show={modalShow} 
                onHide={handleClose} 
                plan={plan}
                deducible={deducible}
                coverage={coverage}
                company={company}
            />
        </div>
    )
};