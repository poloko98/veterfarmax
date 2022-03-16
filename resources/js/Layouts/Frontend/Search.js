import { Nav, Navbar, Container, Button, InputGroup, FormControl, Col, Row, Stack, Modal, Image, DropdownButton, Dropdown } from 'react-bootstrap';
import lupa from "../../../Assets/Frontend/img/search.svg";
import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from "react-router";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../../css/style.css'
import axios from 'axios';

function Search() {
  const [opt, setOpt] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [producto, setProducto] = useState([]);
  const [keywordInput, setKeywordinput] = useState({
    keyword: ""
  });
  const count_productos = producto.length;
  var items = "";

  items = producto.map((item) => {
    return (
      { value: item.slug, name: item.nombre, precio: item.precio, marca: item.marca }

    )
  })

  const handleOnSearch = (e) => {

  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {


    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>nombre: {item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>marca: {item.marca}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>precio: {item.precio}</span>
      </>
    )
  }


  const handleInput = (e) => {
    e.persist();
    setKeywordinput({ ...keywordInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let isMounted = true;
    axios.get(`/api/buscar/a`).then((res) => {

      if (isMounted) {
        if (res.data.status === 200) {
          setProducto(res.data.producto_data.producto);
          setLoading(false);
        }
        else if (res.data.status === 400) {
          new swal("Warning", res.data.message, "error");
        }
        else if (res.data.status === 404) {
          new swal("Warning", res.data.message, "error");
          history.pushState('/categorias');
        }
      }

    });

    return () => {
      isMounted = false;
    }
  }, [history]);


  return (
    <div>
      <Col md="auto">
        <Nav.Item className="mt-3">
          <div style={{ width: 400 }} >
            <ReactSearchAutocomplete
              items={items}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>

        </Nav.Item>
      </Col>
      {/* <InputGroup className="search" size="lg">
            <FormControl name="keyword" placeholder="Buscar producto" onChange={handleInput} value={keywordInput.keyword} />
            <Button variant="outline-secondary" href={`/buscar/${keywordInput.keyword}`} id="button-addon2">
              <img src={lupa} alt="lupa"   ></img>
            </Button>
          </InputGroup> */}
      {/* <SelectSearch
        options={buscar}
        search
        filterOptions={fuzzySearch}
        placeholder="Ingrese el nombre del producto"
        onChange={handleInput}
      />  */}



    </div>
  )
}

export default Search;