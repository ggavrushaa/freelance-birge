<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\RoleController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerJobController;
use App\Http\Controllers\FreelanceGigController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TariffController;


Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');

Route::get('/jobs', function () {
    return Inertia::render('jobs.page');
})->name('jobs');

Route::get('customer/dashboard', [DashboardController::class, 'customerDashboard'])->name('customer.dashboard');
Route::get('freelance/dashboard', [DashboardController::class, 'freelancerDashboard'])->name('freelancer.dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/user/role', [RoleController::class, 'getUserRole'])->name('user.role');
    Route::post('/user/switch-role', [RoleController::class, 'switchRole'])->name('user.switch.role');
    Route::post('/user/assign-role', [RoleController::class, 'assignRole'])->name('user.assign.role');
});

Route::resource('customer-job', CustomerJobController::class)->except('update');
Route::post('customer-job/{id}/update', [CustomerJobController::class, 'update'])->name('customer-job.update');
Route::post('customer-job/{id}/published', [CustomerJobController::class, 'published'])->name('customer-job.published');

Route::resource('freelance-gig', FreelanceGigController::class);

Route::resource('tariff', TariffController::class);

Route::resource('profile', ProfileController::class);

Route::resource('portfolio', PortfolioController::class);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
