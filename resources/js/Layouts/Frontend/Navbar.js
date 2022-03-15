import Button from '@restart/ui/esm/Button';
import { Nav, Navbar, Container, Stack, Row, Col, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Redirect, Route, Switch } from "react-router";


function NavbarF() {

  return (
    <div className="">

      <Navbar className="navilungo" variant="dark">

        <Nav defaultActiveKey="/"  >
          <Container fluid>
            <Row >
              <Col md="auto"  >
                <Nav.Link href='/' color="white" eventKey="/"> Inicio </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link href='/Categorias' eventKey="link-1"> Categorias </Nav.Link>
              </Col>
              <Col md="auto">
                <NavDropdown title="Alimentos" id="nav-dropdown" >
                  <NavDropdown.Item href='/Categorias/Alimentos-Gatos'  >Gatos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Alimentos-Perros' >Perros</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Alimentos-mascotas-exoticas'>Exoticos</NavDropdown.Item>
                </NavDropdown>
              </Col>
              <Col md="auto">
                <NavDropdown title="Medicamento" id="nav-dropdown" >
                  <NavDropdown.Item href='/Categorias/Medicamentos-mascotas'  >Gatos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Medicamentos-mascotas' >Perros</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Medicamentos-mascotas'>Exoticos</NavDropdown.Item>
                </NavDropdown>
              </Col>
              <Col md="auto">
              <NavDropdown title="Accesorios" id="nav-dropdown" >
                  <NavDropdown.Item href='/Categorias/Accesorios-mascotas'  >Correas</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Accesorios-mascotas' >Juguetes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/Categorias/Rascadores-gatos'>Rascadores</NavDropdown.Item>
                </NavDropdown>
              </Col>
            </Row>
          </Container>
        </Nav>

      </Navbar>

    </div>
  )
}
export default NavbarF;