import Button from '@restart/ui/esm/Button';
import { Nav, Navbar, Container, Stack, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Redirect, Route, Switch } from "react-router";


function NavbarF() {

  return (
    <div className="">

      <Navbar className="navilungo" variant="dark">

        <Nav defaultActiveKey="/" >
          <Container fluid>
            <Row >
              <Col md="auto"  >
                <Nav.Link href='/' color="white" eventKey="/"> Inicio </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link href='/Categorias' eventKey="link-1"> CATEGORIAS </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-2"> DERMOCOSMÉTICA </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-3"> ADULTO MAYOR </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-4"> INFANTIL Y MATERNIDAD</Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-5"> DISPOSITIVOS MÉDICOS </Nav.Link>
              </Col >
              <Col md="auto">
                <Nav.Link eventKey="link-6"> NUTRICIÓN </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-7"> CUIDADO PERSONAL </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-8"> BELLEZA </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-9"> BIENESTAR SEXUAL </Nav.Link>
              </Col>
              <Col md="auto">
                <Nav.Link eventKey="link-10"> BIOEQUIVALENTES </Nav.Link>
              </Col>

            </Row>
          </Container>
        </Nav>

      </Navbar>

    </div>
  )
}
export default NavbarF;