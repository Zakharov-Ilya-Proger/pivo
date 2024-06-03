import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginForm.css';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://pivo.onrender.com/login', {
      email: email,
      password: password
    })
      .then(function (response) {
        console.log(response);
        const token = response.data.token;
        const userFio = response.data.fio;
        const userGroup = response.data.group;
        localStorage.setItem('token', token);
        localStorage.setItem('userFio', userFio); 
        localStorage.setItem('userGroup', userGroup);
        console.log(token)
        console.log('data saved x1');
        onLogin(token);
        navigate('/user');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFio');
    console.log('data deleted x1')
  }, []);

  return (
    <Container className="login-container">
      <Row>
        <Col className="login-logo-container">
          <Image src="mirealogo_xd.png" fluid className="login-logo" />
        </Col>
        <Col>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label className="login-label">Введите почту:</Form.Label>
              <Form.Control type="email" placeholder="вашапочта@почта.ваша" className="login-input" value={email} onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="login-label">Введите пароль:</Form.Label>
              <Form.Control type="password" placeholder="********" className="login-input" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button">
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;