import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function Direccion() {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [direccion, setDireccion] = useState([]);
    const [error, setError] = useState([]);

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        new swal("Warning", "Inicie sesion para ingresar a al carro de compras");
    }

    const [checkoutInput, setCheckout] = useState({
        nombre: '',
        direccion: '',
        comuna: '',
        region: '',
    });

    const handleInput = (e) => {
        e.persist();
        setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const submitDireccion = (e) => {
        e.preventDefault();

        const data = {
            nombre: checkoutInput.nombre,
            direccion: checkoutInput.direccion,
            comuna: checkoutInput.comuna,
            region: checkoutInput.region,
        }

        const formData = new FormData();
        formData.append("direccion", checkoutInput.direccion);
        formData.append("nombre", checkoutInput.nombre);
        formData.append("comuna", checkoutInput.comuna);
        formData.append("region", checkoutInput.region);

        axios.post(`/api/agregar-direccion`, formData).then(res => {
            if (res.data.status === 200) {
                new swal("direccion agregada", res.data.message, "success");
                setError([]);
                
            } else if (res.data.status === 422) {
                new swal("Debe ingresar todos los campos", "", "error");
                setError(res.data.errors);
            }
        })
    }

    return (
        <div>
            <div className="py-4" >
                <Container fuild>
                    <Row>
                        <div className="col-md-12">
                            <div className="card" >
                                <div className="card-header navi text-white">
                                    <h4 className="text-center">Agregar direccion de envio</h4>
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <div className="col-md-12 mt-4">
                                            <label>Nombre de la direccion</label>
                                            <input type="text" name="nombre" onChange={handleInput} value={checkoutInput.nombre} className="form-control"></input>
                                            <small>{error.nombre}</small>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <label>Direccion</label>
                                            <input type="text" name="direccion" onChange={handleInput} value={checkoutInput.direccion} className="form-control"></input>
                                            <small>{error.direccion}</small>
                                        </div>
                                        <div className="col-md-6 mt-4">
                                            <label>Comuna</label>
                                            <input type="text" name="comuna" onChange={handleInput} value={checkoutInput.comuna} className="form-control"></input>
                                            <small>{error.comuna}</small>
                                        </div>
                                        <div className="col-md-6 mt-4">
                                            <label>Region</label>
                                            <input type="text" name="region" onChange={handleInput} value={checkoutInput.region} className="form-control"></input>
                                            <small>{error.region}</small>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="button" onClick={submitDireccion} class="btn btn-primary btn-lg" >Guardar direccion</button>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default Direccion;