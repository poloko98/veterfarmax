import React from 'react';
import ReactDOM from 'react-dom';
import Appr from './Appr';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './../Assets/Frontend/css/Topbar.css'
import './../Assets/Frontend/css/Footbar.css'
import './../Assets/Frontend/css/Reactboot.css'

ReactDOM.render(
  <React.StrictMode>
    <Appr />
  </React.StrictMode>,
  document.getElementById('root')
);

