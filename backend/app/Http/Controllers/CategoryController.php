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

    public function get() {
        $categories = Category::orderBy('label', 'asc')->get();
        return response()->json($categories, 200);
    }

    public function insert(Request $request) {
        $validated = $request->validate([
            'label' => 'required|max:255',
            'value' => 'required'
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);

    }
}
