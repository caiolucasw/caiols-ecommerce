<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
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
            'password' => 'required|min:6',
            'repeat_password' => 'required|same:password',
            'cpf' => 'required|max:11|min:11|unique:users'
        ]);


        $data['password'] = bcrypt($request->password);

        $user = User::create($data);

        $token = $user->createToken('API Token')->accessToken;
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $user = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'type' => $user->type,
            'token' => $token
        ];

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($data)) {
            return response(['error_message' => 'Incorrect Details. 
            Please try again'], 404);
        }

        $user = auth()->user();

        if ($user instanceof User) {
            $token = $user->createToken('API Token')->accessToken;
            $user = auth()->user();
            $user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'type' => $user->type,
                'token' => $token
            ];
            $cart = Cart::firstOrCreate(['user_id' => $user['id']]);

            if ($cart) {
                $cartItemsCount = CartItem::where('cart_id', '=', $cart->id)->sum('quantity');
                $cartItemsCount = $cartItemsCount ? $cartItemsCount : 0;
                $user['cart_items_count'] = $cartItemsCount;
            }


            return response()->json($user);
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

    public function getUserBasicInfo() {
        if (auth()->user() instanceof User) {
            $user = auth()->user();
            $user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'type' => $user->type,
            ];

            $cart = Cart::firstOrCreate(['user_id' => $user['id']]);

            if ($cart) {
                $cartItemsCount = CartItem::where('cart_id', '=', $cart->id)->sum('quantity');
                $cartItemsCount = $cartItemsCount ? $cartItemsCount : 0;
                $user['cart_items_count'] = $cartItemsCount;
            }

            return response()->json($user, 200);
            
        }

        return response()->json(['message' => 'user not found', 404]);

    }
}
