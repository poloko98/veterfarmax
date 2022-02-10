import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import Header from "../../../Layouts/Frontend/Head";
import Topbar from "../../../Layouts/Frontend/TopBar";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import NavbarF from "../../../Layouts/Frontend/Navbar";

function Ofertas() {
    const [categoria, setCategoria] = useState([]);
    const [producto, setProducto] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const count_productos = producto.length;
    useEffect(() => {
        let isMounted = true;
        axios.get(`/api/productosOferta/`).then((res) => {

            if (isMounted) {
                if (res.data.status === 200) {
                    setProducto(res.data.productos);
                    setLoading(false);
                }
                else if (res.data.status === 400) {
                    new swal("Warning", res.data.message, "error");
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
    }, [history]);

    if (loading) {
        return <h4> Cargando productos</h4>;
    } else {
        var mostrarListaProducto = '';
        if (count_productos) {
            mostrarListaProducto = producto.map((item, idx) => {
                return (
                    <div className="col-sm-12 col-md-6 col-lg-6  col-xl-4 col-xxl-3" key={idx}>
                        <Container fluid>
                            <Card style={{ width: "23rem", height: "34rem", marginBottom: "3rem" }}>
                                <Link to={`/categorias/${item.categoria.Slug}/${item.slug}`}>
                                    <Card.Img variant="top" src={`http://localhost:8000/${item.image}`}  height={"350vh"}  alt="image" />
                                </Link>
                                <Card.Body>
                                    <Card.Text className="text-center">{item.marca}</Card.Text>
                                    <Card.Title className="text-center">{item.nombre}</Card.Title>
                                    <Card.Text className=" precio text-center"><b>$ {item.precio}</b></Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                );
            });
        }
        else {
            mostrarListaProducto =
                <div className="col-md-4" >
                    <h4>No hay productos disponibles en esta categoria.</h4>
                </div>
        }

    }
    return (

        <div>
           

            <Container fluid>
                <Row style={{ alignitems: "center" }}>
                    <h1 className="text-center mt-2">Ofertas</h1>
                    <hr />
                </Row>
                <Row>{mostrarListaProducto}</Row>
            </Container>

        </div>
    )
  }
  
  export default Ofertas;