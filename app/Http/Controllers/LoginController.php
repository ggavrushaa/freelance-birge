<?php

namespace App\Http\Controllers;
use App\Services\Auth\LoginService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Login;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\VerifySeedPhraseRequest;

class LoginController extends Controller
{
    public function __construct(protected LoginService $loginService)
    {
    }

    public function create()
    {
        return Inertia::render('auth/login.page');
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
        return Inertia::render('auth/login/verification.page');
    }

    public function verificationStore(VerifySeedPhraseRequest $request)
    {
        $this->loginService->verifySeed($request->validated());
        return redirect()->route('login.success');
    }

    public function success()
    {
        return Inertia::render('auth/login/success.page');
    }
}
