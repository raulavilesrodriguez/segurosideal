import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearState, loginSelector } from '../slices/login';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import {
    Form,
    Button,
    Container
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          dispatch(clearState());
        };
      }, [dispatch]);
    
    const onSubmit = (e) =>{
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        dispatch(loginUser(user))
    };

    const { isLoading, isSuccess, isError, errorMessage } = useSelector(loginSelector);

    useEffect(() => {
        if (isError) {
          toast.error(errorMessage);
          dispatch(clearState());
        }
    
        if (isSuccess) {
          dispatch(clearState());
          history.push('/');
        }
    }, [isError, isSuccess, dispatch, errorMessage, history]);

    return (
        <Fragment>
            <Container className="login-page">
                {isLoading === false && <h1>Login</h1>}
                {isLoading === false && (
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                name='username'
                                type='text'
                                value={username}
                                required
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                name='password'
                                type='password'
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                                placeholder = "Enter your password"
                            />
                        </Form.Group>
                        <Button type='submit' variant="primary">Login</Button>
                    </Form>
                )}
            </Container>
        </Fragment>
        );
};

export default Login;