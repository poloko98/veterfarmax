import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Col, Container, Row, Breadcrumb, Button, Card, Modal, Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import Direccion from "../Direccion";

function Checkout() {
    var totalCarrito = 0;
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [carro, setCarro] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    const [error, setError] = useState([]);
    const [seleccionada, SetSeleccionada] = useState({
        id: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        new swal("Warning", "Inicie sesion para ingresar a al carro de compras");
    }

    const [checkoutInput, setCheckout] = useState({
        nombre: '',
        apellido: '',
        rut: '',
        telefono: '',
        email: '',
    });

    const [direccionInput, setDireccionInput] = useState({

        direccion: '',
        comuna: '',
        region: '',
    });

    const handleInput = (e) => {
        e.persist();
        setCheckout({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    const handleInputDireccion = (e) => {
        e.persist();
        setDireccionInput({ ...direccionInput, [e.target.name]: e.target.value });
    }

    // const handleDireccion = (e) => {
    //     e.persist();
    // }

    // const handleSeleccion = (e) => {

    //     SetSeleccionada({ id: e.target.value });
    //     console.log(e.target.value);
    // }
    
    const OrdenData = new FormData();
    OrdenData.append("nombre", checkoutInput.nombre);
    OrdenData.append("apellido", checkoutInput.apellido);
    OrdenData.append("rut", checkoutInput.rut);
    OrdenData.append("telefono", checkoutInput.telefono);
    OrdenData.append("email", checkoutInput.email);
    OrdenData.append("direccion", direccionInput.direccion);
    OrdenData.append("comuna", direccionInput.comuna);
    OrdenData.append("region", direccionInput.region);


    ///////PAYPAL
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value:  totalCarrito ,
                    },
                },
            ],
        });
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            console.log(details);
            OrdenData.append("metodo_pago", "Paypal");
            OrdenData.append("id_pago", details.id);
            axios.post(`/api/ingresar-orden`, OrdenData).then(res => {
                if (res.data.status === 200) {
                    new swal("orden realizada", res.data.message, "success");
                    setError([]);
                } else if (res.data.status === 422) {
                    new swal("Debe ingresar todos los campos", "", "error");
                    setError(res.data.errors);
                }
            })
        });
    };
    ////////

    const submitOrder = (e, metodo_pago) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", checkoutInput.nombre);
        formData.append("apellido", checkoutInput.apellido);
        formData.append("rut", checkoutInput.rut);
        formData.append("telefono", checkoutInput.telefono);
        formData.append("email", checkoutInput.email);
        formData.append("direccion", direccionInput.direccion);
        formData.append("comuna", direccionInput.comuna);
        formData.append("region", direccionInput.region);
        formData.append("metodo_pago", metodo_pago);



        switch (metodo_pago) {
            case 'cod':
                break;
            case 'paypal':

                axios.post(`/api/validar-orden`, formData).then(res => {
                    if (res.data.status === 200) {
                        handleShow();
                        setError([]);
                    } else if (res.data.status === 422) {

                        setError([]);
                        
                    }
                })
                break;
            default:
                break;
        }
    }






    useEffect(() => {

        let isMounted = true;
        axios.get('/api/ver-carrito').then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCarro(res.data.carro);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    new swal("Warning", res.data.message, "error");
                    history.pushState('/categorias');
                }
            }
        });

        axios.get('/api/ver-direccion').then((res) => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setDirecciones(res.data.direccion);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    new swal("Warning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        }

    }, [history]);

    // var direcc_HTML = '';
    // if (direcciones.length > 0) {

    //     direcc_HTML =

    //         <div>
    //             <Row>
    //                 <Form.Select  name="id" value={seleccionada.id} onChange={handleSeleccion}>
    //                     <option> Seleccione su direccion</option>
    //                     {direcciones.map((opcion,key) => (
    //                         <option value={opcion.id}> {opcion.nombre}</option>
    //                     ))}
    //                 </Form.Select>
    //                 {direcciones.map((item,idx) => {
    //                     return (
    //                         <div className="col-md-12 col-lg-6 mt-2">
    //                             <Card >
    //                                 <div class="card-header text-center" >
    //                                     <p className="nom_direccion" value={item.nombre}>{item.nombre}</p>
    //                                 </div>
    //                                 <div class="card-body text-center mt-1">
    //                                     <h6 > Direccion: </h6>
    //                                     <p name="direccion" >{item.direccion}</p>
    //                                 </div>
    //                             </Card>
    //                         </div>
    //                     )
    //                 })}
    //                 <div className="col-md-12 col-lg-6 mt-2">
    //                     <Link to="#" onClick={handleShow}>
    //                         <div className="card" >
    //                             <div class="card-body text-center mt-4">
    //                                 <img height="50px" src={plus} alt="agregar"></img>
    //                                 <br />
    //                                 <br />
    //                                 <h5 class="card-title">Agregar direccion</h5>
    //                             </div>
    //                         </div>
    //                     </Link>
    //                 </div>
    //             </Row>
    //         </div>
    // }
    // else {
    //     direcc_HTML =

    //         <Link to="#" onClick={handleShow}>
    //             <div className="card" >
    //                 <div class="card-body text-center mt-4">
    //                     <img height="50px" src={plus} alt="agregar"></img>
    //                     <br />
    //                     <br />
    //                     <h5 class="card-title">Agregar direccion</h5>
    //                 </div>
    //             </div>
    //         </Link>


    // }

    return (
        <div>
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href='/Categorias'>Home </Breadcrumb.Item>
                    <Breadcrumb.Item href="/carro" > Carro</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active> Pago</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <div className="py-4" >
                <Container fuild>
                    <Row>
                        <div className="col-md-6">

                            <div className="card">
                                <div className="card-header navilungo text-white">
                                    <h4 className="text-center">Informacion del receptor</h4>
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <div className="col-md-6">
                                            <label>Nombre</label>
                                            <input type="text" name="nombre" onChange={handleInput} value={checkoutInput.nombre} className="form-control"></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Apellido</label>
                                            <input type="text" name="apellido" onChange={handleInput} value={checkoutInput.apellido} className="form-control"></input>
                                        </div>
                                        <div className="col-md-6 mt-4">
                                            <label>RUT</label>
                                            <input type="text" name="rut" onChange={handleInput} value={checkoutInput.rut} className="form-control"></input>
                                        </div>
                                        <div className="col-md-6 mt-4">
                                            <label>Telefono</label>
                                            <input type="text" name="telefono" onChange={handleInput} value={checkoutInput.telefono} className="form-control"></input>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <label>Correo electronico</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control"></input>
                                        </div>
                                    </Row>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-md-12 mt-4">
                                    <div className="card">
                                        <div className="card-header navilungo text-white">
                                            <h4 className="text-center" >Direccion de despacho</h4>
                                        </div>
                                        <div className="card-body">
                                            {/* {direcc_HTML} */}
                                            <Row>
                                                <div className="col-md-6">
                                                    <label>Comuna</label>
                                                    <input type="text" name="comuna" onChange={handleInputDireccion} value={direccionInput.comuna} className="form-control"></input>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Region</label>
                                                    <input type="text" name="region" onChange={handleInputDireccion} value={direccionInput.region} className="form-control"></input>
                                                </div>

                                                <div className="col-md-12 mt-4">
                                                    <label>Direccion</label>
                                                    <input type="email" name="direccion" onChange={handleInputDireccion} value={direccionInput.direccion} className="form-control"></input>
                                                </div>
                                            </Row>



                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header navilungo text-white ">
                                    <h4 className="text-center">Codigo de descuento</h4>
                                </div >
                                <div className="card-body text-center">
                                    <input className="form-control" type="text" placeholder="Ingrese codigo de descuento"></input>
                                </div>
                            </div>
                            <div className="card mt-4">
                                <div className="card-header navilungo text-white">
                                    <h4 className="text-center">Resumen del pedido</h4>
                                </div>
                                <div className="card-body">
                                    {carro.map((item, idx) => {
                                        totalCarrito += item.producto.precio * item.producto_cantidad;
                                        return (
                                            <div>
                                                <Row>
                                                    <div className="col-md-2">
                                                        <img src={`http://localhost:8000/${item.producto.image}`} name={idx} alt="prod" width="80px" height="80px" />
                                                    </div>
                                                    <div className="col-md-10">
                                                        <h8 class="card-text">{item.producto.nombre}</h8 >
                                                        <br />
                                                        <h8 class="card-text">Cantidad: {item.producto_cantidad}</h8>
                                                        <br />
                                                        <h5 class="card-text text-red">${item.producto.precio * item.producto_cantidad}</h5>
                                                        <hr />
                                                    </div>
                                                </Row>
                                            </div>
                                        )
                                    })}
                                    <div className="card mt-2">
                                        <div className="card-body text-center">
                                            <h8 class="card-text fw-bold">Total a pagar: ${totalCarrito}</h8 >
                                            <br />
                                            <hr />
                                            <button type="button" class="btn btn-primary" onClick={(e) => submitOrder(e, 'cod')}>Pagar</button>
                                            <button type="button" class="btn btn-primary" onClick={(e) => submitOrder(e, 'paypal')}>Pagar Online</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-8"  >
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                </Modal.Body>

            </Modal>

        </div>


    )
}

export default Checkout;