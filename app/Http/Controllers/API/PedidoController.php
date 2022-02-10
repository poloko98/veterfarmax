<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\pedido;
use App\Models\Producto;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    //
    public function agregarpedido(Request $request)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $id_producto = $request->id_producto;
            $cantidad_producto = $request->cantidad_producto;
            $productchk = Producto::where('id', $id_producto)->first();

            if ($productchk) {

                if (pedido::where('producto_id', $id_producto)->where('user_id', $user_id)->exists()) {

                    return response()->json([
                        'status' => 409,
                        'message' => $productchk->nombre . 'Producto ya agregado.'
                    ]);
                } else {

                    $item_pedido = new pedido;
                    $item_pedido->user_id = $user_id;
                    $item_pedido->producto_id = $id_producto;
                    $item_pedido->producto_cantidad = $cantidad_producto;
                    $item_pedido->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Agregado al pedido'
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
                'message' => 'Necesita iniciar sesion para agregar productos a su pedido.'
            ]);
        }
    }

    public function vermensual()
    {
        if (auth('sanctum')->check()) 
        {
            $user_id = auth('sanctum')->user()->id;
            $items_pedido = pedido::where('user_id',$user_id)->get();

            return response()->json([
                'status' => 200,
                'pedido' => $items_pedido,
            ]);

        }
        else{

            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para ver su pedido mensual'
            ]);
        }
    }

    public function actualizarcantidad($pedido_id, $scope)
    {
        if (auth('sanctum')->check()) 
        {
            $user_id = auth('sanctum')->user()->id;
            $item_pedido = pedido::where('id',$pedido_id)->where('user_id',$user_id )->first();
            if($scope == "aum"){
                $item_pedido -> producto_cantidad += 1;
            }
            elseif($scope == "dis"){
                $item_pedido -> producto_cantidad -= 1;
            }
            $item_pedido ->update();

            return response()->json([
                'status' => 200,
                'message' => 'Cantidad actualizada',
            ]);

        }
        else{

            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para continuar'
            ]);
        }
    }

    public function borraritem($pedido_id)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $item_carro = pedido::where('id', $pedido_id)->where('user_id', $user_id)->first();

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
