<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class items_orden extends Model
{
    use HasFactory;
    protected $table = 'items_ordens';
    protected $fillable = [
        'id_orden',
        'id_producto',
        'cantidad',
        'precio',

    ];
}
