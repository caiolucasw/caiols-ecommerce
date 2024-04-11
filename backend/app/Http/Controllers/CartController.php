<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    //

    public function get() {

        return Cart::with('cart_items.product')->firstOrCreate([
            'user_id' => auth()->user()->id
        ]);

    }

    public function insertItem(Request $request) {
        $productId = $request->post('product');
        $quantity = $request->post('quantity');
        
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
                $cartItem = CartItem::updateOrCreate(
                    ['cart_id' => $cart->id, 'product_id' => $productId],
                    ['quantity' =>  DB::raw("IFNULL(quantity,0) + {$quantity}")] // update quantity 
                );

            }
            $cartItemsCount = CartItem::where('cart_id', '=', $cart->id)->sum('quantity');

            $cartItemsCount = $cartItemsCount ? $cartItemsCount : 0;

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

    // Insert or update items in cart if the user was not logged in when the he/she added the items
    public function insertMultipleItemsFromCartNotLogged(Request $request) {
        $products = $request->post('products');
        $removeCurrent = $request->post('removeCurrent');
        
        $userId = auth()->user()->id;
        $cart = Cart::firstOrCreate(['user_id' => $userId]);
        $cartItemsCount = 0;

        // remove all items from current cart
        if (isset($removeCurrent) && $removeCurrent == 1) {
            CartItem::where('user_id', '=', $userId)->delete();
        }
        // --------------------------------

        if (!$cart) return response()->json(['message' => 'error']);

        // add or update products
        foreach($products as $product) {
            if ($product['quantity'] > 0) {
                $cartItem = ['cart_id' => $cart->id, 'product_id' => $product['product'], 'quantity' => $product['quantity']];
                CartItem::updateOrCreate(
                    ['cart_id' => $cartItem['cart_id'], 'product_id' => $cartItem['product_id']],
                    ['quantity' =>  DB::raw("IFNULL(quantity,0) + {$cartItem['quantity']}")] // update quantity 

                );
            }
        }

        // get all cart items
        $cart = Cart::with('cart_items.product')->firstOrCreate(['user_id' => $userId]);

        // get cart_items count
        $cartAux = Cart::where('user_id', '=', $userId)->withSum('cart_items', 'quantity')->first();
        $cartItemsCount = isset($cartAux, $cartAux->cart_items_sum_quantity) ? $cartAux->cart_items_sum_quantity : 0;

        return response()->json(['data' => $cart, 'cart_items_count' => $cartItemsCount]);

    }
}
