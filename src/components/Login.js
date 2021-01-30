import React, { useState, useEffect } from 'react';
import {
  Alert, Button, Card, Form,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Header } from './template/Header';
import api from '../services/api';
import { logout } from '../utils/logout';

function Copy () {
  const date = new Date();
  return (
    <div className="copyright">
      Anodita Controller v2.0 |
      Copyright
      &copy;
      {' '}
      {date.getFullYear()}
      {' '}
      -
      {' '}
      <a href="https://github.com/mraicunha/" rel="noopener noreferrer" target="_blank">Mrai</a>
    </div>
  );
}

export function Login () {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    logout();
    document.getElementById('email').focus();
  }, []);

  function handleChangeValues (event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    const element = document.getElementById('formLogin');
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setLoading(true);
      api.post('/sessions', { email: values.email, password: values.password })
        .then((res) => {
          setInvalid(false);
          element.classList.remove('formLoginError');
          api.get('/updateanoditas');
          localStorage.setItem('logged', res.data.logged);
          localStorage.setItem('roles', `["${res.data.roles}"]`);
          document.cookie = `roles=${res.data.role}`;
          history.push('/app');
        })
        .catch(() => {
          setLoading(false);
          setInvalid(true);
          element.classList.add('formLoginError');
          setError(true);
          setTimeout(() => {
            setError(false);
            element.classList.remove('formLoginError');
          }, 10000);
        });
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="loader-background">
          <div className="loader">Loading...</div>
        </div>
      ) : null}
      <div className="content-login">
        {error ? (
          <Alert variant="danger" onClose={() => setError(() => setError(false))} dismissible>
            <Alert.Heading>
              <h5>Ocorreu um erro ao realizar o login</h5>
            </Alert.Heading>
            <p>
              E-mail ou senha incorretos.
            </p>
          </Alert>
        ) : null}
        <Card style={{ width: '23rem' }}>
          <Card.Header className="bold">Basic Login - Login</Card.Header>
          <Card.Body>
            <Form id="formLogin" noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  required
                  isInvalid={invalid}
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChangeValues}
                  placeholder="Entre com seu e-mail"
                />
                {
                  invalid
                    ? (
                      <Form.Control.Feedback type="invalid" />
                    )
                    : (
                      <Form.Control.Feedback type="invalid">
                        Por favor entre com o e-mail
                      </Form.Control.Feedback>
                    )
                }
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  required
                  name="password"
                  isInvalid={invalid}
                  values={values.password}
                  onChange={handleChangeValues}
                  type="password"
                  placeholder="Senha"
                />
                {
                  invalid
                    ? (
                      <Form.Control.Feedback type="invalid" />
                    )
                    : (
                      <Form.Control.Feedback type="invalid">
                        Por favor entre com o e-mail
                      </Form.Control.Feedback>
                    )
                }
              </Form.Group>
              <Button className="btn-anoditac bold" block type="submit">Login</Button>
            </Form>
          </Card.Body>
        </Card>
        <Copy />
      </div>
    </>
  );
}
