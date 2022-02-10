import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

function DetalleProducto(props) {

    const [producto, setProducto] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [cantidad, setCantidad] = useState(1)


    useEffect(() => {

        let isMounted = true;
        const producto_slug = props.match.params.producto;
        const categoria_slug = props.match.params.categoria;
        axios.get(`/api/verproducto/${categoria_slug}/${producto_slug}`).then((res) => {

            if (isMounted) {
                if (res.data.status === 200) {
                    setProducto(res.data.producto);
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    new swal("Warning", res.data.message, "error");
                    history.pushState('/categorias');
                }
            }

        });

        return () => {
            isMounted = false;
        }
    }, [props.match.params.categoria, props.match.params.producto, history]);

    const disminuir = () => {
        if (cantidad > 1) {
            setCantidad(cont => cont - 1);
        }

    }

    const aumentar = () => {
        if (cantidad < 10) {
            setCantidad(cont => cont + 1);
        }
    }

    const submitPedido = (e) => {
        e.preventDefault();

        const data = {
            id_producto: producto.id,
            cantidad_producto: cantidad
        }

        axios.post(`/api/agregar-pedido`, data).then(res => {
            if (res.data.status === 201) {
                new swal("Exito", res.data.message, "success")
            }
            else if (res.data.status === 409) {
                new swal("Warning", res.data.message, "warning")
            }
            else if (res.data.status === 401) {
                new swal("Error", res.data.message, "error")
            }
            else if (res.data.status === 404) {
                new swal("warning", res.data.message, "warning")
            }
        })
    }

    const submitCarrito = (e) => {
        e.preventDefault();

        const data = {
            id_producto: producto.id,
            cantidad_producto: cantidad
        }

        axios.post(`/api/agregar-al-carrito`, data).then(res => {
            if (res.data.status === 201) {
                new swal("Exito", res.data.message, "success")
            }
            else if (res.data.status === 409) {
                new swal("Warning", res.data.message, "warning")
            }
            else if (res.data.status === 401) {
                new swal("Error", res.data.message, "error")
            }
            else if (res.data.status === 404) {
                new swal("warning", res.data.message, "warning")
            }
        })
    }

    if (loading) {
        return <h4> Cargando detalles del producto</h4>;
    } else {
        if (producto.Stock > 0) {
            var stock = ''
            stock =
                <div>
                    <label className="btn-sm btn-success px-4 mt-2">En Stock</label>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 mt-3">

                            <div className="input-group">
                                <button type="button" onClick={disminuir} className="input-group-text">-</button>
                                <input type="text" classname="form-control text-center" style={{ width: "45px" }} value={cantidad} />
                                <button type="button" onClick={aumentar} className="input-group-text">+</button>
                            </div>
                            <div className="col-md-12 col-lg-4 mt-3">
                                <button type="button" onClick={submitPedido} className="btn btn-success w-100">Agregar al pedido mensual</button>
                            </div>
                            <div className="col-md-12 col-lg-4 mt-3">
                                <button type="button" onClick={submitCarrito} className="btn btn-primary w-100">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
        }
        else {
            stock =
                <div>
                    <label className="btn-sm btn-danger px-4 mt-2">Sin Stock</label>
                </div>
        }


    }

    return (
        <div>
            <Container fluid>
                
                <Breadcrumb >
                    <Breadcrumb.Item href='/Categorias'>Catalogo </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/Categorias/${producto.categoria.Slug}`}> {producto.categoria.Nombre}</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active>
                        {producto.nombre}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{ alignitems: "center" }}>
                    <h1>Productos</h1>
                </Row>
            </Container>
            <Container fluid>
                <div className="row">
                    <div className="col-lg-4 border-end">
                        <img src={`http://localhost:8000/${producto.image}`} alt="imagen del producto" className="w-75" />
                    </div>
                    <div className="col-md-8">
                        <h4>{producto.nombre}
                            <span className="float-end badge btn-sm btn-danger badge-pil"> {producto.marca}</span>
                        </h4>
                        <p> {producto.descripcion}</p>
                        <h4 className="mb-1">
                            Precio: ${producto.precio}.
                            <s className="ms-2"></s>
                        </h4>
                        <div>
                            {stock}
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    )
}

export default DetalleProducto;