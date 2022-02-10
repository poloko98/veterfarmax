<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubCategoriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('_sub_categoria', function (Blueprint $table) {
            $table->id();
            $table->string('Nombre');
            $table->string('Slug');
            $table->longText('Descripcion')->nulleable();
            $table->string('Meta_titulo')->nulleable();
            $table->mediumText('Meta_descripcion')->nulleable();
            $table->mediumText('Meta_keyword')->nulleable();
            $table->integer('Categoria');
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
        Schema::dropIfExists('_sub_categoria');
    }
}
