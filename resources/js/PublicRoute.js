import React from "react";
import { Route } from "react-router-dom";
import FrontendLayout from "./Layouts/Frontend/FrontendLayout";
import Main from "./Layouts/Frontend/Main";
import NavbarF from './Layouts/Frontend/Navbar'

function PublicRoute ({...rest}){
    return(
        <Route {...rest} render={ (props) => <FrontendLayout {...props}/>} />
    )
};

export default PublicRoute;