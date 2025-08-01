<?php

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::get('register-confirm', [AuthController::class, 'confirm'])
    ->name('register.confirm');

// Route::middleware('guest')->group(function () {
    Route::get('register', [AuthController::class, 'create'])
        ->name('register');

    Route::post('register', [AuthController::class, 'register']);


    // Route::get('register-confirm', [AuthController::class, 'confirm'])
    //     ->name('register.confirm');

    Route::post('register-confirm', [AuthController::class, 'confirmRegister'])
        ->name('register.confirm.store');

    Route::get('register-success', [RegisteredUserController::class, 'success'])
        ->name('register.success');

    Route::get('create-password', [AuthController::class, 'createPassword'])
        ->name('password.create');

    Route::post('create-password', [AuthController::class, 'storePassword'])
        ->name('password.store');

    Route::get('confirm-password', [AuthController::class, 'confirmPasswordShow'])
        ->name('confirm.password.show');

    Route::post('confirm-password', [AuthController::class, 'confirmPassword'])
        ->name('confirm.password.store');

    Route::get('login', [LoginController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthController::class, 'login']);

    Route::get('login-verification', [LoginController::class, 'verification'])
        ->name('login.verification');

    Route::post('login-verification', [LoginController::class, 'verificationStore']);

    Route::get('login-success', [LoginController::class, 'success'])
        ->name('login.success');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
// });

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
    //     ->name('password.confirm');

    // Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
