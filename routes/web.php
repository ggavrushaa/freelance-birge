<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');

Route::get('order/create', function () {
    return Inertia::render('order/create');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
