<?php

use App\Http\Controllers\ReactController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
});

Auth::routes();

// Route::get('/{path?}', [
//     ReactController::class, 'show',
//     'as' => 'react',
//     'where' => ['path' => '.*']
// ]);

Route::get('{reactRoutes}', function () {
    return view('app'); // your start view
})->where('reactRoutes', '^((?!api).)*$');


Auth::routes();


