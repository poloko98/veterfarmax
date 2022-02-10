import React, {useState} from "react";
import { Col, Container, Row, Form, Button, Card } from "react-bootstrap";
import Header from "../../Layouts/Frontend/Head";
import Topbar from "../../Layouts/Frontend/TopBar";
import axios from 'axios';
import swal from 'sweetalert2';
import {useHistory} from 'react-router-dom';
import NavbarF from "../../Layouts/Frontend/Navbar";

function Perfil() {
    return (
        <div>
            <Topbar />
            <Header />
            <NavbarF />
        </div>

    )
}

export default Perfil;