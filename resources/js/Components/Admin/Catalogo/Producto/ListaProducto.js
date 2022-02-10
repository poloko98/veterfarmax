import React, { useEffect, useState } from "react";
import { Nav, Tabs, Tab, Col, Container, Row, Form, Button, Card, Table,Spinner, Alert } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ListaProducto() {
    const [loading, setLoading] = useState(true)
    const [listaProductos, setListaProductos] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        axios.get(`/api/ver-producto`).then(res => {
            if (res.status === 200) {

                setListaProductos(res.data.productos);
            }
            else {

            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            setError(err.message);
        });
        return () => abortCont.abort();

    }, []);

    const borrarProducto = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Eliminando";
        axios.delete(`/api/borrar-producto/${id}`).then(res => {
            if (res.status === 200) {
                new Swal("success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.status === 404) {
                new Swal("Error", res.data.message, "Producto no encontrada.");
                thisClicked.innerText = "Eliminando";
            }
        });
    }

    var verProducto_HTMLTable = "";


    if (loading) {
        return <h4>Cargando productos <Spinner animation="border" size="xl" variant="primary" /></h4>
    }
    else {
        var estadoProducto = '';
        verProducto_HTMLTable = listaProductos.map((item) => {

            if(item.status == '0')
            {
                estadoProducto =  'Oculto';
            }
            else if(item.status == '1')
            {
                estadoProducto = 'Habilitado';
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt="image"></img></td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria.Nombre}</td>
                    <td>{item.Stock}</td>
                    <td>{item.precio}</td>
                    <td>{item.precio_Oferta}</td>
                    <td>
                        <Link to={`editar-producto/${item.id}`} className="btn btn-success btn-sm" >Editar</Link>
                    </td>
                    <td>
                        <Alert  variant={estadoProducto == 'Habilitado' ? "success":"danger"}>{estadoProducto}</Alert>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <Container>
                <Card className="text-center">
                    <Card.Header>
                        Productos
                        <Link to='/admin/agregar-producto' className="btn btn-primary  btn-sm float-end" >Agregar producto</Link>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoria</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Precio oferta</th>
                                    <th>Editar</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verProducto_HTMLTable}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default ListaProducto;