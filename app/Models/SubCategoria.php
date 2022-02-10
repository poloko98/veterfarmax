<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoria extends Model
{
    use HasFactory;
    protected $table = '_sub_categoria';
    protected $filleables =[
        'Nombre',
        'Slug',
        'Descripcion',
        'Meta_titulo',
        'Meta_descripcion',
        'Meta_keyword',
        'Categoria',
        
    ];
    protected $with = ['categoria'];
    
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'Categoria','id');
    }
}
