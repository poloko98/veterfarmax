import React, { useEffect, useState } from "react";
import { Col, Container, Row, Breadcrumb, Button, Card } from "react-bootstrap";
import Header from "../../../Layouts/Frontend/Head";
import Topbar from "../../../Layouts/Frontend/TopBar";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import NavbarF from "../../../Layouts/Frontend/Navbar";

function Categorias() {
  const [categoria, setCategoria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/getCategoria`).then((res) => {

      if (isMounted) {
        if (res.data.status === 200) {
          setCategoria(res.data.categoria);
          setLoading(false);
        }
      }

    });

    return () => {
      isMounted = false;
    }
  }, []);

  if (loading) {
    return <h4> Cargando categorias</h4>;
  } else {
    var mostrarListaCategorias = "";
    mostrarListaCategorias = categoria.map((item, idx) => {
      return (
        <div className=" col-sm-12 col-md-6 col-lg-6  col-xl-4 col-xxl-3" key={idx}>
          <Card style={{ width: "22rem", marginBottom: "3rem" }}>
            <Link to={`/categorias/${item.Slug}`}>
              <Card.Img variant="top" src={`http://localhost:8000/${item.image}`} width="50px" height="200px" alt="image"/>
              <Card.Body>
                <Card.Title className="text-center">{item.Nombre}</Card.Title>       
              </Card.Body>
            </Link>
          </Card>
        </div>
      );
    });
  }

  return (
    <div>
      <Container fluid>
        <Row style={{ alignitems: "center" }}>
          <Breadcrumb>
            <Breadcrumb.Item href='/Categorias' active>Catalogo </Breadcrumb.Item>
            
          </Breadcrumb>
        </Row>
        <Row>{mostrarListaCategorias}</Row>
      </Container>
    </div>
  );
}

export default Categorias;
