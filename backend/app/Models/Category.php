<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public static function getCategoriesProductsCount() {
        $categoriesCount = Category::query()
                ->join('products', 'categories.id', '=', 'products.category_id')
                ->groupBy('categories.id', 'categories.label')
                ->orderByDesc('products_count')
                ->selectRaw('categories.id, categories.label, COUNT(products.id) as products_count')
                ->get();

        return $categoriesCount;
    }
}
