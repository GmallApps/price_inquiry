<?php

namespace App\Http\Controllers;

use App\Traits\ResponseAPI;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ResponseAPI;
    /**
     * Authenticate user credential
     *
     * @return object
     */
    public function login(Request $request)
    {
        return (Auth::attempt($request->only('email','password')) ? $this->success('Success') : $this->error('Invalid Username/Password',404));
    }

    /**
     * Logout User
     *
     * @return void
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
