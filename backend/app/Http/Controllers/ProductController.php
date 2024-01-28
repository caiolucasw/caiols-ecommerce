<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
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
        $brands = $request->query('brand');
        $categoryName = $request->query('category_name'); // specific page, ex: /notebooks, /tablets

        if ($name) {
            $qb = $qb->where('name', 'like', '%'.$name.'%');
        }

        // get products from a list of categories id
        if ($categories && count(explode(',', $categories)) > 0) {
            $categoriesArray = explode(',', $categories);
            $qb = $qb->whereIn('category_id', $categoriesArray);
            
        } else if ($categoryName) {
            $qb = $qb->join('categories', 'products.category_id', '=', 'categories.id');
            $qb = $qb->where('categories.value', '=', $categoryName);
            
        }

        // get products from a list of brands id
        if ($brands && count(explode(',', $brands)) > 0) {
            $brandsArray = explode(',', $brands);
            $qb = $qb->whereIn('brand_id', $brandsArray);
            
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

    public function getFilters() {

        $query = Product::query();
        $categoryName = request()->query('category_name');

        try {
            $filters = [];
            $filters['categories'] = Category::getCategoriesProductsCount();
            $filters['brands'] = Brand::getBrandsProductsCount();
            $query = $query->join('categories', 'products.category_id', '=', 'categories.id')->selectRaw('MAX(products.price) AS maxPrice, MIN(products.price) as minPrice');
            if ($categoryName) {
                $query = $query->where('categories.value', '=', $categoryName);

            }

            $filters['price'] = $query->get()->first();
        } catch (ModelNotFoundException $e) {
            return response()->json([ 'data' => 'resource not found'], 404);

        }

       return $filters;
    }
}
