import { Container, Row } from 'react-bootstrap';
import { Route, Switch } from "react-router";
import axios from 'axios';
import publicRouteList from '../../Routes/PublicRouteList';
import Footer from './Footer';
import Header from './Head';
import NavbarF from './Navbar';
import Topbar from './TopBar';
import Barrafiltro from '../../Components/Frontend/Catalogo/BarraFiltro';
const FrontendLayout = () => {

    return (
        <div className="body" >
            <Row>
                <Container fluid>
                    <Topbar />
                </Container>

            </Row>
            <Row>
                <Container fluid>
                    <Header />
                </Container>
            </Row>
            <Row>
                <Container fluid>
                    <NavbarF />
                </Container>
            </Row>

            <Container fluid className='mt-4'>
                <Switch>
                    {publicRouteList.map((routedata, idx) => {
                        return (
                            routedata.component && (
                                <Route
                                    key={idx}
                                    path={routedata.path}
                                    exact={routedata.exact}
                                    name={routedata.name}
                                    render={(props) => (
                                        <routedata.component {...props} />
                                    )}
                                />
                            )
                        )
                    })}
                </Switch>
            </Container>
            <Footer />
        </div>
    )
}

export default FrontendLayout;
