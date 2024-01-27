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
        $name = $request->query('name');
        $categories = $request->query('category');
        $categoryName = $request->query('category_name');

        if ($name) {
            $qb = $qb->where('name', 'like', '%'.$name.'%');
        }

        if ($categories && count(explode(',', $categories)) > 0) {
            $categoriesArray = explode(',', $categories);
            $qb = $qb->whereIn('category_id', $categoriesArray);
            
        } else if ($categoryName) {
            $qb = $qb->join('categories', 'products.category_id', '=', 'categories.id');
            $qb = $qb->where('categories.value', '=', $categoryName);
            
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
