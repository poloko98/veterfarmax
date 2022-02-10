<?php

namespace App\Http\Controllers\API;

use App\Models\Categoria;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $categoria = Categoria::all();
        return response()->json([
            'status'=> 200,
            'categoria' => $categoria,
        ]);
    }

    public function editar($id){
        $categoria = Categoria::find($id);
        if($categoria){

            return response() -> json([
                'status'=> 200,
                'categoria'=> $categoria 
            ]);
        }
        else {
            return response() -> json([
                'status'=> 404,
                'message'=> 'No existe categoria con el ID indicado' 
            ]);
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'titulo' => 'required',
            'slug' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {

            $categoria = new Categoria;
            $categoria->Nombre = $request->input('nombre');
            $categoria->Descripcion = $request->input('descripcion');
            $categoria->Slug = $request->input('slug');
            $categoria->Meta_titulo = $request->input('titulo');
            $categoria->Meta_descripcion = $request->input('mDesc');
            $categoria->Meta_keyword = $request->input('keyword');
            $categoria->status = $request->input('status') == true ? '1':'0';
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/categoria/', $filename);
                $categoria->image = 'uploads/categoria/' . $filename;

            }
            $categoria->save();

            return response()->json([
                'status' => 200,
                'message' => 'Categoria agregada correctamente.',
            ]);
        }

    }

    public function actualizar(Request $request, $id){
        
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required',
            'Meta_titulo' => 'required',
            'Slug' => 'required',
            'Meta_descripcion' => 'required',
            'Meta_keyword' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);
        } else {

            $categoria =  Categoria::find($id);
            if($categoria){
                $categoria->Nombre = $request->input('Nombre');
                $categoria->Slug = $request->input('Slug');
                $categoria->Descripcion = $request->input('Descripcion');
                $categoria->Meta_titulo = $request->input('Meta_titulo');
                $categoria->Meta_descripcion = $request->input('Meta_descripcion');
                $categoria->Meta_keyword = $request->input('Meta_keyword');
                $categoria->status = $request->input('status') == 'Habilitado' ? '1':'0';
                if ($request->hasFile('image')) {
                    $path = $categoria->image;
                    if(File::exists($path))
                    {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/categoria/', $filename);
                    $categoria->image = 'uploads/categoria/' . $filename;
    
                }
                $categoria->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Categoria actualizada correctamente.',
                ]);
            }
            else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Categoria no encontrada.',
                ]);
            }
           
        }
    }

    public function borrar($id){
        $categoria = Categoria::find($id);
        if($categoria){

            $categoria-> delete();

            return response()->json([
                'status' => 200,
                'message' => 'Categoria eliminada correctamente.',
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Categoria no encontrada.',
            ]);
        }
    }

    public function lista(){

        $categoria = Categoria::where('status','1')->get();
        return response()->json([
            'status'=> 200,
            'categoria' => $categoria,
        ]);
    }
}
