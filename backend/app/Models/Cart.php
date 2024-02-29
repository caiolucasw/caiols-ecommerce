<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id'];

    public function cart_items(): HasMany {
        return $this->hasMany(CartItem::class, 'cart_id');
    }

    public function getTotal() {

        $cartItems = $this->cart_items;

        if (!isset($cartItems)) return;


        $total = 0;

        foreach ($cartItems as $item) {
            $total += $item->getSubTotal();
        }

        return $total;
    }
    


}
