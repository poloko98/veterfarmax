import { Nav, Navbar, Container, Button, InputGroup, FormControl, Col, Row, Stack, Modal, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import veter from "../../../Assets/Frontend/img/veterfarma.png";
import lista from "../../../Assets/Frontend/img/lista.svg";
import lupa from "../../../Assets/Frontend/img/search.svg";
import user from "../../../Assets/Frontend/img/user.svg";
import pin from "../../../Assets/Frontend/img/pin.svg";
import cart from "../../../Assets/Frontend/img/cart.svg";
import box from "../../../Assets/Frontend/img/box.svg";
import Login from '../../Components/Frontend/Auth/Login';
import Register from '../../Components/Frontend/Auth/Register'
import Search from './Search';

function Header() {

  const history = useHistory();
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        new swal("Sesion terminada", res.data.message, "warning");
        history.push('/');
      }
    })
  }

  /*function getAdd() {

    var lat;
    var lon;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat=position.coords.latitude;
      lon=position.coords.longitude;
    });

    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyA2l6e2QArb9VSwtu81wO_RtWtq-eO82KI")
      .then(res => {
        res.header("Access-Control-Allow-Origin", "*");
        if (res.data.error_message) {
          console.log(res.data.error_message);
        }
      })
  }
  getAdd();*/






  useEffect(() => {



  }, []);

  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <div >
        <Row>
          <Button className="" onClick={handleShow} size="sm" variant="outline" color="#0d64c7">
            <img height="30px" src={user} alt="user" />
            <p className="spi" >Registrar / Iniciar sesion</p>
          </Button>
        </Row>
      </div>

    );
  }
  else {
    AuthButtons = (
      <div>
        <Row>
          <Button onClick={logoutSubmit} className="" href="/" size="sm" variant="outline" color="#0d64c7">
            <Image height="30px" src={user} alt="user" ></Image>
            <p className="spi">Cerrar sesion</p>
          </Button>
        </Row>
      </div>
    );
  }

  return (
    <div>
      <div className="mt-2">
        <Navbar className="navheader">
          <Nav>
            <Container fluid>
              <Row >
                <Col md="auto">
                  <Nav.Item>
                    <Link variant="outline" to="/">
                      <Image src={veter} width="400px"></Image>
                    </Link>
                  </Nav.Item>
                </Col>
                <Search/>
                <Col md="auto">
                  <Nav.Item>
                    {AuthButtons}
                  </Nav.Item>
                </Col>
                <Col md="auto">
                  <Nav.Item>
                    <Button size="sm" variant="outline" color="#0d64c7">
                      <img src={pin} alt="pin" />
                      <p className="">Internet</p>
                    </Button>
                  </Nav.Item>
                </Col>
                <Col md="auto">
                  <Nav.Item>
                    <Link to='/carro' >
                      <Button className="carro" variant="outline">
                        <img src={cart} alt="carro" />
                        <p className="spi"  >
                          Articulo(s)
                        </p>
                      </Button>
                    </Link>

                  </Nav.Item>
                </Col>
                <Col md="auto">
                  <Nav.Item>

                    <Link to='/mensual' >
                      <Button variant="outline">
                        <img src={box} alt="box" height="23px" />
                        <p className="spi"  >
                          Pedido Mensual
                        </p>
                      </Button>
                    </Link>

                  </Nav.Item>
                </Col>
              </Row>
            </Container>
          </Nav>
        </Navbar>
      </div>
      <div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar sesion</Modal.Title>
          </Modal.Header>
          <Modal.Body><Login /></Modal.Body>
          <Modal.Footer>No tiene cuenta? <Link to='/register' >Registrate!</Link></Modal.Footer>
        </Modal>
      </div>
    </div>

  )
}
export default Header;