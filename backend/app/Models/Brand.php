<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image_url'];

    
    public static function getBrandsProductsCount($categoryName = '') {
        $qb = Brand::query()->join('products', 'brands.id', '=', 'products.brand_id');

        if (!empty($categoryName)) {
            $qb = $qb->join('categories', 'products.category_id', '=', 'categories.id');
            $qb = $qb->where('categories.value', '=', $categoryName);
        }

        $categoriesCount = $qb->groupBy('brands.id', 'brands.name')
            ->orderByDesc('products_count')
            ->selectRaw('brands.id, brands.name, COUNT(products.id) as products_count')
            ->get();
        

        return $categoriesCount;
    }
}
