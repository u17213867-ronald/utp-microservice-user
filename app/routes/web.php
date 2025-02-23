<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CompanyController;

Route::get('/v1/user/heald', function () {
    return response()->json(['message' => 'Esta vivo', 'status' => true]);
});

Route::prefix('v1')->group(function () {
    Route::apiResource('user', HomeController::class);
});

Route::prefix('v1')->group(function () {
    Route::put('company/{id}', [CompanyController::class, 'update']);

});
