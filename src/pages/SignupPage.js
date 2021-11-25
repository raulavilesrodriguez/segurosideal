import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {signupUser, signupSelector, clearSignup} from '../slices/Signup';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    Form,
    Button,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    

    const onSubmit = e => {
        e.preventDefault();
        const user = {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
        };
        dispatch(signupUser(user));
    };
    const {isLoading, isSuccess, isError, errorMessage} = useSelector(signupSelector);
    console.log(isSuccess);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearSignup());
            history.push('/');
        }
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearSignup());
        }
    }, [isSuccess, isError, dispatch, history, isLoading, errorMessage]);


    return (
        <Fragment>
            <Container>
                {isLoading === false && <h1>Signup</h1>}
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control 
                                name='username'
                                type='text'
                                value={username}
                                required
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter an username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            name='email'
                            type='email'
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            name='password1'
                            type="password"
                            value={password1}
                            required
                            onChange={e => setPassword1(e.target.value)}
                            placeholder="Enter an password"
                            
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control 
                            name='password2'
                            type="password"
                            value={password2}
                            required
                            onChange={e => setPassword2(e.target.value)}
                            placeholder="Confirm password"
                    
                        />
                    </Form.Group>
                    <Button type='submit' variant="primary">Signup</Button>
                </Form>
            </Container>
        </Fragment>
    );

};

export default Signup;