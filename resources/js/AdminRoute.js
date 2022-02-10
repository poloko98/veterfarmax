import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router";
import swal from "sweetalert2";
import MainAdmin from "./Layouts/Admin/Main";
import { useHistory } from 'react-router-dom';

function AdminRoute(...rest) {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`api/checkingAuthenicated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false)
        });
        return () => {
            setAuthenticated(false);
        }

    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        const status = err.response ? err.response.status : null

        if (err.response.status === 401) {

            new swal("No autorizado", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
        
        return response;
    }, function (error) {
        if(error.response.status === 403){
            new swal("Forbiden",error.response.data.message,"warning");
            history.push('/403');
        }
        else if(error.response.status === 404){
            new swal("Forbiden","Pagina no encontrada","warning");
            history.push('/404');
        }
        return Promise.reject(error);
    }
    );

    if (loading) {
        return <h1>Cargando...</h1>
    }


    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<MainAdmin {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)
            }
        />
    )


}
export default AdminRoute;