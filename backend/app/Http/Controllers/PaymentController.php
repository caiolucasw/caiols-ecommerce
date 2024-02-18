<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\StripeClient;

class PaymentController extends Controller
{
    //

    public function paymentIntent() {
        $stripe = new StripeClient('sk_test_51IXRdQECw79QhUt2VScVHNu27Cyy9xTeN4PIZX6Q93DZ7P2HUUyj79tlC6W3vZs4iuIOFxThQvCiLsvpKMfyLr1q00oHufRGM1');
        $paymentIntent = $stripe->paymentIntents->create([
            'amount' => 500,
            'currency' => 'brl',
            'payment_method' => 'pm_card_visa'
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
    }
}
