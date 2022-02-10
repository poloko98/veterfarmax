<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Sucursal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FrontendController extends Controller
{
    public function categoria()
    {
        $categoria = Categoria::where('status', '1')->get();
        return response()->json([
            'status' => 200,
            'categoria' => $categoria
        ]);
    }

    public function producto($slug)
    {
        $categoria = Categoria::where('slug', $slug)->where('status', '1')->first();
        if ($categoria) {
            $producto = Producto::where('Categoria', $categoria->id)->where('status', '1')->get();
            if ($producto) {
                return response()->json([
                    'status' => 200,
                    'producto_data' => [
                        'producto' => $producto,
                        'categoria' => $categoria,
                    ]
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay productos en esta categoria'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Categoria no encontrada'
            ]);
        }
    }

    public function ofertaProducto()
    {
        $productos = Producto::where('oferta', '1')->get();
        return response()->json([
            'status' => 200,
            'productos' => $productos,
        ]);
    }
    public function ver($categoria_slug, $producto_slug)
    {
        $categoria = Categoria::where('slug', $categoria_slug)->where('status', '1')->first();
        if ($categoria) {

            $producto = Producto::where('Categoria', $categoria->id)
                ->where('slug', $producto_slug)
                ->where('status', '1')
                ->first();
            if ($producto) {
                return response()->json([
                    'status' => 200,
                    'producto' => $producto,

                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No hay productos en esta categoria'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Categoria no encontrada'
            ]);
        }
    }

    public function listaSucursales()
    {
        $sucursales = Sucursal::all();
        return response()->json([
            'status' => 200,
            'sucursales' => $sucursales,

        ]);
    }

    public function actualizarSucursal(Request $request)
    {
        if (auth('sanctum')->check()) {

            $validator = Validator::make($request->all(), [
                'sucursal' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);

            } else {

                $user_id = auth('sanctum')->user()->id;
                $user =  User::find($user_id);
                $user->sucursal = $request->input('sucursal');
                $user->update();
                
                return response()->json([
                    'status' => 200,
                    'message' => 'Sucursal cambiada correctamente.',
                ]);
            }
        }
    }
}
