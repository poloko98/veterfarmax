<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\SubCategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubCategoryController extends Controller
{


    public function index()
    {
        $subcategoria = subcategoria::all();
        return response()->json([
            'status' => 200,
            'subcategoria' => $subcategoria,
        ]);
    }

    public function actualizar(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required',
            'Meta_titulo' => 'required',
            'Slug' => 'required',
            'Categoria' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {

            $subcategoria =  SubCategoria::find($id);
            if($subcategoria){

                $subcategoria->Nombre = $request->input('Nombre');
                $subcategoria->Descripcion = $request->input('Descripcion');
                $subcategoria->Slug = $request->input('Slug');
                $subcategoria->Meta_titulo = $request->input('Meta_titulo');
                $subcategoria->Meta_descripcion = $request->input('Meta_descripcion');
                $subcategoria->Meta_keyword = $request->input('Meta_keyword');
                $subcategoria->Categoria = $request->input('Categoria');
                
                $subcategoria->save();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Subcategoria actualizada correctamente.',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Subcategoria no encontrada.',
                ]);
            }
           
        }
    }

    public function editar($id)
    {
        $subcategoria = SubCategoria::find($id);
        if($subcategoria){

            return response() -> json([
                'status'=> 200,
                'subcategoria'=> $subcategoria 
            ]);
        }
        else {
            return response() -> json([
                'status'=> 404,
                'message'=> 'No existe subcategoria con el ID indicado' 
            ]);
        }
    }


    public function agregar(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'titulo' => 'required',
            'slug' => 'required',
            'Categoria' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $subcategoria = new SubCategoria;
            $subcategoria->Nombre = $request->input('nombre');
            $subcategoria->Descripcion = $request->input('descripcion');
            $subcategoria->Slug = $request->input('slug');
            $subcategoria->Meta_titulo = $request->input('titulo');
            $subcategoria->Meta_descripcion = $request->input('mDesc');
            $subcategoria->Meta_keyword = $request->input('keyword');
            $subcategoria->Categoria = $request->input('Categoria');

            $subcategoria->save();

            return response()->json([
                'status' => 200,
                'message' => 'Sub-categoria agregada correctamente.',
            ]);
        }
    }
}
