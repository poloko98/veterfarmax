

import axios from 'axios';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Login from './Components/Frontend/Auth/Login.js';
import Register from './Components/Frontend/Auth/Register.js';
import MainAdmin from "./Layouts/Admin/Main";
import Main from './Layouts/Frontend/Main.js';
import AdminRoute from './AdminRoute';
import Page404 from './Components/error/Page404.js'
import Page403 from './Components/error/Page403.js'
import Perfil from './Components/Frontend/Perfil'
import PublicRoute from './PublicRoute.js';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'aplication/json';

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function Appr() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route path="/perfil">
          {localStorage.getItem('auth_token') ? <Redirect to='/'/> :<Perfil/>}
          </Route>
          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/'/> :<Login/> }
          </Route>
          
          <Route  path="/register"> 
          {localStorage.getItem('auth_token') ? <Redirect to='/'/> :<Register/> }
          </Route>  
          <AdminRoute path="/admin" name="admin"/>
          <PublicRoute path="/" name="Home" />
          
          <Route path="/403" component={Page403} />
          <Route path="/404" component={Page404} />
          
          
        </Switch>
      </Router>



    </div>
  );
}

export default Appr;
