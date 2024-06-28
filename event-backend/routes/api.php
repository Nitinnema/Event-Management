<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;

Route::get('/events', [EventsController::class, 'index']);
Route::post('/events', [EventsController::class, 'store']);
Route::get('/my-events/{event}', [EventsController::class, 'myevents']);
Route::get('/events/{event}', [EventsController::class, 'show']);
Route::put('/events/{event}', [EventsController::class, 'update']);
Route::delete('/events/{event}', [EventsController::class, 'destroy']);
Route::post('/events/{event}/attend', [EventsController::class, 'attend']);
Route::delete('/events/{event}/attend', [EventsController::class, 'unattend']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

