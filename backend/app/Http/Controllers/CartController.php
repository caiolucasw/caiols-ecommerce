<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //

    public function get() {

        return Cart::with('cart_items.product')->firstOrCreate([
            'user_id' => auth()->user()->id
        ]);

    }

    public function insertItem(Request $request) {
        $productId = $request->get('product');
        $quantity = $request->get('quantity');
        
        $user = auth()->user();
        $userId = $user->id;
        $cart = Cart::where('user_id', '=', $userId)->first();
        $cartItem = null;
        $cartItemsCount = 0;

        if ($cart) {
            // if quantity <= 0, delete the cartItem 
            if ($quantity <= 0) {
                $cartItem = CartItem::where(['cart_id' => $cart->id, 'product_id' => $productId])->delete();
            } else {
                $cartItem = CartItem::updateOrInsert(['cart_id' => $cart->id, 'product_id' => $productId], ['quantity' => $quantity]);
            }

            $cartAux = Cart::firstOrCreate(['user_id' => $userId])->withSum('cart_items', 'quantity')->first();

            $cartItemsCount = isset($cartAux, $cartAux->cart_items_sum_quantity) ? $cartAux->cart_items_sum_quantity : 0;

        } else {
            response()->json(['message' => 'error']);
        }
       

        return response()->json(['data' => $cartItem, 'cart_items_count' => $cartItemsCount]);

    }

    public function buy(Request $request, string $cartId) {
        $userId = auth()->user()->id;
        
        $cart = Cart::where('id', '=', $cartId)->where('user_id', '=', $userId)->first();
        // check if cart exists
        if (!isset($cart)) {
            return response()->json(["message" => "Resource not found"], 404);
        }

        $cartItems = $cart->cart_items->toArray();

        // map to add to order_items table
        $orderItems = array_map(function ($item) {
            $orderItem = new OrderItem();
            $orderItem->product_id = $item['product_id'];
            $orderItem->quantity = $item['quantity'];
            return $orderItem;
        }, $cartItems);
            
        // Create Order
        $order = new Order();
        $order->user_id = $userId;
        $order->save();

        // Add order items
        $order->order_items()->saveMany($orderItems);
        $order->refresh();

        // remove CartItems
        CartItem::where('cart_id', '=', $cartId)->delete();

        return response()->json(["message" => "success"], 200);

    }
}
