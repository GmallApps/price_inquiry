<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\LogoController;
use App\Http\Controllers\AuthController;
use App\Models\Ad;
use App\Models\Color;

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
    Route::get('/bg_color',[ColorController::class,'bgColor']);
    Route::get('/inquiry_ad',[AdController::class,'inquiryAd']);
    Route::get('/inquiry_logo',[LogoController::class,'inquiryLogo']);
    Route::get('/get_ipaddress',[StoreController::class,'getIpAddress']);
});

    Route::get('/api/fetch/tpsStore',[StoreController::class,'fetchStoreData']);
    Route::get('/api/get/item/{barcode}',[StoreController::class,'getStoreInformation']);
    Route::get('/api/store/migration',[StoreController::class,'storeMigration']);
    Route::post('/api/form/data',[StoreController::class,'formData']);

    Route::middleware('auth')->group(function(){

        Route::post('/create_ad',[AdController::class,'createAdvertisement']);
        Route::post('/update_ad',[AdController::class,'updateAdvertisement']);
        Route::get('/ad_preview/{id}',[AdController::class,'adPreview']);
        Route::get('/ad_enable/{id}',[AdController::class,'adEnable']);
        Route::get('/ad_delete/{id}',[AdController::class,'adDelete']);
        Route::get('/check_title/{adTitle}',[AdController::class,'checkTitle']);
        Route::get('/ad_list',[AdController::class,'adList']);
        Route::get('/ads',[AdController::class,'viewAds']);
        Route::get('/dashboard', function () {
            $ads = Ad::all();
            return view('pages.ads.ad_table',['ads' => $ads]);
        });
        Route::get('/color_list',[ColorController::class,'colorList']);
        Route::get('/check_color_codes/{colorCode}',[ColorController::class,'checkColor']);
        Route::post('/add_color',[ColorController::class,'addColor']);
        Route::get('/activate_color/{id}',[ColorController::class,'activateColor']);
        Route::get('/bgcolor_delete/{id}',[ColorController::class,'bgColorDelete']);
        Route::view('/theme_color','pages.theme_color.theme_color')->name('themeColor');

        Route::get('/logo_list',[LogoController::class,'logoList']);
        Route::get('/check_name/{logoName}',[LogoController::class,'checkName']);
        Route::post('/create_logo',[LogoController::class,'createLogo']);
        Route::get('/activate_logo/{id}',[LogoController::class,'activateLogo']);
        Route::get('/logo_delete/{id}',[LogoController::class,'logoDelete']);
        Route::view('/logo_wpi','pages.logo_wpi.logo_wpi')->name('logoWPI');

        Route::get('/logout',[AuthController::class,'logout'])->name('logout');

    });







