<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\storeUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function create(storeUserRequest $request)
    {

        $request->validated();
        $user = User::query()->create($request->all());
        $token = $user->createToken('access_token')->plainTextToken;
        Auth::login($user, true);
        return response(['token' => $token, 'user' => $user], 201);
    }
    // public function login()
    public function logout(Request $request)
    {
        // Auth::logout();
        // $request->session()->invalidate();
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
    public function login(Request $request)
    {
        $credentials = $request->validate(
            [
                'username' => 'required|exists:users,username',
                'password' => 'required'
            ],
            [
                'username.exists' => 'User does not exist',
            ]
        );
        if (Auth::attempt($credentials, true)) {
            // $request->session()->regenerate();
            $user = User::where('username', $request['username'])->first();
            $token = $user->createToken('access_token')->plainTextToken;
            return response(['user' => $user, 'token' => $token], 200);
        }
        return response()->json(['error' => true, 'errors' => ['Invalid login credentials']], 417, ['content-type' => 'application/json']);
    }
}
