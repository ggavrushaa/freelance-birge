<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');

Route::get('/confirm-register', function () {
    return Inertia::render('auth/confirm-register.page');
})->name('home');

Route::get('/create-password', function () {
    return Inertia::render('auth/create-password.page');
})->name('home');

// confirm-register



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
