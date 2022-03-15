import React from "react";
import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import routes from "../../Routes/routes";
//import '../../Assets/Admin/css/Navbar.css'
import { Redirect, Route, Switch } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import NavAdmin from "./Navbar";

const MainAdmin = () => {

    return (
        <div className="body-admin" >
            <Row>
                <Col sm="12" md="2" >
                    <Sidebar />
                </Col>

                <Col md="10" >

                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => (
                                            <route.component {...props} />
                                        )}
                                    />
                                )
                            )
                        })}

                        <Redirect from='admin' to="/admin" />

                    </Switch>

                </Col>

            </Row>



        </div>


    )
}

export default MainAdmin;