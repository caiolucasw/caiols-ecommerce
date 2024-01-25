<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //

    public function get(Request $request) {
        $qb = Product::query();
        $categories = $request->query('category');
        $name = $request->query('name');
        if ($name) {
            $qb = $qb->where('name', 'like', '%'.$name.'%');
        }

        if ($categories) {
            $categoriesArray = explode(',', $categories);
            if (count($categoriesArray)) {
                $qb = $qb->whereIn('category', $categoriesArray);
            }
        }

        $products = $qb->get();

        return response()->json(['data' => $products->toArray()], 200);       
    }

    public function findById($id) {

        try {
            $product = Product::where('id', $id)->with('category')->with('brand')->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json([ 'data' => 'resource not found'], 404);

        }

       return $product;
    }
}
