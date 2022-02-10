<?php

namespace App\Models;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'nombre',
        'descripcion',
        'meta_titulo',
        'meta_descripcion',
        'keyword',
        'slug',
        'status',
        'precio',
        'marca',
        'precio_Oferta',
        'Stock',
        'image',
        'Categoria',
        'oferta',
        'bio_equivalente',
        'receta',
        'agotado',
        'fabricante',
        'sucursal',
    ];
    protected $with = ['categoria'];
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'Categoria','id');
    }
}
