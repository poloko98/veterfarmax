import React, { useEffect, useState } from "react";
import { Nav, Tabs, Tab, Col, Container, Row, Form, Button, Card, Table,Spinner,Alert } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function VistaSubCategorias() {
    const [loading, setLoading] = useState(true)
    const [listaSubCategorias, setListaSubCategorias] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const abortCont = new AbortController();
        
        axios.get(`/api/ver-sub-categorias`).then(res => {
            if (res.status === 200) {
                setListaSubCategorias(res.data.subcategoria)
            }
            else {

            }
            setLoading(false);
        }).catch(err =>{
            setLoading(false);
            setError(err.message);
        });
        return () => abortCont.abort();
        
    }, []);

    const borrarCategoria = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Eliminando";
        axios.delete(`/api/borrar-categoria/${id}`).then(res =>{
            if(res.status === 200){
                new Swal("success",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.status === 404){
                new Swal("Error",res.data.message,"Categoria no encontrada.");
                thisClicked.innerText = "Eliminando";
            }
        });
    }

    var verSubCategoria_HTMLTable = "";

    

    if (loading) {
        return <h4>Cargando subcategorias <Spinner animation="border" size="xl" variant="primary" /></h4>
    }
    else {
        verSubCategoria_HTMLTable = listaSubCategorias.map((item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.Nombre}</td>
                    <td>{item.categoria.Nombre}</td>
                    <td>
                        <Link to={`editar-subcategoria/${item.id}`} className="btn btn-success btn-sm" >Editar</Link>
                    </td>
                    <td>
                        <Button onClick={(e) => borrarCategoria(e, item.id)} className="btn btn-danger btn-sm" >Eliminar</Button>
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
                        Subcategorias
                        <Link to='/admin/agregar-subcategoria'  className="btn btn-primary  btn-sm float-end" >Agregar subcategoria</Link>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Categoria</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verSubCategoria_HTMLTable}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default VistaSubCategorias;
