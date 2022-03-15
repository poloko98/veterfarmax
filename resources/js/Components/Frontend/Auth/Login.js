import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import Header from "../../../Layouts/Frontend/Head";
import Topbar from "../../../Layouts/Frontend/TopBar";
import axios from 'axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import NavbarF from "../../../Layouts/Frontend/Navbar";

function Login() {

    const history = useHistory();
    const [loginInput, SetloginInput] = useState({ email: '', password: '', error_list: [] })

    const handleInput = (e) => {
        e.persist();
        SetloginInput({ ...loginInput, [e.target.name]: e.target.value })
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`, data).then(res => {

                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    new swal("Logeado!", res.data.message, "success");
                    history.push('/');
                }
                else if (res.data.status === 401) {
                    new swal("Error!", res.data.message, "error");
                }
                else {
                    SetloginInput({ ...loginInput, error_list: res.data.validation_errors });
                };
            });
        });

    }



    return (
        <div>

            <Container >

                <div>



                    <Card >
                        <Card.Img variant="top" src="" />
                        <Card.Body>

                            <Form onSubmit={loginSubmit}>
                                <Row >
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label >Correo Electronico</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Ingrese su email" onChange={handleInput} value={loginInput.email} />
                                        <span>{loginInput.error_list.email}</span>
                                    </Form.Group>
                                </Row>
                                <Row >
                                    <Form.Group
                                        controlId="formGridPassword">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="password" onChange={handleInput} value={loginInput.password} />
                                        <span>{loginInput.error_list.password}</span>
                                    </Form.Group>
                                </Row>
                                <br />
                                <Button variant="primary" type="submit">
                                    Iniciar Sesion
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </div>


            </Container>
        </div>
    )
}

export default Login;