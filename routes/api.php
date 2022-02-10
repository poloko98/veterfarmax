<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CarroController;
use App\Http\Controllers\API\OrdenController;
use App\Http\Controllers\API\PedidoController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\ProductoController;
use App\Http\Controllers\API\DireccionController;
use App\Http\Controllers\API\SubCategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

//AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Orden
Route::post('/ingresar-orden', [OrdenController::class, 'store']);
Route::post('validar-orden', [OrdenController::class, 'validar']);


//Frontend
Route::get('getCategoria', [FrontendController::class, 'categoria']);
Route::get('fetchproductos/{slug}', [FrontendController::class, 'producto']);
Route::get('verproducto/{categoria_slug}/{producto_slug}', [FrontendController::class, 'ver']);
Route::get('productosOferta', [FrontendController::class, 'ofertaProducto']);
Route::get('sucursales', [FrontendController::class, 'listaSucursales']);
Route::post('actualizar-sucursal', [FrontendController::class, 'actualizarSucursal']);


//pedido
Route::post('agregar-pedido', [PedidoController::class, 'agregarpedido']);
Route::get('ver-mensual', [PedidoController::class, 'vermensual']);
Route::put('actualizar-cantidad/{pedido_id}/{scope}', [PedidoController::class, 'actualizarcantidad']);
Route::delete('borrar-item/{pedido_id}', [PedidoController::class, 'borraritem']);

//carrito
Route::post('agregar-al-carrito', [CarroController::class, 'agregarCarrito']);
Route::get('ver-carrito', [CarroController::class, 'verCarro']);
Route::put('actualizar-cantidad-carro/{carro_id}/{scope}', [CarroController::class, 'actualizarcantidadCarro']);
Route::delete('borrar-item-carro/{carro_id}', [CarroController::class, 'borraritemCarro']);

//direccion
Route::post('agregar-direccion', [DireccionController::class, 'AgregarDireccion']);
Route::get('ver-direccion', [DireccionController::class, 'VerDirecciones']);


//Apis de administrador
Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenicated', function () {
        return response()->json(['message' => 'a', 'status' => 200], 200);
    });
    //Categorias----------------------------------
    Route::get('/ver-categorias', [CategoryController::class, 'index']);
    Route::post('/add-category', [CategoryController::class, 'store']);
    Route::get('/editar-categorias/{id}', [CategoryController::class, 'editar']);
    Route::post('/actualizar-categoria/{id}', [CategoryController::class, 'actualizar']);
    Route::delete('/borrar-categoria/{id}', [CategoryController::class, 'borrar']);
    Route::get('/lista-categorias', [CategoryController::class, 'lista']);

    //Sub Categoria
    Route::post('/add-sub-categoria', [SubCategoryController::class, 'agregar']);
    Route::get('/ver-sub-categorias', [SubCategoryController::class, 'index']);
    Route::get('/editar-subcategorias/{id}', [SubCategoryController::class, 'editar']);
    Route::put('/actualizar-subcategoria/{id}/', [SubCategoryController::class, 'actualizar']);


    //Productos------------------------------------
    Route::post('guardar-producto', [ProductoController::class, 'guardar']);
    Route::get('ver-producto', [ProductoController::class, 'lista']);
    Route::get('editar-producto/{id}', [ProductoController::class, 'editar']);
    Route::post('actualizar-producto/{id}', [ProductoController::class, 'update']);
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['cors'])->group(function () {
    Route::get('https://maps.googleapis.com/', 'Controller@googlemaps');
});
