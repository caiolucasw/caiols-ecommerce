<?php

use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
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

Route::post('/register', [UserAuthController::class, 'register']);
Route::post('/login', [UserAuthController::class, 'login']);

Route::get('products', [ProductController::class, 'get']);
Route::get('products/filters', [ProductController::class, 'getFilters']);
Route::get('products/{id}', [ProductController::class, 'findById']);

Route::get('categories/products_count', [CategoryController::class, 'getCategoriesProductsCount']);
Route::get('brands/products_count', [BrandController::class, 'getBrandsProductsCount']);


Route::middleware('auth:api')->group(function() {
    Route::delete('/logout', [UserAuthController::class, 'logout']);
    Route::get('/user', [UserAuthController::class, 'getUserBasicInfo']);
    Route::get('/user-details', [UserController::class, 'getUserDetails']);
    Route::get('/cart', [CartController::class, 'get']); // put this into auth:api routes afterwards
    Route::post('/cart/products', [CartController::class, 'insertItem']);
    Route::post('/payment-intent', [PaymentController::class, 'paymentIntent']);
});
