import React, { useEffect, useState } from "react";
import { Nav, Tabs, Tab, Col, Container, Row, Form, Button, Card ,Spinner} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

function EditarSubCategorias(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [subcategoriaInput, setSubCategoria] = useState([]);
    const [error, setError] = useState([]);
    const [listaSubcategoria, setListaSubcategoria] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setSubCategoria({ ...subcategoriaInput, [e.target.name]: e.target.value })
    }



    useEffect(() => {

        const abortCont = new AbortController();
        const id_subcategoria = props.match.params.id;

        axios.get(`/api/lista-categorias`).then(res => {
            if (res.data.status === 200) {
                setListaSubcategoria(res.data.categoria);
            }
        });

        axios.get(`/api/editar-subcategorias/${id_subcategoria}`).then(res => {
            if (res.data.status === 200) {
                setSubCategoria(res.data.subcategoria)
            }
            else if (res.data.status === 404) {
                new Swal("Error", res.data.message, "error");
                history.push('/admin/ver-subcategoria');
            }

            setLoading(false);

        }).catch(err => {

            setError(err.message);
        });

        return () => abortCont.abort();

    }, [props.match.params.id, history]);

    const actualizaSubcategoria = (e) => {

        e.preventDefault();
        const data = subcategoriaInput;
        const id_subcategoria = props.match.params.id;
        axios.put(`api/actualizar-subcategoria/${id_subcategoria}`, data).then(res => {
            if (res.data.status === 200) {
                new Swal("Success", res.data.message, "success");

                setError([]);

            }
            else if (res.data.status === 422) {
                new Swal("Rellene los campos", res.data.message, "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                setError(res.data.errors);
                new Swal("Error", res.data.message, "error");


            }

        })
    }

    if (loading) {
        return <h4>Cargado Subcategoria <Spinner animation="border" size="xl" variant="primary" /></h4>
    }

    return (
        <>
            <Container  >

                <div>
                    <br />
                    <br />
                    <Card style={{ width: 'flex' }}>
                        <Card.Body>
                            <Card.Title>
                                <h4>
                                    Añadir Subcategoria
                                    <Link to="/admin/ver-subcategoria" className="btn btn-danger btn-sm float-end">Volver</Link>
                                </h4>
                            </Card.Title>
                            <Form onSubmit={actualizaSubcategoria} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Nombre</Form.Label>
                                        <Form.Control name="Nombre" placeholder="Ingrese el nombre de la subcategoria" onChange={handleInput} value={subcategoriaInput.Nombre} />
                                        <small className="text-danger">{error.Nombre}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Slug</Form.Label>
                                        <Form.Control name="Slug" placeholder="Ingrese el slug de la subcategoria" onChange={handleInput} value={subcategoriaInput.Slug} />
                                        <small className="text-danger">{error.Slug}</small>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" name="Descripcion" rows={3} onChange={handleInput} value={subcategoriaInput.Descripcion} />
                                        <small>{error.Descripcion}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Meta Titulo</Form.Label>
                                        <Form.Control type="titulo" name="Meta_titulo" placeholder="Ingrese titulo" onChange={handleInput} value={subcategoriaInput.Meta_titulo} />
                                        <small>{error.Meta_titulo}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Meta descripcion</Form.Label>
                                        <Form.Control as="textarea" name="Meta_descripcion" rows={3} onChange={handleInput} value={subcategoriaInput.Meta_descripcion} />
                                        <small>{error.mDesc}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Palabras Claves</Form.Label>
                                        <Form.Control as="textarea" name="Meta_keyword" rows={2} onChange={handleInput} value={subcategoriaInput.Meta_keyword} />
                                        <small>{error.Meta_keyword}</small>
                                    </Form.Group>
                                </Row>
                                <hr/>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                                <Form.Label className="labelP" column lg={2}>Categoria</Form.Label>
                                                <Col sm={10}>
                                                    <Form.Select name="Categoria" placeholder="Ingrese categoria" onChange={handleInput} value={subcategoriaInput.Categoria} >
                                                        <option>Seleccione categoria</option>
                                                        {
                                                            listaSubcategoria.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.Nombre}</option>
                                                                );
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                <hr/>


                                <br />
                                <Button variant="primary" type="submit">
                                    Modificar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </div>


            </Container>
        </>
    )
}

export default EditarSubCategorias;