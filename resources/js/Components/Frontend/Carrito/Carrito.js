import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

function Carrito() {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [carro, setCarro] = useState([]);
    var totalCarrito = 0;
    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        new swal("Warning", "Inicie sesion para ingresar a al carro de compras");
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

        return () => {
            isMounted = false;
        }
    }, [history]);

    const disminuir = (carro_id) => {
        setCarro(carro =>
            carro.map((item) =>
                carro_id === item.id ? { ...item, producto_cantidad: item.producto_cantidad - (item.producto_cantidad > 1 ? 1 : 0) } : item
            )
        );
        actualizarCantidad(carro_id, "dis");
    }

    const aumentar = (carro_id) => {
        setCarro(carro =>
            carro.map((item) =>
                carro_id === item.id ? { ...item, producto_cantidad: item.producto_cantidad + (item.producto_cantidad < 6 ? 1 : 0) } : item
            )
        );
        actualizarCantidad(carro_id, "aum");
    }

    function actualizarCantidad(carro_id, scope) {
        axios.put(`/api/actualizar-cantidad-carro/${carro_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
            }
        });

    }

    const borrarItem = (e, carro_id) => {
        e.preventDefault();
        const clickeado = e.currentTarget;
        clickeado.innerText = "elminar";

        axios.delete(`api/borrar-item-carro/${carro_id}`).then(res => {
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
        return <h4> Cargando carro de compras</h4>
    }

    var carro_HTML = '';
    if (carro.length > 0) {
        var rec = '';
        carro_HTML = <div className="table-responsive">
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
                    {carro.map((item, idx) => {

                        if (item.producto.receta == 1) {
                            rec = 'Requerida';
                        }
                        else {
                            rec = 'No requerida';
                        }
                        totalCarrito += item.producto.precio * item.producto_cantidad;
                        return (

                            <tr>
                                <td width="10%" className="text-center">
                                    <img src={`http://localhost:8000/${item.producto.image}`} alt="prod" width="100px" height="100px" />
                                </td>
                                <td className="text-center">{item.producto.nombre}</td>
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
            <Container fluid>
                <Row >
                    <div className="col-md-8 col-lg-9 mt-4 text-center" >
                        <Button className="" size="lg">
                            Agregar  mas Productos
                        </Button>
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <div className="card card-body mt-3">
                            <h5>Sub Total:
                                <span className="float-end">${totalCarrito}</span>
                            </h5>
                            <h5>Total:
                                <span className="float-end">${totalCarrito}</span>
                            </h5>
                            <hr />
                            <Link to="/checkout" className="btn btn-primary"> Pagar</Link>
                        </div>
                    </div>
                </Row>
            </Container>


        </div>
    }
    else {
        carro_HTML = <div>
            <div className=" card card-body py-5 text-center shadow-sm">
                <h4>No tiene productos su carrito</h4>
                <Link to="/Categorias">
                    <Button className="mt-4" size="lg">
                        Volver a Categorias
                    </Button>
                </Link>
            </div>
        </div>

    }

    return (
        <div>
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href='/Categorias'>Home </Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active>
                        Carro
                    </Breadcrumb.Item>
                </Breadcrumb>

            </Container>
            <div className="py-4">
                <Container fluid>
                    <div className="row">
                        <div className="col-md-12">
                            {carro_HTML}
                        </div>

                    </div>
                </Container>

            </div>
        </div>

    )
}

export default Carrito;