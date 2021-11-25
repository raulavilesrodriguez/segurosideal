import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
    Form,
    Col,
    Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch} from 'react-redux';
import {putcontact} from '../slices/PutContact';
import { getcontact} from "../slices/Contact";

export const ModalUpContact = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const contact_id = props.contact;
    const creador = props.creador;
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [actualiza, setActualiza] = useState(false);

    const nameinicial = props.name;
    const phoneinicial = props.phone;
    const emailinicial = props.email;
    console.log('Nombre Contacto', nameinicial);

    useEffect(()=>{
        setName(nameinicial);
        setPhone(phoneinicial);
        setEmail(emailinicial);
    }, [nameinicial, phoneinicial, emailinicial]);

    const OnSubmit = (e) => {
        e.preventDefault();
        setActualiza(true);
        const contacto = {
            name:name,
            phone: phone,
            email: email,
            creador: creador,
            contact_id: contact_id,
            token:token
        };
        dispatch(putcontact(contacto));
        props.onHide();
    };

    useEffect(() => {
        if (contact_id) {
            dispatch(getcontact({contact_id, token}));
            setActualiza(false);
        }
    }, [actualiza, contact_id, token, dispatch]);
    
    console.log('Veamos si Actualiza Contacto', actualiza);

    
    return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Contact 🖍️
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
                                    value={name}
                                    required
                                    onChange={e => setName(e.target.value)}
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