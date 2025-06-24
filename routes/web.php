<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Pest\ArchPresets\Custom;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route::resource('customer-job', CustomerJobController::class)->name('customer.job');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
