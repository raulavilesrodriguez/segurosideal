import React from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Dashboardmodal = (props) => {
    
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Indicators 📈
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>😉Average age of customers: {props.age} years</li>
                    <li>💳Average payment of customers USD: ${props.payment}</li>
                    <li>💚Average coverage of customers USD: ${props.coverage}</li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};