<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class direccion extends Model
{
    use HasFactory;
    protected $table = 'direccion';
    protected $fillable = [
        'user_id',
        'nombre',
        'direccion',
        'comuna',
        'region',
    ];
}
