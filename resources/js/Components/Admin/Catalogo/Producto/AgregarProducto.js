import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AgregarProducto() {
  const [listaCategoria, setListaCategoria] = useState([]);
  const [foto, setFoto] = useState([]);
  const [errorlist, setError] = useState([]);

  const [productoInput, setProducto] = useState({
    nombre: "",
    descripcion: "",
    meta_titulo: "",
    meta_descripcion: "",
    keyword: "",
    status: "",
    slug: "",
    precio: "",
    precio_Oferta: "",
    Stock: "",
    marca: "",
    Categoria: "",
    oferta: "",
    fabricante: "",

    bio_equivalente: "",
    receta: "",
    agotado: "",
    error_list: [],
  });

  const handleimg = (e) => {
    setFoto({ image: e.target.files[0] });
  };

  const handleinput = (e) => {
    e.persist();
    setProducto({ ...productoInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`/api/lista-categorias`).then((res) => {
      if (res.data.status === 200) {
        setListaCategoria(res.data.categoria);
      }
    });
  }, []);

  const submitProducto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", foto.image);
    formData.append("nombre", productoInput.nombre);
    formData.append("descripcion", productoInput.descripcion);
    formData.append("meta_titulo", productoInput.meta_titulo);
    formData.append("meta_descripcion", productoInput.meta_descripcion);
    formData.append("keyword", productoInput.keyword);
    formData.append("status", productoInput.status);
    formData.append("slug", productoInput.slug);
    formData.append("precio", productoInput.precio);
    formData.append("precio_Oferta", productoInput.precio_Oferta);
    formData.append("Stock", productoInput.Stock);
    formData.append("marca", productoInput.marca);
    formData.append("Categoria", productoInput.Categoria);
    formData.append("oferta", productoInput.oferta);
    formData.append("fabricante", productoInput.fabricante);
    formData.append("bio_equivalente", productoInput.bioE);
    formData.append("receta", productoInput.receta);
    formData.append("agotado", productoInput.agotado);

    axios.post(`/api/guardar-producto`, formData).then((res) => {
      if (res.data.status === 200) {
        new Swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        new Swal("Todos los campos son obligatorios", "", "error");
        setError(res.data.errors);
      }
    });
  };

  return (
    <div>
      <Tab.Container
        defaultActiveKey="General"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Container>
          <Row>
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link eventKey="General">General</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Datos">Datos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Opciones">Opciones</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <div>
            <br />
            <br />
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Link
                  to="/admin/ver-producto"
                  className="btn btn-success  btn-sm float-end"
                >
                  Ver productos
                </Link>
                <Card.Title>Añadir Producto</Card.Title>

                <hr />
                <Form
                  id="Form_pro"
                  onSubmit={submitProducto}
                  encType="multipart/form-data"
                >
                  <Tab.Content>
                    <Tab.Pane eventKey="General">
                      <Row className="mb-3">
                        <Col md>
                          <Form.Group as={Col} controlId="formGridName">
                            <Form.Label column="sm" lg={2}>
                              Nombre
                            </Form.Label>
                            <Form.Control
                              name="nombre"
                              placeholder="Ingrese el nombre del producto"
                              onChange={handleinput}
                              value={productoInput.nombre}
                            />
                            <small className="text-danger">
                              {errorlist.nombre}
                            </small>
                          </Form.Group>
                        </Col>
                        <Col md>
                          <Form.Group as={Col} controlId="formGridName">
                            <Form.Label column="sm" lg={2}>
                              Meta Titulo
                            </Form.Label>
                            <Form.Control
                              type="titulo"
                              name="meta_titulo"
                              placeholder="Ingrese titulo"
                              onChange={handleinput}
                              value={productoInput.titulo}
                            />
                            <small className="text-danger">
                              {errorlist.meta_titulo}
                            </small>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col md>
                        <Form.Group as={Col} controlId="formGridName">
                          <Form.Label column="sm" lg={2}>
                            SEO tag
                          </Form.Label>
                          <Form.Control
                            type="slug"
                            name="slug"
                            placeholder="Ingrese slug"
                            onChange={handleinput}
                            value={productoInput.slug}
                          />
                          <small className="text-danger">
                            {errorlist.slug}
                          </small>
                        </Form.Group>
                      </Col>
                      <Row>
                        <Form.Group as={Col} controlId="formGridName">
                          <Form.Label>Descripcion</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="descripcion"
                            placeholder="Ingrese una descripcion para el producto"
                            rows={3}
                            onChange={handleinput}
                            value={productoInput.descripcion}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                          <Form.Label column="sm" lg={2}>
                            Meta descripcion
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="meta_descripcion"
                            rows={3}
                            onChange={handleinput}
                            value={productoInput.meta_descripcion}
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
                            onChange={handleinput}
                            value={productoInput.keyword}
                          />
                        </Form.Group>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Datos">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label className="labelP" column sm={2}>
                          Precio
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            name="precio"
                            placeholder="Ingrese el precio del producto"
                            onChange={handleinput}
                            value={productoInput.precio}
                          />
                        </Col>
                        <small className="text-danger">
                          {errorlist.precio}
                        </small>
                      </Form.Group>
                      <hr />
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label className="labelP" column sm={2}>
                          Precio oferta
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            name="precio_Oferta"
                            placeholder="Ingrese el precio oferta del producto"
                            onChange={handleinput}
                            value={productoInput.precioO}
                          />
                        </Col>
                        <small className="text-danger">
                          {errorlist.precio_Oferta}
                        </small>
                      </Form.Group>
                      <hr />
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label className="labelP" column sm={2}>
                          Stock
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            name="Stock"
                            placeholder="Ingrese la cantidad de stock disponible"
                            onChange={handleinput}
                            value={productoInput.Stock}
                          />
                        </Col>
                        <small className="text-danger">{errorlist.Stock}</small>
                      </Form.Group>
                      <hr />

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label className="labelP" column sm={2}>
                          Marca
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            name="marca"
                            placeholder="Ingrese marca"
                            onChange={handleinput}
                            value={productoInput.marca}
                          />
                        </Col>
                        <small className="text-danger">{errorlist.marca}</small>
                      </Form.Group>
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
                          <Form.Select name="Categoria" placeholder="Ingrese categoria" onChange={handleinput} value={productoInput.Categoria}>
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
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label className="labelP" column lg={2}>
                          Fabricante
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            name="fabricante"
                            onChange={handleinput}
                            value={productoInput.fabricante}
                          />
                        </Col>
                        <small className="text-danger">
                          {errorlist.fabricante}
                        </small>
                      </Form.Group>
                      <hr />
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Imagen del producto</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          onChange={handleimg}
                        />
                        <small className="text-danger">{errorlist.image}</small>
                      </Form.Group>
                      <br />
                    </Tab.Pane>

                    <Tab.Pane eventKey="Opciones">
                      <Row>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label className="labelP" column lg={2}>
                            En oferta
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Select
                              name="oferta"
                              placeholder="Seleccione el estado de oferta"
                              onChange={handleinput}
                              value={productoInput.oferta}
                            >
                              <option>Seleccione </option>
                              <option>No</option>
                              <option>Si</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                      </Row>
                      <hr />
                      <Row>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label className="labelP" column lg={2}>
                            Producto bioequivalente{" "}
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Select
                              name="bio_equivalente"
                              onChange={handleinput}
                              value={productoInput.bio_equivalente}
                            >
                              <option>Seleccione </option>
                              <option>No</option>
                              <option>Si</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                      </Row>
                      <hr />
                      <Row>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label className="labelP" column lg={2}>
                            Producto agotado
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Select
                              name="agotado"
                              onChange={handleinput}
                              value={productoInput.agotado}
                            >
                              <option>Seleccione </option>
                              <option>No</option>
                              <option>Si</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                      </Row>
                      <hr />
                      <Row>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label className="labelP" column lg={2}>
                            Medicamento con receta
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Select name="receta" onChange={handleinput} value={productoInput.receta}>
                              <option>No</option>
                              <option>Si</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <hr />
                      </Row>
                      <Row>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label className="labelP" column lg={2}>
                            Producto habilitado.
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Select
                              name="status"
                              onChange={handleinput}
                              value={productoInput.status}
                            >
                              <option>Seleccione </option>
                              <option>No</option>
                              <option>Si</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <hr />
                      </Row>
                    </Tab.Pane>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-4 mt-2"
                    >
                      Agregar
                    </Button>
                  </Tab.Content>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Tab.Container>
    </div>
  );
}

export default AgregarProducto;
