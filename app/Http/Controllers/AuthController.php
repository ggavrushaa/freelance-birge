<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePasswordRequest;
use App\Services\Auth\UserRegistrationService;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Http\Requests\ConfirmSeedPhraseRequest;
use Illuminate\Console\View\Components\Confirm;

class AuthController extends Controller
{
    public function __construct(protected UserRegistrationService $registrationService)
    {
    }

    public function create()
    {
        return Inertia::render('auth/register.page');
    }

    public function register(RegisterUserRequest $request)
    {
        $user = $this->registrationService->register($request->validated());
        Auth::login($user);

        return Inertia::render('confirm-seed.page', [
            'seed' => $user->seed_phrase,
        ]);
    }

    public function confirm()
    {
         return Inertia::render('auth/confirm-register.page', [
            'index' => $this->registrationService->generateIndexes(),
        ]);
    }

    public function confirmRegister(ConfirmSeedPhraseRequest $request)
    {
        if (!$this->registrationService->validateSeedPhrase(
            auth()->user(),
            words: $request->input('words')
            )) {
            return redirect()->route('register')
                ->withErrors(['seed_phrase' => 'Сид-фраза не совпадает с вашей.']);
        }

        return redirect()->route('register.success');
    }

    public function createPassword()
    {
        return Inertia::render('auth/create-password.page');
    }

    public function storePassword(StorePasswordRequest $request)
    {
           $this->registrationService->createPinCode(
            auth()->user(),
            $request->input('pin_code')
        );
        return redirect()->route('confirm.password.show');
    }

    public function confirmPasswordShow()
    {
        return Inertia::render('auth/confirm-password.page');
    }

    public function confirmPassword(StorePasswordRequest $request)
    {
         if (!$this->registrationService->verifyPinCode(
            auth()->user(),
            $request->input('pin_code')
        )) {
            return redirect()->route('confirm.password.show')
                ->withErrors(['pin_code' => 'Неверный ПИН-код или аккаунт заблокирован']);
        }


        return redirect()->route('dashboard');
    }


}
