<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    //

    public function get(Request $request) {
        $qb = Product::query();
        $name = $request->query('name');
        $categories = $request->query('categories');
        $brands = $request->query('brands');
        $categoryName = $request->query('categoryName'); // specific page, ex: /notebooks, /tablets
        $price = $request->query('price');

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

        if (isset($price)) {
            $prices = explode(',', $price);
            if (is_array($prices) && count($prices) === 2 && ($prices[0] > 0 || $prices[1] > 0)) {
                $qb->whereBetween('price', $prices);
            }
        }

        $products = $qb->selectRaw('products.*')->get();

        return response()->json(['data' => $products->toArray()], 200);       
    }

    public function insert(Request $request) {

      $newProduct = $request->all();
      $images = isset($newProduct['images_url']) ? $newProduct['images_url'] : NULL;

      // it doesn't allow request without the images_url field
      if (is_null($images) || !is_array($images) || count($images) <= 0) return response("Insert images for the product", 400);
      
      # Remove empty urls
      $images_filter = array_filter($images, function($image) {
        return !empty(trim($image));
      });

      if (count($images_filter) <= 0) return response("Insert images for the product", 400);

      // Main Image
      $newProduct['image_url'] = $images_filter[0];
      unset($newProduct['images_url']);

      $newProduct['brand_id'] = $newProduct['brand'];
      $newProduct['category_id'] = $newProduct['category'];

      // map to new array to map new ProductImages
      $images_map = array_map(function($image) {
        $productImage = new ProductImages();
        $productImage->image_name = Str::uuid().time();
        $productImage->image_url = $image;
        return $productImage;
      }, $images_filter);
        

      // create new product
      $newProduct['id'] = Str::uuid();
      $product = new Product();
      $productAdded = $product->create($newProduct);

      // add product images
      $productAdded->product_images()->saveMany($images_map);

      return response()->json($productAdded, 201);
    }

    public function findById($id) {

        try {
            $product = Product::where('id', $id)->with('category')->with('brand')->with('product_images')->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json([ 'data' => 'resource not found'], 404);

        }

        return $product;
    }

    public function getFilters() {

        $query = Product::query();
        $categoryName = request()->query('categoryName');
        $categoryName = isset($categoryName) && strlen(trim($categoryName)) > 0 ? trim($categoryName) : '';

        try {
            $filters = [];
            $filters['categories'] = Category::getCategoriesProductsCount($categoryName);
            $filters['brands'] = Brand::getBrandsProductsCount($categoryName);
            $query = $query->join('categories', 'products.category_id', '=', 'categories.id')->selectRaw('MAX(products.price) AS maxPrice, MIN(products.price) as minPrice');
            if (!empty($categoryName)) {
                $query = $query->where('categories.value', '=', $categoryName);

            }

            $filters['price'] = $query->get()->first();
        } catch (ModelNotFoundException $e) {
            return response()->json([ 'data' => 'resource not found'], 404);

        }

       return $filters;
    }

    public function productAddInfo() {
        $info = [];
        
        $categories = Category::get();
        $info['categories'] = isset($categories) ? $categories->toArray() : [];
        
        $brands = Brand::get();
        $info['brands'] = isset($brands) ? $brands->toArray() : [];

        return response()->json($info, 200);

    }
}
