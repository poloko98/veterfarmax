<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class informacionPersonal extends Model
{
    use HasFactory;
    protected $table = 'informacion_personal';
    protected $fillable = [
        'user_id',
        'nombre',
        'apellido',
        'rut',
        'telefono',
        'correo',
        'fecha_nacimiento',
    ];
}
