import Button from '@restart/ui/esm/Button';
import { Dropdown, Container, DropdownButton, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert2';
import phon from "../../../Assets/Frontend/img/phone-call.svg"
import Sucursal from '../../Components/Frontend/Sucursal/Sucursal';


function Topbar() {
  return (

    <div className="topbar">
      <Container fluid>
      <Row >
        <Col md="auto">
          {/* <Sucursal /> */}
        </Col>
        <Col >
          
          {/* <img className="sdi" src={logoSDI} alt="sdi"></img> */}
          <img className="phon" src={phon} alt="fono"></img>
          <span className="nro">6267287832</span>
        </Col>
      </Row>
      </Container>
    </div>





  )
}
export default Topbar;