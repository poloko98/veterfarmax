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

function Categorias() {
  const [foto, setFoto] = useState([]);
  const [categoriaInput, setCategoria] = useState({
    nombre: "",
    slug: "",
    descripcion: "",
    titulo: "",
    mDesc: "",
    keyword: "",
    status: "",
    error_list: [],
  });

  useEffect(() => { }, []);

  const handleInput = (e) => {
    e.persist();
    setCategoria({ ...categoriaInput, [e.target.name]: e.target.value });
  };
  const handleimg = (e) => {
    setFoto({ image: e.target.files[0] });
  };
  const submitCategoria = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", foto.image);
    formData.append("nombre", categoriaInput.nombre);
    formData.append("slug", categoriaInput.slug);
    formData.append("descripcion", categoriaInput.descripcion);
    formData.append("mDesc", categoriaInput.mDesc);
    formData.append("titulo", categoriaInput.titulo);
    formData.append("keyword", categoriaInput.keyword);
    formData.append("status", categoriaInput.status);

    axios.post(`/api/add-category`, formData).then((res) => {
      if (res.data.status === 200) {
        new Swal("Success", res.data.message, "success");
        document.getElementById("Form_cat").reset();
      } else if (res.data.status === 400) {
        setCategoria({ ...categoriaInput, error_list: res.data.errors });
      }
    });
  };

  return (
    <div>
      
        
          <Container fluid>
            <div>
              <br />
              <br />
              <Card >
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Title>Añadir Categoria</Card.Title>
                  <Form onSubmit={submitCategoria} id="Form_cat">
                    <Row>
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label column="sm" lg={2}>
                          Nombre
                        </Form.Label>
                        <Form.Control
                          name="nombre"
                          placeholder="Ingrese el nombre de la categoria"
                          onChange={handleInput}
                          value={categoriaInput.nombre}
                        />
                        <span>{categoriaInput.error_list.nombre}</span>
                      </Form.Group>
                    
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label column="sm" lg={2}>
                          Slug
                        </Form.Label>
                        <Form.Control
                          name="slug"
                          placeholder="Ingrese el slug de la categoria"
                          onChange={handleInput}
                          value={categoriaInput.slug}
                        />
                        <span>{categoriaInput.error_list.slug}</span>
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
                          value={categoriaInput.descripcion}
                        />
                      </Form.Group>
                    </Row>
                    <Row >
                      <Form.Group as={Col} controlId="formGridName">
                        <Form.Label column="sm" lg={2}>
                          Meta Titulo
                        </Form.Label>
                        <Form.Control
                          type="titulo"
                          name="titulo"
                          placeholder="Ingrese titulo"
                          onChange={handleInput}
                          value={categoriaInput.titulo}
                        />
                        <span>{categoriaInput.error_list.titulo}</span>
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
                          value={categoriaInput.mDesc}
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
                          value={categoriaInput.keyword}
                        />
                      </Form.Group>
                    </Row>
                    <hr />
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Imagen del producto</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleimg}
                      />
                    </Form.Group>
                    <br />
                    <Form.Select
                      name="status"
                      label="Estado"
                      onChange={handleInput}
                      value={categoriaInput.status}
                    >
                      <option>Seleccione estado</option>
                      <option>Deshabilitado</option>
                      <option>Habilitado</option>
                    </Form.Select>

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

export default Categorias;
