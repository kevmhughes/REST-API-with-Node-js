import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflickz.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user');
    });
  };

  return (
    <Container className="login-view">
      <Navbar fixed="top" variant="light" bg="light">
        <Navbar.Brand href="/">MyFlix</Navbar.Brand>
      </Navbar>
      <Row className="justify-content-center">
        <Col xs={8} sm={8} md={6} lg={4} className="form-container">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="username" 
                placeholder="Enter username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}