import React from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Infomodal = (props) => {
    
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.plan} 🧶
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Plan Detail of {props.company}</h4>
                <p>💵 Deducible USD$: {props.deducible}</p>
                <p>🛢️ Coverage USD$: {props.coverage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};

