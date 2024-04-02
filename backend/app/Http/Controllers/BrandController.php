<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    //
    public function getBrandsProductsCount() {
        $categoriesCount = Brand::getBrandsProductsCount();

        return response()->json(['data' => $categoriesCount], 200);
    }

    public function get() {
        $brands = Brand::orderBy('name', 'asc')->get();

        return response()->json($brands, 200);
    }

    public function insert(Request $request) {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'image_url' => 'required'
        ]);

        $brand = Brand::create($request->all());

        return response()->json($brand, 201);

    }
}
