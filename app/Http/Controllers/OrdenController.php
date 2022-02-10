<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\DireccionController;
use App\Models\Carro;
use App\Models\direccion;
use App\Models\items_orden;
use App\Models\Orden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrdenController extends Controller
{
    public function store(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'id_direccion' => 'required|max:191',
                'nombre' => 'required|max:191',
                'apellido' => 'required|max:191',
                'telefono' => 'required|max:191',
                'rut' => 'required|max:191',
                'email' => 'required|max:191',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                $id_direccion = $request->input('id');
                $direccion =  direccion::find($id_direccion);
                if ($direccion) {
                    $orden = new Orden;
                    $user_id = auth('sanctum')->user()->id;
                    $orden->user_id = $user_id;
                    $orden->nombre = $request->nombre;
                    $orden->apellido = $request->apellido;
                    $orden->telefono = $request->telefono;
                    $orden->rut = $request->rut;
                    $orden->email = $request->email;
                    $orden->id_direccion = $direccion->id;
                    $orden->direccion = $direccion->direccion;
                    $orden->comuna = $direccion->comuna;
                    $orden->region = $direccion->region;
                    $orden->metodo_pago = "a";
                    $orden->nro_seguimiento = 'segui' . rand(11111111, 99999999);
                    $orden->save();

                    $carro = Carro::where('user_id', $user_id)->get();
                    $items_orden = [];

                    foreach ($carro as $item) {
                        $items_orden[] = [

                            'id_producto'=>$item->id_producto,
                            'cantidad'=>$item->cantidad,
                            'precio'=>$item->producto->precio,
                        ];
                        $item->producto->update([
                            'Stock'=>$item->producto->Stock - $item->cantidad
                        ]);
                    }
                    $orden->items_orden()->createMany($items_orden);
                    Carro::destroy($carro);

                    return response()->json([
                        'status' => 200,
                        'message' => 'Orden creada',
                    ]);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Seleccione una direccion',
                    ]);
                }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para agregar productos a su carro.'
            ]);
        }
    }
}
