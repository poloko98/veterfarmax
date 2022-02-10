<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pedido extends Model
{
    use HasFactory;
    protected $table = 'pedido';
    protected $fillable = [
        'user_id',
        'producto_id',
        'producto_cantidad',
    ];

    protected $with = ['producto'];
    public function producto(){
        
        return $this->belongsTo(Producto::class, 'producto_id','id');
    }
}
