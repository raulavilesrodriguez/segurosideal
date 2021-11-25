import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
    Form,
    Col,
    Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import {new_contact} from '../slices/New_contact';
import {get_contacts} from '../slices/Contacts';
import { graphcontacts } from "../slices/GraphContacts";

export const ModalNewContact = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const pk = props.creador;

    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [load, setLoad] = useState(false);

    const OnSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: contact, 
            phone: phone, 
            email: email, 
            creador: pk,
            token: token
        };
        setLoad(true);
        dispatch(new_contact(data));
        setContact('');
        setPhone('');
        setEmail('');
        props.onHide();
    };

    useEffect(() => {
        if (load) {
            dispatch(get_contacts({pk, token}));
            dispatch(graphcontacts({pk}));
            setLoad(false);
        }
    }, [dispatch, load, pk, token]);

    return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New Contact 👥 📜
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={OnSubmit}>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Name:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                    name='name'
                                    type='text'
                                    value={contact}
                                    required
                                    onChange={e => setContact(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Phone:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                name='phone'
                                type='text'
                                value={phone}
                                required
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Email:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    name='email'
                                    type= 'email'
                                    value={email}
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type='submit' variant="primary">Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
};