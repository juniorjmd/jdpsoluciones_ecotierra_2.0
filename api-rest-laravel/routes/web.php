<?php

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
    return view('welcome');
});


//Route::get('/getCoordenadas', 'MapasController@getAllMapas' );
//Route::post('/setCoordenadas', 'MapasController@setNewMapa' );
//Route::post('/updateCoordenadas/{id}', 'MapasController@updateMapa' );


Route::resource('/api/mapas', 'MapasController');
Route::post('/api/mapas/sorte', 'MapasController@sorteAllMapas');

