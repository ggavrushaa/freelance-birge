<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerJobController;
use App\Http\Controllers\FreelanceGigController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TariffController;
use App\Http\Controllers\NotificationController;


Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');

Route::get('/jobs', function () {
    return Inertia::render('jobs.page');
})->name('jobs');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

// Notification routes
Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/unread', [NotificationController::class, 'unread'])->name('notifications.unread');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});

// Role routes
Route::middleware('auth')->group(function () {
    Route::get('/user/role', [RoleController::class, 'getUserRole'])->name('user.role');
    Route::post('/user/{id}/switch-role', [RoleController::class, 'switchRole'])->name('user.switch.role');
    Route::post('/user/assign-role', [RoleController::class, 'assignRole'])->name('user.assign.role');
});

// Customer job routes
Route::resource('customer-job', CustomerJobController::class)->except('update');
Route::post('customer-job/{id}/update', [CustomerJobController::class, 'update'])->name('customer-job.update');
Route::post('customer-job/{id}/published', [CustomerJobController::class, 'published'])->name('customer-job.published');

// Freelance gig routes
Route::resource('freelance-gig', FreelanceGigController::class);

// Tariff routes
Route::resource('tariff', TariffController::class);

// Profile routes
Route::resource('profile', ProfileController::class);

// Portfolio routes
Route::resource('portfolio', PortfolioController::class);

// Search routes
Route::middleware('auth')->group(function () {
    Route::get('/search/similar-jobs', [SearchController::class, 'getSimilarJobSuggestions'])->name('search.similar-jobs');
    Route::get('/search/similar-gigs', [SearchController::class, 'getSimilarGigSuggestions'])->name('search.similar-gigs');
    Route::post('/search/jobs', [SearchController::class, 'searchJobs'])->name('search.jobs');
    Route::post('/search/gigs', [SearchController::class, 'searchGigs'])->name('search.gigs');
    Route::get('/search', [SearchController::class, 'index'])->name('search.index');
    Route::get('/search/{categoryId}', [SearchController::class, 'show'])->name('search.show');
    Route::post('/search/suggestions', [SearchController::class, 'search'])->name('search.suggestions');
    
    Route::get('/search/filter-options', [SearchController::class, 'getFilterOptions'])->name('search.filter-options');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
