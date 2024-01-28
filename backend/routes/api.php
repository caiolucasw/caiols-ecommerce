<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products', [ProductController::class, 'get']);
Route::get('products/filters', [ProductController::class, 'getFilters']);
Route::get('products/{id}', [ProductController::class, 'findById']);

Route::get('categories/products_count', [CategoryController::class, 'getCategoriesProductsCount']);
Route::get('brands/products_count', [BrandController::class, 'getBrandsProductsCount']);
