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
import { putcustomer, putcustomerSelector, clearPutCustomer} from "../slices/PutCustomer";
import { getcustomer } from "../slices/Getcustomer";
import {getplans, plansSelector} from '../slices/Plans';

export const ModalUpCustomer = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const contact_id = props.contact;
    const customer_id = props.customer;
    const planes = props.planes;
    var planid = [];

    for (let i=0; i<planes.length; i++) {
        planid.push(planes[i].id);
    };

    const [payment, setPayment] = useState(props.payment);
    const [age, setAge] = useState(props.age);
    const [planesOption, setPlanesOption] = useState(planid);
    const [carga, setCarga] = useState(0);

    useEffect(()=>{
        dispatch(getplans({token}));
    }, [dispatch, token, contact_id]);

    const {plans} = useSelector(plansSelector);

    // Multilple plan selected
    function addSelectedPlans(event) {
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value);
        setPlanesOption(selectedOptions);
    };
    
    const OnSubmit = (e) => {
        e.preventDefault();
        const cliente = {
            contacto: contact_id,
            planes: planesOption,
            payment: payment,
            age: age,
            customer_id: customer_id,
            token:token
        };
        dispatch(putcustomer(cliente));
        //window.location.reload(false);
        props.onHide();
        
    };
  
    const {SuccessPutCustomer} = useSelector(putcustomerSelector);
    console.log('Veamos si actualiza Customer',SuccessPutCustomer);
    useEffect(() => {
        if(SuccessPutCustomer) {
            setCarga(1);
            dispatch(clearPutCustomer());
        }
    }, [SuccessPutCustomer, dispatch]);
    
    useEffect(() => {
        if(contact_id && carga) {
            dispatch(getcustomer({contact_id, token}));
        }
    }, [carga, contact_id, token, dispatch]);
    
    console.log('Veamos la carga Customer', carga);

    return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Customer 🖌️
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
                                    defaultValue = {planes.map(plan =>plan.id)}
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