import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

function PedidoMensual() {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [pedido, setPedido] = useState([]);
    var totalPedido = 0;
    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        new swal("Warning", "Inicie sesion para ingresar a al pedido mensual");
    }

    useEffect(() => {

        let isMounted = true;
        axios.get('/api/ver-mensual').then((res) => {

            if (isMounted) {

                if (res.data.status === 200) {

                    setPedido(res.data.pedido);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    new swal("Warning", res.data.message, "error");
                    history.pushState('/categorias');
                }
            }

        });

        return () => {
            isMounted = false;
        }
    }, [history]);

    const disminuir = (pedido_id) => {
        setPedido(pedido =>
            pedido.map((item) =>
                pedido_id === item.id ? { ...item, producto_cantidad: item.producto_cantidad - (item.producto_cantidad > 1 ? 1 : 0) } : item
            )
        );
        actualizarCantidad(pedido_id, "dis");
    }

    const aumentar = (pedido_id) => {
        setPedido(pedido =>
            pedido.map((item) =>
                pedido_id === item.id ? { ...item, producto_cantidad: item.producto_cantidad + (item.producto_cantidad < 6 ? 1 : 0) } : item
            )
        );
        actualizarCantidad(pedido_id, "aum");
    }

    function actualizarCantidad(pedido_id, scope) {
        axios.put(`/api/actualizar-cantidad/${pedido_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
            }
        });

    }

    const borrarItem = (e, pedido_id) => {
        e.preventDefault();
        const clickeado = e.currentTarget;
        clickeado.innerText = "elminar";

        axios.delete(`api/borrar-item/${pedido_id}`).then(res => {
            if (res.data.status === 200) {
                new swal("exito", res.data.message, "success");
                clickeado.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                new swal("error", res.data.message, "error");
                clickeado.innerText = "eliminado";
            }
        })
    }

    if (loading) {
        return <h4> Cargando pedido mensual</h4>
    }

    var pedido_HTML = '';
    if (pedido.length > 0) {
        var rec = '';

        pedido_HTML = <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">Imagen</th>
                        <th className="text-center">Producto</th>
                        <th className="text-center">Receta</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Quitar</th>

                    </tr>
                </thead>
                <tbody>
                    {pedido.map((item, idx) => {
                        totalPedido += item.producto.precio * item.producto_cantidad;
                        if (item.producto.receta == 1) {
                            rec = 'Requiere';
                        }
                        else {
                            rec = 'No requiere';
                        }

                        return (

                            <tr>
                                <td width="10%" className="text-center">
                                    <img src={`http://localhost:8000/${item.producto.image}`} alt="prod" width="100px" height="100px" />
                                </td>
                                <td>{item.producto.nombre}</td>
                                <td className="text-center">
                                    <span className={rec == 'Requerida' ? "badge bg-danger" : "badge bg-success"}>{rec}</span>
                                </td>
                                <td width="10%" className="text-center"> ${item.producto.precio}</td>
                                <td width="10%">
                                    <div className="input-group">
                                        <button type="button" onClick={() => disminuir(item.id)} className="input-group-text">-</button>
                                        <div className="form-control text-center">{item.producto_cantidad}</div>
                                        <button type="button" onClick={() => aumentar(item.id)} className="input-group-text">+</button>
                                    </div>
                                </td>

                                <td width="10%" className="text-center"> ${item.producto.precio * item.producto_cantidad}</td>
                                <td width="15%" className="text-center">
                                    <Button onClick={(e) => borrarItem(e, item.id)} variant="danger" >Quitar</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>



        </div>
    }
    else {
        pedido_HTML = <div>
            <div className=" card card-body py-5 text-center shadow-sm">
                <h4>No tiene productos en su pedido mensual</h4>
            </div>
        </div>

    }

    return (
        <div>
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href='/Categorias'>Home </Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active>
                        Pedido mensual
                    </Breadcrumb.Item>
                </Breadcrumb>

            </Container>
            <div className="py-4">
                <Container fluid>
                    <div className="row">
                        <div className="col-md-12">
                            {pedido_HTML}
                        </div>
                        <div className="col-md-12">
                            <Container fluid>
                                <Row>
                                    <Col md="4">
                                        <div className="card">
                                            <div className="card-header navilungo text-white">
                                                <h4 className="text-center">Informacion de entrega</h4>
                                            </div>
                                            <div className="card-body">
                                                <Row>
                                                    <div className="col-md-12">

                                                        <p><b>Direccion:</b></p>

                                                        <p>Los tulipanes 925, Vina del mar </p>
                                                        <hr />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p><b>Fecha de entrega:</b></p>
                                                        <p>Primera semana del mes</p>
                                                        <hr />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p><b>Receptor:</b></p>
                                                        <p>Nicolas Fernandez Gonzalez</p>
                                                        <hr />
                                                    </div>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="4" />
                                    <Col md="4">
                                        <div className="card card-body mt-3">
                                            <h6>Sub Total:
                                                <span className="float-end">${totalPedido}</span>
                                            </h6>
                                            <hr />
                                            <h5>Total:
                                                <span className="float-end">${totalPedido}</span>
                                            </h5>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                    </div>
                </Container>

            </div>
        </div>

    )
}

export default PedidoMensual;