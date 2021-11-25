import React, {useEffect, useState} from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector} from 'react-redux';
import {deletecustomer, deletecustomerSelector, clearDelete} from '../slices/DeleteCustomer';
import { getcontact } from "../slices/Contact";
import { getcustomer } from "../slices/Getcustomer";
import Alert from '@material-ui/core/Alert';

export const ModalDeleteCustomer = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const contact_id = props.contact;
    const customer_id = props.customer;
    const [actualizar, setActualizar] = useState(0);
    
    const OnSubmit = (e) => {
        e.preventDefault();
        const cliente = {
            customer_id:customer_id,
            token:token
        }
        dispatch(deletecustomer(cliente));
        props.onHide();
    };


    const {successMessage} = useSelector(deletecustomerSelector);
    console.log('Que dice Delete Customer', successMessage);
    useEffect(()=> {
        if(successMessage) {
            setActualizar(1);
            dispatch(clearDelete());
        }
    }, [successMessage, dispatch]);
    
    console.log(actualizar);
    useEffect(() => {
        if (contact_id && actualizar) {
            dispatch(getcustomer({contact_id, token}));
            dispatch(getcontact({contact_id, token}));
            console.log('holaa Delete');
        }
    }, [dispatch, contact_id, token, actualizar]);

        
    return(
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Customer 💔
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="warning">
                    Are you sure you want to delete this customer 😲?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={OnSubmit}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
};

