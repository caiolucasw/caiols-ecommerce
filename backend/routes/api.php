<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailsController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Address;
use App\Models\Product;
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

Route::get('/products', [ProductController::class, 'get']);
Route::get('/products/filters', [ProductController::class, 'getFilters']);
Route::get('/products/{id}', [ProductController::class, 'findById']);

Route::get('/categories/products_count', [CategoryController::class, 'getCategoriesProductsCount']);
Route::get('/brands/products_count', [BrandController::class, 'getBrandsProductsCount']);

// logged in users
Route::middleware('auth:api')->group(function() {
    Route::delete('/logout', [UserAuthController::class, 'logout']);
    Route::get('/user', [UserAuthController::class, 'getUserBasicInfo']);
    Route::get('/user-details', [UserController::class, 'getUserDetails']);
    
    // Address related routes
    Route::get('/address', [AddressController::class, 'getUserAddress']);
    Route::post('/address', [AddressController::class, 'createUserAddress']);
    Route::put('/address/{id}', [AddressController::class, 'updateUserAddress']);
    Route::delete('/address/{id}', [AddressController::class, 'deleteUserAddress']);
    Route::post('/address/{id}/change-default', [AddressController::class, 'changeDefaultAddress']);
    
    // cart related routes

    Route::get('/cart', [CartController::class, 'get']); // put this into auth:api routes afterwards
    Route::post('/cart/products', [CartController::class, 'insertItem']);
    Route::post('/payment-intent/{cart_id}', [PaymentController::class, 'paymentIntent']);
    Route::post('/cart/buy/{id}', [CartController::class, 'buy']);


    // orders

    Route::get('/orders', [OrderController::class, 'get']);
    Route::get('/orders/{id}/details', [OrderItemController::class, 'getOrderItemsByOrderId']);

    // add products info

    Route::post("/products", [ProductController::class, "insert"]);

    Route::get('/products/add/info', [ProductController::class, 'productAddInfo']);

    // brands

    Route::get("/brands", [BrandController::class, "get"]);
    Route::post("/brands", [BrandController::class, "insert"]);


    // brands
    Route::get("/brands", [BrandController::class, "get"]);

    // categories

    Route::get("/categories", [CategoryController::class, "get"]);


});

// Only admin
Route::middleware(['auth:api', AdminMiddleware::class])->group(function () {
     // add products info

     Route::post("/products", [ProductController::class, "insert"]);

     Route::get('/products/add/info', [ProductController::class, 'productAddInfo']);
 
     // brands
 
     Route::post("/brands", [BrandController::class, "insert"]);
 
 
     // categories
     Route::post("/categories", [CategoryController::class, "insert"]);
});
