<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function getUserDetails() {
        if (!auth()->user()) {
            return response()->json(['message' => 'user not found']);
        }

        $userId = auth()->user()->id;
        $user = User::where('id', $userId)->selectRaw('name, phone, email, cpf, DATE_FORMAT(date_birth, "%d/%m/%Y") as date_birth')->first();
        return response()->json($user);
    }
}
