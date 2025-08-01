<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePasswordRequest;
use App\Services\Auth\UserRegistrationService;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Http\Requests\ConfirmSeedPhraseRequest;

class AuthController extends Controller
{
    public function __construct(protected UserRegistrationService $registrationService)
    {
    }

    public function create()
    {
        return Inertia::render('auth/register/index.page');
    }

    public function register(RegisterUserRequest $request)
    {
        $user = $this->registrationService->register($request->validated());
        Auth::login($user);

        return Inertia::render('auth/register/index.page', [
            'seed' => $user->seed_phrase,
        ]);
    }

    public function login(Request $request)
    {
        $telegramId = $request->input('telegram_id');
        $user = User::where('telegram_id', $telegramId)->firstOrFail();
        if ($request->has('pin_code')) {
            if (!$this->registrationService->verifyPinCode($user, $request->input('pin_code'))) {
                throw ValidationException::withMessages([
                    'pin_code' => 'Неверный ПИН-код или аккаунт заблокирован',
                ]);
            }
            Auth::login($user);
            return redirect()->route('dashboard');
        }
    }

    public function confirm()
    {
        $index = $this->registrationService->generateIndexes();
        return Inertia::render('auth/register/confirm.page', [
            'index' => $index,
        ]);

    }

    public function confirmRegister(ConfirmSeedPhraseRequest $request)
    {
        if (
            !$this->registrationService->validateSeedPhrase(
                auth()->user(),
                words: $request->input('words')
            )
        ) {
            throw ValidationException::withMessages([
                'error' => 'Сид-фраза не совпадает с вашей.',
            ]);
        }

        return redirect()->route('register.success');
    }

    public function createPassword()
    {
        return Inertia::render('auth/password/create.page');
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
        return Inertia::render('auth/password/confirm.page');
    }

    public function confirmPassword(StorePasswordRequest $request)
    {
        if (
            !$this->registrationService->verifyPinCode(
                auth()->user(),
                $request->input('pin_code')
            )
        ) {
            return redirect()->route('confirm.password.show')
                ->withErrors(['pin_code' => 'Неверный ПИН-код или аккаунт заблокирован']);
        }

        return redirect()->route('dashboard');
    }


}
