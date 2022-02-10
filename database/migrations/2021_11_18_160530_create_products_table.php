<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->longText('descripcion');
            $table->string('meta_titulo')->nullable();
            $table->string('meta_descripcion')->nullable();
            $table->string('keyword')->nullable();
            $table->string('slug');
            $table->tinyInteger('status');
            $table->string('precio');
            $table->string('marca')->nullable();
            $table->string('precio_Oferta')->nullable();
            $table->string('Stock');
            $table->string('image')->nullable();
            $table->integer('Categoria');
            $table->tinyInteger('oferta')->default('0')->nullable();
            $table->tinyInteger('bio_equivalente')->default('0')->nullable();
            $table->tinyInteger('receta')->default('0')->nullable();
            $table->tinyInteger('agotado')->default('0')->nullable();
            $table->string('fabricante')->nullable();
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
        Schema::dropIfExists('products');
    }
}
