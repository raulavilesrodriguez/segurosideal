import React, {useState, useEffect} from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {deletecontact} from '../slices/DeleteContact';
import Alert from '@material-ui/core/Alert';
import { userSelector, UserInfo} from '../slices/User';
import {get_contacts} from '../slices/Contacts';

export const ModalDeleteContact = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = localStorage.getItem('token');
    const contact_id = props.contact;
    const [load, setLoad] = useState(false);

    useEffect(() => {
        dispatch(UserInfo({token: token}));
    }, [dispatch, token]);

    const {pk} = useSelector(userSelector);

    const OnSubmit = (e) => {
        e.preventDefault();
        const contacto = {
            contact_id:contact_id,
            token:token
        }
        dispatch(deletecontact(contacto));
        setLoad(true);
        props.onHide();
    };

    useEffect(() => {
        if (load) {
            dispatch(get_contacts({pk, token}))
            history.push('/');
            setLoad(false);   
        }
    }, [load, history, dispatch, pk, token]);

    return(
        <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Contact 💔
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="warning">
                    Are you sure you want to delete this contact 😲?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button className="modalbutton" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={OnSubmit}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
};

