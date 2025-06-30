<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerJobController;


Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard.page');
    })->name('dashboard');
});

Route::resource('customer-job', CustomerJobController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
