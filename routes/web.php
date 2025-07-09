<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerJobController;
use App\Http\Controllers\FreelanceGigController;
use App\Http\Controllers\FreelanceServiceController;


Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');


Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::resource('customer-job', CustomerJobController::class)->except('update');
Route::post('customer-job/{id}/update', [CustomerJobController::class, 'update'])->name('customer-job.update');
Route::post('customer-job/{id}/published', [CustomerJobController::class, 'published'])->name('customer-job.published');

Route::resource('freelance-gig', FreelanceGigController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
