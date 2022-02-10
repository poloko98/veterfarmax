import React, { useState, useEffect } from "react";
import {
  Nav,
  Tabs,
  Tab,
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function SubCategorias() {
  const [listaCategoria, setListaCategoria] = useState([]);
  const [SubcategoriaInput, setSubCategoria] = useState({
    nombre: "",
    slug: "",
    descripcion: "",
    titulo: "",
    mDesc: "",
    keyword: "",
    Categoria: "",
    error_list: [],
  });



  const handleInput = (e) => {
    e.persist();
    setSubCategoria({ ...SubcategoriaInput, [e.target.name]: e.target.value });
  };

  const submitSubCategoria = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", SubcategoriaInput.nombre);
    formData.append("slug", SubcategoriaInput.slug);
    formData.append("descripcion", SubcategoriaInput.descripcion);
    formData.append("mDesc", SubcategoriaInput.mDesc);
    formData.append("titulo", SubcategoriaInput.titulo);
    formData.append("Categoria", SubcategoriaInput.Categoria);
    formData.append("keyword", SubcategoriaInput.keyword);

    axios.post(`/api/add-sub-categoria`, formData).then((res) => {
      if (res.data.status === 200) {
        new Swal("Success", res.data.message, "success");
        document.getElementById("Form_cat").reset();
      } else if (res.data.status === 400) {
        setSubCategoria({ ...SubcategoriaInput, error_list: res.data.errors });
      }
    });
  };

  useEffect(() => {
    axios.get(`/api/lista-categorias`).then((res) => {
      if (res.data.status === 200) {
        setListaCategoria(res.data.categoria);
      }
    });
  }, []);

  return (
    <div>
      <br />
      <Container>
        <div>
          <Card style={{ width: "flex" }}>
            <Card.Img variant="top" src="" />
            <Card.Body>
              <Card.Title>Añadir Subcategoria</Card.Title>
              <Form onSubmit={submitSubCategoria} id="Form_cat">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label column="sm" lg={2}>
                      Nombre
                    </Form.Label>
                    <Form.Control
                      name="nombre"
                      placeholder="Ingrese el nombre de la categoria"
                      onChange={handleInput}
                      value={SubcategoriaInput.nombre}
                    />
                    <span>{SubcategoriaInput.error_list.nombre}</span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label column="sm" lg={2}>
                      slug
                    </Form.Label>
                    <Form.Control
                      name="slug"
                      placeholder="Ingrese el slug de la categoria"
                      onChange={handleInput}
                      value={SubcategoriaInput.slug}
                    />
                    <span>{SubcategoriaInput.error_list.slug}</span>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="descripcion"
                      rows={3}
                      onChange={handleInput}
                      value={SubcategoriaInput.descripcion}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label column="sm" lg={2}>
                      Meta Titulo
                    </Form.Label>
                    <Form.Control
                      type="titulo"
                      name="titulo"
                      placeholder="Ingrese titulo"
                      onChange={handleInput}
                      value={SubcategoriaInput.titulo}
                    />
                    <span>{SubcategoriaInput.error_list.titulo}</span>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label column="sm" lg={2}>
                      Meta descripcion
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="mDesc"
                      rows={3}
                      onChange={handleInput}
                      value={SubcategoriaInput.mDesc}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label column="sm" lg={2}>
                      Palabras Claves
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="keyword"
                      rows={2}
                      onChange={handleInput}
                      value={SubcategoriaInput.keyword}
                    />
                  </Form.Group>
                </Row>
                <hr />
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label className="labelP" column lg={2}>
                    Categoria
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      name="Categoria"
                      placeholder="Seleccione categoria"
                      onChange={handleInput}
                      value={SubcategoriaInput.Categoria}
                    >
                      <option>Seleccione categoria</option>
                      {listaCategoria.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.Nombre}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <hr />
                <br />
                <br />

                <Button variant="primary" type="submit">
                  Agregar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default SubCategorias;
