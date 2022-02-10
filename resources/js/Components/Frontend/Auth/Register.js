import React, {useState} from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import Header from "../../../Layouts/Frontend/Head";
import Topbar from "../../../Layouts/Frontend/TopBar";
import axios from 'axios';
import swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import NavbarF from "../../../Layouts/Frontend/Navbar";


function Register() {
    
    const history = useHistory();
    const [registerInput,SetregisterInput] = useState({nombre:'',apellido:'',email:'',password:'',telefono:'',error_list:[]})
    
    const handleInput = (e) => {
        e.persist();
        SetregisterInput({...registerInput, [e.target.name]: e.target.value })
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            nombre: registerInput.nombre,
            apellido:registerInput.apellido,
            email: registerInput.email,
            password:registerInput.password,
            telefono:registerInput.telefono
        }

        axios.get('/sanctum/csrf-cookie').then(response =>{
            axios.post(`/api/register`,data).then(res =>{
                if(res.data.status === 200){
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    new swal("Creado!",res.data.message,"success");
                    history.push('/');
                }
                else{
                    SetregisterInput({...registerInput,error_list:res.data.validation_errors});
                }
            });
        });
        
    }
    return (
        <div>
            <Topbar />
            <Header />
            <NavbarF/>

            <Container >

                <div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <Card style={{ width: '70rem' }}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>Registro</Card.Title>
                            <Form onSubmit = {registerSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Nombre</Form.Label>
                                        <Form.Control  name = "nombre" placeholder="Ingrese su nombre" onChange={handleInput} value={registerInput.nombre}/>
                                        
                                        <span>{registerInput.error_list.nombre}</span>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="name" name = "apellido" placeholder="Apellido" onChange={handleInput} value={registerInput.apellido} />
                                        <span>{registerInput.error_list.apellido}</span>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label column="sm" lg={2}>Email</Form.Label>
                                        <Form.Control type="email" name = "email" placeholder="Ingrese email" onChange={handleInput} value={registerInput.email} />
                                        
                                        <span>{registerInput.error_list.email}</span>
                                    </Form.Group>
                                   

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" name = "password" placeholder="password" onChange={handleInput} value={registerInput.password} />
                                        <span>{registerInput.error_list.password}</span>
                                    </Form.Group>
                                </Row>

                                {/* <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control placeholder="1234 Main St" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Direccion 2</Form.Label>
                                    <Form.Control placeholder="Torre, piso, block..." />
                                </Form.Group>*/}

                                <Row className="mb-3">
                                    {/*
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Select>
                                         </Form.Group>
                                         */}
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control type="" name = "telefono" placeholder="Telefono" onChange={handleInput} value={registerInput.telefono} />
                                        <span>{registerInput.error_list.telefono}</span>
                                    </Form.Group>
                                </Row>




                                <Button variant="primary" type="submit">
                                    Registrar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </div>


            </Container>

        </div>
    )
}

export default Register;