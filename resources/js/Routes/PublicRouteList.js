import Main from '../Layouts/Frontend/Main';
import Categorias from '../Components/Frontend/Catalogo/Categorias';
import VerProducto from '../Components/Frontend/Catalogo/VerPoducto';
import DetalleProducto from '../Components/Frontend/Catalogo/DetalleProducto';
import PedidoMensual from '../Components/Frontend/Mensual/PedidoMensual';
import Carrito from '../Components/Frontend/Carrito/Carrito';
import Checkout from '../Components/Frontend/Carrito/Checkout';
import Direccion from '../Components/Frontend/Direccion'
import Resultado from '../Components/Frontend/Catalogo/Resultado';

const publicRouteList = [
    { path: '/', exact: true, name: 'Main', component: Main },
    { path: '/categorias', exact: true, name: 'Categorias', component: Categorias },
    { path: '/categorias/:slug', exact: true, name: 'VerProducto', component: VerProducto },
    { path: '/categorias/:categoria/:producto', exact: true, name: 'DetalleProducto', component: DetalleProducto },
    { path: '/mensual', exact: true, name: 'PedidoMensual', component: PedidoMensual},
    { path: '/Carro', exact: true, name: 'Carrito', component: Carrito},
    {path: '/Checkout', exact: true, name: 'Checkout', component: Checkout},
    {path: '/Direccion', exact: true, name: 'Direccion', component: Direccion},
    // {path: '/buscar', exact: true, name: 'Busqueda', component: Resultado} ,
    {path: '/buscar/:keyword', exact: true, name: 'Resultado', component: Resultado} 
    
    
];

export default publicRouteList;