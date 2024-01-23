<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //

    public function get() {
        return Product::all();
    }

    public function findById(String $id) {
        dd($id);
    }
}
