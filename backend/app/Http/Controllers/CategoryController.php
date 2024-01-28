<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function getCategoriesProductsCount() {
        $categoriesCount = Category::getCategoriesProductsCount();

        return response()->json(['data' => $categoriesCount], 200);
    }
}
