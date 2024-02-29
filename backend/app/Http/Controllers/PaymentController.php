<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class PaymentController extends Controller
{
    //

    public function paymentIntent(string $cartId) {

        // Verificar se existe esse cart para o usuário.
        $user = auth()->user();
        $cart = Cart::where('id', '=', $cartId)->where('user_id', '=', $user->id)->first();
        if (!isset($cart)) {
            return response(404);
        }

        $total = $cart->getTotal();

        if ($total <= 0) return response('Empty Cart', 404);

        $stripe = new StripeClient('sk_test_51IXRdQECw79QhUt2VScVHNu27Cyy9xTeN4PIZX6Q93DZ7P2HUUyj79tlC6W3vZs4iuIOFxThQvCiLsvpKMfyLr1q00oHufRGM1');
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => $total,
            'currency' => 'brl',
            'payment_method' => 'pm_card_visa'
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
            'total' => $total,
        ]);
    }
}
