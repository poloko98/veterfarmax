<?php

namespace App\Models;

use App\Models\items_orden;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Orden extends Model
{
    use HasFactory;
    protected $table = 'ordenes';
    protected $fillable = [
        'user_id',
        'id_direccion',
        'nombre',
        'apellido',
        'telefono',
        'rut',
        'email',
        'direccion',
        'comuna',
        'region',
        'id_pago',
        'metodo_pago',
        'nro_seguimiento',
        'status',
        'sucursal',

    ];

    public function items_orden()
    {
        return $this->hasMany(items_orden::class,'id_orden','id');
    }
    
}
