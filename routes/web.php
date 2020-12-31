<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\AppController;

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


Route::view('/', 'welcome');
Route::view('/master', 'welcome');

Route::view('/home', 'home')->middleware('role:user');
Route::view('/dashboard', 'home');
Route::get('/test', [AppController::class, 'test_user'])->middleware('role:user');




Route::view('/login', 'auth.SocialLogin');
Route::view('/sociallogin', 'auth.SocialLogin');
Route::get('/logout', [AuthController::class, 'logout']);

Route::get('auth/{provider}', [AuthController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);


// Route::group(['prefix' => 'admin',  'middleware' => 'admin'], function () {
//     //All the routes that belongs to the group goes here
//     Route::view('/', 'admin.dashboard');
// });

Route::group(['prefix' => 'admin',  'middleware' => 'role:admin'], function () {
    //All the routes that belongs to the group goes here
    Route::view('/', 'admin.dashboard');
});
