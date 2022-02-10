<?php

namespace App\Http\Controllers\API;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'Categoria' => 'required|max:191',
            'nombre' => 'required|max:191',
            'meta_titulo' => 'required|max:191',
            'slug' => 'required|max:191',
            'status' => 'required',
            'precio' => 'required|max:20',
            'marca' => 'required|max:191',
            'precio_Oferta' => 'required|max:20',
            'Stock' => 'required|max:4',

        ]
        );

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);

        } else {

            $producto = Producto::find($id);

            if($producto)
            {
                $producto->nombre = $request->input('nombre');
                $producto->descripcion = $request->input('descripcion');
                $producto->meta_titulo = $request->input('meta_titulo');
                $producto->meta_descripcion = $request->input('meta_descripcion');
                $producto->keyword = $request->input('keyword');
                $producto->slug = $request->input('slug');
                $producto->fabricante = $request->input('fabricante');
                $producto->precio = $request->input('precio');
                $producto->marca = $request->input('marca');
                $producto->precio_Oferta = $request->input('precio_Oferta');
    
                if ($request->hasFile('image')) 
                {
                    $path = $producto->image;
                    if(File::exists($path))
                    {
                        File::delete($path);
                    }

                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/product/', $filename);
                    $producto->image = 'uploads/product/' . $filename;
    
                }
    
                $producto->Stock = $request->input('Stock');
                $producto->Categoria = $request->input('Categoria');
                $producto->oferta = $request->input('oferta') == 'Si' ? '1' : '0';
                $producto->bio_equivalente = $request->input('bio_equivalente') == 'Si' ? '1' : '0';
                $producto->receta = $request->input('receta') == 'Si' ? '1' : '0';
                $producto->agotado = $request->input('agotado') == 'Si' ? '1' : '0';
                $producto->status = $request->input('status') == 'Si' ? '1' : '0';
                $producto->update();
    
                return response()->json([
                    'status' => 200,
                    'message' => "Producto actualizado.",
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' => "Producto no encontrado",
                ]);
            }
            
        }

        
    }
    

    public function editar($id)
    {
        $producto = Producto::find($id);
        if ($producto) {

            return response()->json([
                'status' => 200,
                'producto' => $producto,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Producto no encontrado',
            ]);
        }
    }

    public function lista()
    {
        $productos = Producto::all();
        return response()->json([
            'status' => 200,
            'productos' => $productos,
        ]);
    }

    


    public function guardar(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'Categoria' => 'required|max:191',
            'nombre' => 'required|max:191',
            'meta_titulo' => 'required|max:191',
            'slug' => 'required|max:191',
            'status' => 'required',
            'precio' => 'required|max:20',
            'marca' => 'required|max:191',
            'precio_Oferta' => 'required|max:20',
            'Stock' => 'required|max:4',
            

        ]
        );

        if ($validator->fails()) {

            return response()->json([
                'status' => 422,
                'errors' => $validator->messages(),
            ]);

        } else {
            $producto = new Producto;

            $producto->nombre = $request->input('nombre');
            $producto->descripcion = $request->input('descripcion');
            $producto->meta_titulo = $request->input('meta_titulo');
            $producto->meta_descripcion = $request->input('meta_descripcion');
            $producto->keyword = $request->input('keyword');
            $producto->slug = $request->input('slug');
            $producto->fabricante = $request->input('fabricante');
            $producto->precio = $request->input('precio');
            $producto->marca = $request->input('marca');
            $producto->precio_Oferta = $request->input('precio_Oferta');

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/product/', $filename);
                $producto->image = 'uploads/product/' . $filename;

            }

            $producto->Stock = $request->input('Stock');
            $producto->Categoria = $request->input('Categoria');
            $producto->oferta = $request->input('oferta') == 'Si' ? '1' : '0';
            $producto->bio_equivalente = $request->input('bio_equivalente') == 'Si' ? '1' : '0';
            $producto->receta = $request->input('receta') == 'Si' ? '1' : '0';
            $producto->agotado = $request->input('agotado') == 'Si' ? '1' : '0';
            $producto->status = $request->input('status') == 'Si' ? '1' : '0';
            $producto->save();

            return response()->json([
                'status' => 200,
                'message' => "Producto agregado.",
            ]);
        }

        $producto = new Producto;
    }
}
