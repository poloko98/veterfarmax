<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DireccionController extends Controller
{
    //
    public function VerDirecciones()
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $direcciones = direccion::where('user_id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'direccion' => $direcciones,
            ]);
        }
    }

    public function AgregarDireccion(Request $request){

        $validator = Validator::make($request->all(), [
            'direccion' => 'required|max:255',
            'comuna' => 'required|max:20',
            'region' => 'required|max:20',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            $user_id = auth('sanctum')->user()->id;
            $direccion = new direccion();
            $direccion->user_id = $user_id;
            $direccion->direccion = $request->input('direccion');
            $direccion->nombre = 'a';
            $direccion->comuna = $request->input('comuna');
            $direccion->region = $request->input('region');        
            $direccion->save();

            return response()->json([
                'status' => 200,
                'message' => 'Direccion agregada correctamente.',
            ]);
        }
    }
}
