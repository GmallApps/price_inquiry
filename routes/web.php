<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;

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


Route::middleware('guest')->group(function(){
    Route::view('/','pages.index')->name('login');
    Route::get('/',[StoreController::class,'inquiryIndexView'])->name('inquiry.index');
});

    Route::get('/api/fetch/tpsStore',[StoreController::class,'fetchStoreData']);
    Route::get('/api/get/item/{barcode}',[StoreController::class,'getStoreInformation']);
    Route::get('/api/store/migration',[StoreController::class,'storeMigration']);
    Route::post('/api/form/data',[StoreController::class,'formData']);









