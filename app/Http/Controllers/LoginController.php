<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Login;
use App\Http\Requests\LoginRequest;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/login.page');
    }

    public function store(LoginRequest $request)
    {
        $credentials = $request->only('telegram_id', 'pin_code');

        if (auth()->attempt($credentials)) {
            return redirect()->intended('/')->with('success', 'Вы успешно вошли в систему.');
        }

        return back()->withErrors([
            'pin_code' => 'Неверные учетные данные.',
        ]);
    }
}
