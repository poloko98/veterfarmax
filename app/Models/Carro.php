<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carro extends Model
{
    use HasFactory;
    protected $table = 'carts';
    protected $fillable = [
        'user_id',
        'producto_id',
        'producto_cantidad',
        'sucursal',
    ];

    protected $with = ['producto'];
    public function producto(){
        
        return $this->belongsTo(Producto::class, 'producto_id','id');
    }
}
