<?php

namespace App\Http\Controllers;

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

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'telegram_id' => $user->telegram_id,
                'username' => $user->username,  
            ],
            'seed_phrase' => $user->seed_phrase,
        ], 201);
    }
}
