<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categorias';
    protected $filleables =[
        'Nombre',
        'Slug',
        'Descripcion',
        'Meta_titulo',
        'Meta_descripcion',
        'Meta_keyword',
        'status',
        'image',
    ];
            
}
