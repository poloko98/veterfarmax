import {Container, Image, Row, Col } from 'react-bootstrap'
import facebook from "../../../Assets/Frontend/img/fb.svg"
import insta from "../../../Assets/Frontend/img/instagram.svg"
function Footer() {
    return (
        <div>

            <div className="footbar">
                <Container fluid>
                    <Row >
                        <Col md="12" lg="4">
                            <div>
                                <h1>1</h1>
                            </div>
                        </Col>
                        <Col md="4" lg="3">
                            <div className="titulos mt-4">
                                <b><p>VETERFARMA</p></b>
                            </div>
                            <div className="textos">
                                <p>Nosotros</p>
                                <p>Regístrate</p>
                                <p>Trabaja con nosotros</p>
                                <p>Politicas de Privacidad</p>
                                <p>Bases Legales</p>
                            </div>
                        </Col>
                        <Col md="4" lg="3">
                            <div className="titulos mt-4">
                                <b><p>SERVICIO AL CLIENTE</p></b>
                            </div>
                            <div className="textos">
                                <p>Preguntas frecuentes</p>
                                <p>Contactanos</p>
                            </div>
                        </Col>
                        <Col md="4" lg="2">
                            <div className="titulos mt-4 ">
                                <b><p>SÍGUENOS</p></b>
                                <Image className="logos mt-2" src={insta}  roundedCircle />
                                <Image className="logos mt-2" src={facebook}  roundedCircle />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="copyright">
                <Container fluid>
                    <Row >
                        <Col className='mt-3'>
                            <p>©. 2021 <b>Farmacrónicos</b>  Todos los Derechos Reservados</p>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    )
}

export default Footer;