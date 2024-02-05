<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Token;

class UserAuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'cpf' => 'required|max:11|min:11|unique:users'
        ]);


        $data['password'] = bcrypt($request->password);

        $user = User::create($data);

        $token = $user->createToken('API Token')->accessToken;

        return response(['user' => $user, 'token' => $token]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($data)) {
            return response(['error_message' => 'Incorrect Details. 
            Please try again']);
        }

        $user = auth()->user();

        if ($user instanceof User) {
            $token = $user->createToken('API Token')->accessToken;
            return response(['user' => auth()->user(), 'token' => $token]);
        } else {
            return response(['error_message' => 'Incorrect Details. 
            Please try again']);
        }


    }

    public function logout(Request $request) {
        if (auth()->user() instanceof User) {
            $user = auth()->user();
            if ($user->token() instanceof Token) {
                $user->token()->revoke();
                return response()->json(['message' => 'success'], 200);
            }
        }

        return response()->json(['message' => 'error revoking token'], 404);

    }
}
