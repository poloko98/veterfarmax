import React, { useEffect, useState } from "react";
import { Accordion, Nav, Row, Form, Button, Card } from "react-bootstrap";
import Header from "../../../Layouts/Frontend/Head";
import Topbar from "../../../Layouts/Frontend/TopBar";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import NavbarF from "../../../Layouts/Frontend/Navbar";


function Barrafiltro() {
    useEffect(() => {
        axios.get(`/api/lista-categorias`).then((res) => {
          if (res.data.status === 200) {
            // setListaCategoria(res.data.categoria);
          }
        });
      }, []);
    
    return (
        <div>
            <Accordion className="flex-column">
                <Accordion.Item>
                    <Accordion.Header>
                        <p>Alimentos</p>
                    </Accordion.Header>
                    <Accordion.Body >
                        <Form.Check
                            type="checkbox"
                            label="Can't check this"
                        />
                    </Accordion.Body>

                </Accordion.Item >
            </Accordion>
        </div >
    )
}
export default Barrafiltro;