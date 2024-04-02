<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image_url'];

    
    public static function getBrandsProductsCount() {
        $categoriesCount = Brand::query()
                ->join('products', 'brands.id', '=', 'products.brand_id')
                ->groupBy('brands.id', 'brands.name')
                ->orderByDesc('products_count')
                ->selectRaw('brands.id, brands.name, COUNT(products.id) as products_count')
                ->get();

        return $categoriesCount;
    }
}
