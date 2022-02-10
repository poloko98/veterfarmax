import VistaCategorias from "../Components/Admin/Catalogo/Categoria/Categorias";
import EditarCategorias from "../Components/Admin/Catalogo/Categoria/EditarCategorias";
import Categorias from "../Components/Admin/Catalogo/Categoria/AgregarCategorias";
import ControlPanel from "../Components/Admin/Catalogo/ControlPanel";
import Grupos from "../Components/Admin/Catalogo/Grupos";
import Productos from "../Components/Admin/Catalogo/Productos";
import AgregarProducto from "../Components/Admin/Catalogo/Producto/AgregarProducto";
import ListaProducto from "../Components/Admin/Catalogo/Producto/ListaProducto";
import EditarProducto from "../Components/Admin/Catalogo/Producto/EditarProducto";
import SubCategorias from "../Components/Admin/Catalogo/SubCategoria/AgregarSub"
import VistaSubCategorias from "../Components/Admin/Catalogo/SubCategoria/VerSub"
import EditarSubCategorias from "../Components/Admin/Catalogo/SubCategoria/EditarSub"

const routes = [
    //Admin
    { path: '/admin', exact: true, name: 'Admin'},
    //Categorias
    { path: '/admin/vista-categorias', exact: true, name: 'VistaCategorias', component: VistaCategorias},
    { path: '/admin/editar-categorias/:id', exact: true, name: 'EditarCategorias', component: EditarCategorias},
    { path: '/admin/agregar-categorias', exact: true, name: 'Categorias', component: Categorias},
    //Productos
    { path: '/admin/agregar-producto', exact: true, name: 'AgregarProducto', component: AgregarProducto},
    { path: '/admin/ver-producto', exact: true, name: 'ListaProducto', component: ListaProducto},
    { path: '/admin/editar-producto/:id', exact: true, name: 'EditarProducto', component: EditarProducto},
    //Sub Categorias
    { path: '/admin/agregar-subcategoria', exact: true, name: 'SubCategorias', component: SubCategorias},
    { path: '/admin/ver-subcategoria', exact: true, name: 'VistaSubCategorias', component: VistaSubCategorias},
    { path: '/admin/editar-subcategoria/:id', exact: true, name: 'EditarSubCategorias', component: EditarSubCategorias},
    //
    { path: '/admin/ControlPanel', exact: true, name: 'ControlPanel', component: ControlPanel},
    { path: '/admin/Grupos', exact: true, name: 'Grupos', component: Grupos},
    { path: '/admin/Productos', exact: true, name: 'Productos', component: Productos},
    
]

export default routes