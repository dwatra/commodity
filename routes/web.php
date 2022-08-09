<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComGroupController;
use App\Http\Controllers\Api\V1\SyncComGroupController;
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


// Route::prefix('commodity')->group(function() {
Route::middleware(['verify.token', 'connect', 'auth'])->prefix('commodity')->group(function() {
    Route::get('group', [ComGroupController::class, 'index']);
    Route::get('json/get-level-group', [ComGroupController::class, 'getLevel']);
	Route::get('sync-com-group', [SyncComGroupController::class, 'sync']);
});