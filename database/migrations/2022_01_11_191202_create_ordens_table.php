<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ordenes', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('telefono');
            $table->string('rut');
            $table->string('email');
            $table->integer('id_direccion');
            $table->string('direccion');
            $table->string('comuna');
            $table->string('region');
            $table->string('id_pago')->nullable();
            $table->string('metodo_pago');
            $table->string('nro_seguimiento');
            $table->string('status')->default('0');          
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ordens');
    }
}
