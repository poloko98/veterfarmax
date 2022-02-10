<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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
                'nombre' => 'required|max:191',
                'apellido' => 'required|max:191',
                'telefono' => 'required|max:191',
                'rut' => 'required|max:191',
                'email' => 'required|max:191',
                'direccion'=> 'required|max:191',
                'comuna'=> 'required|max:191',
                'region'=> 'required|max:191',
                'metodo_pago'=> 'required|max:191',
                'id_pago'=> 'required|max:191',
                
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                // $id_direccion = $request->input('id');
                // $direccion =  direccion::find($id_direccion);
                // if ($direccion) {
                    $orden = new Orden;
                    $user_id = auth('sanctum')->user()->id;
                    $orden->user_id = $user_id;
                    $orden->nombre = $request->nombre;
                    $orden->apellido = $request->apellido;
                    $orden->telefono = $request->telefono;
                    $orden->rut = $request->rut;
                    $orden->email = $request->email;
                    $orden->id_direccion = rand(11111111, 99999999);
                    $orden->direccion = $request->direccion;
                    $orden->comuna = $request->comuna;
                    $orden->region = $request->region;
                    $orden->metodo_pago = $request->metodo_pago;
                    $orden->id_pago = $request->id_pago;
                    $orden->nro_seguimiento =  rand(11111111, 99999999);
                    $orden->save();

                    $carro = Carro::where('user_id', $user_id)->get();
                    $ordencita = [];

                    foreach ($carro as $item) {
                        $ordencita[] = [
                            'id_producto'=>$item->producto_id,
                            'cantidad'=>$item->producto_cantidad,
                            'precio'=>$item->producto->precio,
                        ];

                        $item->producto->update([
                            'Stock'=>$item->producto->Stock - $item->producto_cantidad
                        ]);
                    }
                    $orden->items_orden()->createMany($ordencita);
                    Carro::destroy($carro);

                    return response()->json([
                        'status' => 200,
                        'message' => 'Orden creada',
                    ]);
                // } else {
                //     return response()->json([
                //         'status' => 404,
                //         'message' => 'Seleccione una direccion',
                //     ]);
                // }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para agregar productos a su carro.'
            ]);
        }
    }

    public function validar(Request $request){

        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [               
                'nombre' => 'required|max:191',
                'apellido' => 'required|max:191',
                'telefono' => 'required|max:191',
                'rut' => 'required|max:191',
                'email' => 'required|max:191',
                'direccion'=> 'required|max:191',
                'comuna'=> 'required|max:191',
                'region'=> 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                 return response()->json([
                        'status' => 200,
                        'message' => 'Datos validados',
                    ]);  
                
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Necesita iniciar sesion para agregar productos a su carro.'
            ]);
        }
    }
}

