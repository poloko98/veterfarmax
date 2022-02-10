<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Carro;
use App\Models\Producto;
use Illuminate\Http\Request;

class CarroController extends Controller
{
    public function agregarCarrito(Request $request)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $id_producto = $request->id_producto;
            $cantidad_producto = $request->cantidad_producto;
            $productchk = Producto::where('id', $id_producto)->first();

            if ($productchk) {

                if (Carro::where('producto_id', $id_producto)->where('user_id', $user_id)->exists()) {

                    return response()->json([
                        'status' => 409,
                        'message' => $productchk->nombre . 'Producto ya agregado.'
                    ]);
                } else {

                    $item_carro = new Carro;
                    $item_carro->user_id = $user_id;
                    $item_carro->producto_id = $id_producto;
                    $item_carro->producto_cantidad = $cantidad_producto;
                    $item_carro->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Agregado al carro'
                    ]);
                }

            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Producto no encontrado'
                ]);
            }

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para agregar productos a su carro.'
            ]);
        }
    }

    public function verCarro()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $items_carro = Carro::where('user_id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'carro' => $items_carro,
            ]);
        } else {

            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para ver su carrito'
            ]);
        }
    }

    public function actualizarcantidadCarro($carro_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $item_carro = Carro::where('id', $carro_id)->where('user_id', $user_id)->first();
            if ($scope == "aum") {
                $item_carro->producto_cantidad += 1;
            } elseif ($scope == "dis") {
                $item_carro->producto_cantidad -= 1;
            }
            $item_carro->update();

            return response()->json([
                'status' => 200,
                'message' => 'Cantidad actualizada',
            ]);
        } else {

            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para continuar'
            ]);
        }
    }

    public function borraritemCarro($carro_id)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $item_carro = Carro::where('id', $carro_id)->where('user_id', $user_id)->first();

            if ($item_carro) {

                $item_carro->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Producto eliminado',
                ]);
            } else {

                return response()->json([
                    'status' => 404,
                    'message' => 'Producto no encontrado'
                ]);
            }
        } else {

            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para ver su carro'
            ]);
        }
    }
}
