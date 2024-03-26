<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //

    public function get() {
        $user = auth()->user();

        if (!isset($user)) return response(404);

        $orders = Order::where('user_id', '=', $user->id)->get();

        return response()->json($orders, 200);

    }

}
