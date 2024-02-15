<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function getUserDetails() {
        if (!auth()->user()) {
            return response()->json(['message' => 'user not found']);
        }
        return response()->json(auth()->user());
    }
}
