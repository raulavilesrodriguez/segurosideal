import React, {useState, useEffect} from 'react';
import {
    Form,
    Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { userSelector } from '../slices/User';
import {new_contact, clearNewContact, new_contactSelector} from '../slices/New_contact';
import {get_contacts} from '../slices/Contacts';

const AddContacts = () => {
    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const {pk} = useSelector(userSelector);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearNewContact());
        }
    }, [dispatch]);

    const onSubmit = (e) =>{
        e.preventDefault();
        const data = {
            name: contact, 
            phone: phone, 
            email: email, 
            creador: pk,
            token: token
        };
        dispatch(new_contact(data));
        setContact('');
        setPhone('');
        setEmail('');
    };

    const {LoadingContact, SuccessContact, ErrorContact, errorMessage} = useSelector(new_contactSelector);

    useEffect(() => {
        if (ErrorContact){
            toast.error(errorMessage);
            dispatch(clearNewContact());
        }
        if (SuccessContact) {
            dispatch(clearNewContact());
            const data = {
                pk: pk,
                token: token
            };
            dispatch(get_contacts(data));
            toast('Successfully created!', {
                icon: '😃',
            });
        }

    }, [dispatch, ErrorContact, SuccessContact, errorMessage, pk, token]);

    if (LoadingContact) return <p>Loading...</p>

    return(
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Contact Name:</Form.Label>
                <Form.Control 
                    name='name'
                    type='text'
                    value={contact}
                    required
                    onChange={e =>setContact(e.target.value)}
                    placeholder='Name'
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mobile Phone</Form.Label>
                <Form.Control 
                    name='phone'
                    type='number'
                    value={phone}
                    min="9"
                    required
                    onChange={e =>setPhone(e.target.value)}
                    placeholder='Phone'
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    name='email'
                    type='email'
                    value={email}
                    onChange={e =>setEmail(e.target.value)}
                    placeholder='Email'
                />
            </Form.Group>
            <Button type='submit' variant="primary">Save</Button>
        </Form>

        );
}

export default AddContacts;