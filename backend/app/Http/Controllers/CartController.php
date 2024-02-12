<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
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
        if ($cart) {
            if ($quantity <= 0) {
                $cartItem = CartItem::where(['cart_id' => $cart->id, 'product_id' => $productId])->delete();
            } else {
                $cartItem = CartItem::updateOrInsert(['cart_id' => $cart->id, 'product_id' => $productId], [ 'quantity' => $quantity]);
            }
        } else {
            response()->json(['message' => 'error']);
        }
       

        return response()->json(['data' => $cartItem]);

    }
}
