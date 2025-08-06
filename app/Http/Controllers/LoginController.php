<?php

namespace App\Http\Controllers;
use App\Services\Auth\LoginService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Login;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\VerifySeedPhraseRequest;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __construct(protected LoginService $loginService)
    {
    }

    public function create()
    {
        return Inertia::render('auth/login/index.page');
    }

    public function store(LoginRequest $request)
    {
        $this->loginService->login($request->validated());
        return redirect()->route('home');
    }

    public function destroy()
    {
        $this->loginService->logout();
        return redirect()->route('login');
    }

    public function verification()
    {
        $telegramId = request()->input('telegram_id');
        if ($telegramId) {
            session(['telegram_id_for_recovery' => $telegramId]);
        }

        return Inertia::render('auth/login/verification.page');
    }

    public function verificationStore(VerifySeedPhraseRequest $request)
    {
        $telegramId = $request->input('telegram_id');
        $user = User::where('telegram_id', $telegramId)->firstOrFail();

        if (!$this->loginService->validateCompleteSeedPhrase($user, $request->input('words'), $request->input('indices'))) {
            throw ValidationException::withMessages([
                'error' => 'Сид-фраза не совпадает с вашей.',
            ]);
        }

        session(['user_for_pin_recovery' => $user->id]);

        return redirect()->route('password.create');
    }

    public function success()
    {
        return Inertia::render('auth/login/success.page');
    }
}
