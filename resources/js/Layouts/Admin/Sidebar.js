import { Navigation } from "react-minimal-side-navigation";
import { Link } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";
import logo from "../../../Assets/Admin/img/default_profile.jpg";

///import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Col, Container, Row, Accordion, Image,Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const Sidebar = () => {
  return (
    <div className="sidebarrita" style={{ height: '100vh' }}>
      <Container fluid>
        <Row>
          <Col>
            <Container fluid>
              <div className="perfil">
                <Col xs={6} md={4} lg={12}>
                  <Image className="foto-perfil mt-4" src={logo} roundedCircle />
                </Col>
              </div>
            </Container>
            {/* <div className="mt-4 text-center">
              <Col >
                <Form.Select aria-label="Default select example">
                  <option>Farmacronicos Internet</option>
                  <option value="1">Farmacronicos Viña</option>
                  <option value="2">Farmacronicos Santiago</option>
                  <option value="3">Farmacronicos La Serena</option>
                </Form.Select>
              </Col>
            </div> */}
            <Accordion className="accM ">
              <nav className="nav-menu">


                <br />
                <ul className="nav-menu-items accM mt-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="accM">
                      Categoria
                    </Accordion.Header>
                    <Accordion.Body className="accM body">
                      <Link
                        to="/admin/agregar-categorias"
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Agregar categorias
                      </Link>
                      <hr />
                      <Link to="/admin/vista-categorias">
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Ver categoria
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Producto</Accordion.Header>
                    <Accordion.Body className="accM body">
                      <Link to="/admin/agregar-producto">
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Agregar Producto
                      </Link>
                      <hr />
                      <Link to="/admin/ver-producto">
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Ver Productos
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Subcategoria</Accordion.Header>
                    <Accordion.Body className="accM body">
                      <Link to="/admin/agregar-subcategoria">
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Agregar Subcategoria
                      </Link>
                      <hr />
                      <Link to="/admin/ver-subcategoria">
                        <div className="sb-sidenav-link-icon">
                          <i className="fas fa-angle/down"></i>
                        </div>
                        Ver Subcategoria
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                </ul>
              </nav>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
