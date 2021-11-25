import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
    Form,
    Col,
    Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import {getplans, plansSelector} from '../slices/Plans';
import { newcustomer} from "../slices/Newcustomer";
import { getcontact } from "../slices/Contact";
import { getcustomer } from "../slices/Getcustomer";


export const ModalCustomer = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const contact_id = props.contact;
    
    const [payment, setPayment] = useState('');
    const [age, setAge] = useState('');
    const [planesOption, setPlanesOption] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        dispatch(getplans({token}))
    }, [dispatch, token]);

    const {plans} = useSelector(plansSelector);

    // Multilple plan selected
    function addSelectedPlans(event) {
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value);
        setPlanesOption(selectedOptions);
    };

    const OnSubmit = (e) => {
        e.preventDefault();
        const customer = {
            contacto:contact_id,
            planes:planesOption,
            payment:payment,
            age:age,
            token:token
        };
        dispatch(newcustomer(customer));
        setLoad(true);
        props.onHide();
        window.location.reload();
    };

    useEffect(()=>{
        if(load && contact_id) {
            dispatch(getcustomer({contact_id, token}));
            dispatch(getcontact({contact_id, token}));
            setLoad(false);
        }
    }, [dispatch, load, contact_id, token]);

    
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Make it Customer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={OnSubmit}>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Payment (USD):</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                    name='payment'
                                    type='number'
                                    value={payment}
                                    required
                                    onChange={e => setPayment(e.target.value)}
                                    placeholder="Enter an Payment"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Age:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                name='age'
                                type='number'
                                value={age}
                                required
                                onChange={e => setAge(e.target.value)}
                                placeholder="Enter the customer's age"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={2}>Plans:</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="select" 
                                    multiple 
                                    required
                                    onChange={e => addSelectedPlans(e)}
                                >
                                    {plans.map(item => (
                                        <option key={item.id} value={item.id}>{item.plan} - {item.company}</option>
                                    ))}
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