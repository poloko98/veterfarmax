import { Container, Col, Row, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carru from '../../../Assets/Frontend/img/carruVet1.png'
import Carru2 from '../../../Assets/Frontend/img/carruVet2.png'
import Ofertas from '../../Components/Frontend/Catalogo/Ofertas';



function Main() {
    return (
        <div>
            <div className="body">
                <Container fluid>
                    <Row>
                        <Col>
                            <Carousel >
                                <Carousel.Item interval={10000}>
                                    <img className='d-block w-100' src={Carru} />
                                    <Carousel.Caption>
                                        <h3>Los mejores alimentos para tu mascota!</h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                
                                <Carousel.Item interval={10000}>
                                    <img className='d-block w-100' src={Carru2} />
                                    <Carousel.Caption>
                                        <h3>Todo en medicamentos para tus mascotas</h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                
                            </Carousel>
                        </Col>
                    </Row>
                </Container>

            </div>
            <Ofertas />
        </div>
    )
}
export default Main
