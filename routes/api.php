<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SyncComGroupController;
use Adw\AdwWorker\Worker;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['api'])->prefix('v1')->group(function() {
	Route::get('sync-com-group', [SyncComGroupController::class, 'sync']);
});

Route::get('/worker/commodity', function(Request $request) {
    $worker = new Worker();
    return $worker->commodity($request);
});
