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
}
