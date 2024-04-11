<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CartItem extends Model
{
    use HasFactory;
    protected $table = 'cart_items';
    protected $fillable = ['cart_id', 'product_id', 'quantity'];

    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function getSubTotal() {
        $product = $this->product;
        return $this->quantity * $product->price;
    }
}
