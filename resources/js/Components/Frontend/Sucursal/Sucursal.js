import React, { useEffect, useState } from "react";
import { Col, DropdownButton, Dropdown } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function Sucursal() {
    const [sucursales, setSucursales] = useState([]);
    const [usuario,setUsuario]= useState({
        sucursal:"1"
    });
    const [usuarioSucursal, setUsuarioSucursal] = useState({});
    const history = useHistory();

    const handleSucursal = (e) => {
        e.persist();
        console.log(usuario.sucursal);
        const formData = new FormData();
        formData.append("sucursal","1");

        axios.post(`/api/actualizar-sucursal`,formData).then((res)=>{
            if (res.data.status === 200) {
                new swal("Success", res.data.message, "success");
            }
        });
   
    }

    useEffect(() => {
        let isMounted = true;
        
        axios.get(`/api/sucursales`).then((res) => {
            if (res.data.status === 200) {
                setSucursales(res.data.sucursales);
            }
            else if (res.data.status === 401) {
                new swal("Warning", "No se encontraron sucursales", "error");
    
            }
        });

        // axios.get(`/api/ver-usuario`).then((res) => {
        //     if (res.data.status === 200) {
        //         setUsuario(res.data.user_id);
        //         console.log(res.data.user_id);
        //     }
        //     else if (res.data.status === 401) {
        //         new swal("Warning", "No se encontraron sucursales", "error");
    
        //     }
        // });
        return () => {
            isMounted = false;
        }
    }, [history]);

    return (
        <div>

            <DropdownButton id="dropdown-basic-button" title="Cambiar de sucursal">
                {sucursales.map((item, idx) => {
                    return (
                        <Dropdown.Item name="sucursal" onClick={handleSucursal} value={item.id}>{item.nombre}</Dropdown.Item>  
                    )

                })}
            </DropdownButton>
        </div>

    )
}

export default Sucursal;