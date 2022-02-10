<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'nombre' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'apellido' => 'required',
            'telefono' => 'required|min:9',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'nombre' => $request->nombre,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
            ]);

            $token = $user->createToken($user->email . '_Token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'username' => $user->nombre,
                'token' => $token,
                'message' => 'Usuario registrado exitosamente',
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);

        } else {

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status' => 401,
                    'message' => 'Datos invalidos',
                ]);

            } else {

                if($user->role_as == 1){
                    $role = 'admin';
                    $token =  $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else {
                    $role = 'user';
                    $token = $user->createToken($user->email.'_Token',[' '])->plainTextToken;
                }

                return response()->json([
                    'status' => 200,
                    'username' => $user->email,
                    'token' => $token,
                    'message' => 'Logeado exitosamente',
                    'role'=> $role
                ]);
            }
        }
    }

    public function logout()
    {
        
        
        return response()->json([
            'status' => 200,
            'message' => 'Sesion terminada exitosamente',
        ]);
    }
}
