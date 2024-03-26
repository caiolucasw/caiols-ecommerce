<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderItemController extends Controller
{
    //

    public function getOrderItemsByOrderId($orderId) {
       
        $user = auth()->user();

        $orderItems =  Order::with('order_items.product')
            ->where('user_id', $user->id)
            ->where('id', $orderId)
            ->first();

        $orderItems = isset($orderItems) ? $orderItems->order_items :  [];
           
        return response()->json($orderItems, 200);
        
    }
}
