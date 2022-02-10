import React, { useEffect, useState } from "react";
import { Nav, Tabs, Tab, Col, Container, Row, Form, Button, Card, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

function EditarCategorias(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoriaInput, setCategoria] = useState({
        Nombre: "",
        Slug: "",
        Descripcion: "",
        Meta_descripcion: "",
        Meta_titulo: "",
        Meta_keyword: "",
        status: "",
        error_list: [],
    });
    const [error, setError] = useState([]);
    const [foto, setFoto] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setCategoria({ ...categoriaInput, [e.target.name]: e.target.value })
    }

    const handleimg = (e) => {
        setFoto({ image: e.target.files[0] });
    };

    useEffect(() => {

        const abortCont = new AbortController();
        const id_categoria = props.match.params.id;
        axios.get(`/api/editar-categorias/${id_categoria}`).then(res => {
            if (res.data.status === 200) {
                setCategoria(res.data.categoria)
            }
            else if (res.data.status === 404) {
                new Swal("Error", res.data.message, "error");
                history.push('/admin/vista-categorias');
            }

            setLoading(false);

        }).catch(err => {

            setError(err.message);
        });

        return () => abortCont.abort();

    }, [props.match.params.id, history]);

    const actualizaCategoria = (e) => {

        e.preventDefault();
        console.log(categoriaInput);
        const id_categoria = props.match.params.id;

        const formData = new FormData();

        formData.append("image", foto.image);
        formData.append("Nombre", categoriaInput.Nombre);
        formData.append("Slug", categoriaInput.Slug);
        formData.append("Descripcion", categoriaInput.Descripcion);
        formData.append("Meta_descripcion", categoriaInput.Meta_descripcion);
        formData.append("Meta_titulo", categoriaInput.Meta_titulo);
        formData.append("Meta_keyword", categoriaInput.Meta_keyword);
        formData.append("status", categoriaInput.status);
        console.log(formData);

        axios.post(`api/actualizar-categoria/${id_categoria}`, formData).then(res => {
            if (res.data.status === 200) {
                new Swal("Success", res.data.message, "success");
                setError([]);
                history.push('/admin/vista-categorias');

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
        return <h4>Cargado categoria <Spinner animation="border" size="xl" variant="primary" /></h4>
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
                                    Modificar Categoria
                                    <Link to="/admin/vista-categorias" className="btn btn-danger btn-sm float-end">Volver</Link>
                                </h4>
                            </Card.Title>
                            <Form onSubmit={actualizaCategoria} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Nombre</Form.Label>
                                        <Form.Control name="Nombre" placeholder="Ingrese el nombre de la categoria" onChange={handleInput} value={categoriaInput.Nombre} />
                                        <small className="text-danger">{error.Nombre}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Slug</Form.Label>
                                        <Form.Control name="Slug" placeholder="Ingrese el slug de la categoria" onChange={handleInput} value={categoriaInput.Slug} />
                                        <small className="text-danger">{error.Slug}</small>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" name="Descripcion" rows={3} onChange={handleInput} value={categoriaInput.Descripcion} />
                                        <small>{error.Descripcion}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Meta Titulo</Form.Label>
                                        <Form.Control type="titulo" name="Meta_titulo" placeholder="Ingrese titulo" onChange={handleInput} value={categoriaInput.Meta_titulo} />
                                        <small>{error.Meta_titulo}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Meta descripcion</Form.Label>
                                        <Form.Control as="textarea" name="Meta_descripcion" rows={3} onChange={handleInput} value={categoriaInput.Meta_descripcion} />
                                        <small>{error.Meta_descripcion}</small>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label column="sm" lg={2}>Palabras Claves</Form.Label>
                                        <Form.Control as="textarea" name="Meta_keyword" rows={2} onChange={handleInput} value={categoriaInput.Meta_keyword} />
                                        <small>{error.Meta_keyword}</small>
                                    </Form.Group>
                                </Row>
                                
                                <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Imagen del producto</Form.Label>
                                                <br />
                                                <img src={`http://localhost:8000/${categoriaInput.image}`} width="100px" />
                                                <Form.Control type="file" name='image' onChange={handleimg} />

                                                <small className="text-danger">{error.image}</small>
                                            </Form.Group>
                                            <br />
                                <Form.Select name="status" label="Estado" onChange={handleInput} value={categoriaInput.status} >
                                    <option>Seleccione estado</option>
                                    <option>Deshabilitado</option>
                                    <option>Habilitado</option>
                                </Form.Select>

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

export default EditarCategorias;