<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\Auth\UserRegistrationService;
use App\Http\Requests\Auth\RegisterUserRequest;

class AuthController extends Controller
{
    public function __construct(protected UserRegistrationService $registrationService)
    {
    }

    public function register(RegisterUserRequest $request)
    {
        $user = $this->registrationService->register($request->validated());

        return Inertia::render('confirm-seed.page', [
            'seed' => $user->seed_phrase,
        ]);
    }
}
