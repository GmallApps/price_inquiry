<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\AuthController;
use App\Models\Ad;

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
    // Route::view('/','pages.index')->name('login');
    Route::view('/login','pages.login')->name('login');
    Route::get('/',[StoreController::class,'inquiryIndexView'])->name('inquiry.index');
    Route::post('/login',[AuthController::class,'login'])->name('login')->middleware('throttle:3,1');
});

    Route::get('/api/fetch/tpsStore',[StoreController::class,'fetchStoreData']);
    Route::get('/api/get/item/{barcode}',[StoreController::class,'getStoreInformation']);
    Route::get('/api/store/migration',[StoreController::class,'storeMigration']);
    Route::post('/api/form/data',[StoreController::class,'formData']);

    Route::middleware('auth')->group(function(){

        // Route::view('/dashboard','pages.ads.dashboard')->name('dashboardView');
        // Route::get('/ad-list',[AdController::class,'adList']);
        Route::post('/create_ad',[AdController::class,'createAdvertisement']);
        Route::get('/ad_preview/{id}',[AdController::class,'adPreview']);
        Route::get('/check_title/{adTitle}',[AdController::class,'checkTitle']);
        Route::get('/ad_list',[AdController::class,'adList']);
        Route::get('/ads',[AdController::class,'viewAds']);
        Route::get('/dashboard', function () {
            $ads = Ad::all();
            return view('pages.ads.ad_table',['ads' => $ads]);
        });
        Route::get('/logout',[AuthController::class,'logout'])->name('logout');

    });







