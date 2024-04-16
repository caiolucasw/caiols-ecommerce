<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImages extends Model
{
    use HasFactory;

    public static function storeMultipleAWS($images) {
        $productImages = isset($productImages) && is_array($productImages) ? $productImages : [];
        $productImages = array_map(function($image) {
            $path = $image->store('images', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
            $productImage = new ProductImages();
            $productImage->image_name = basename($path);
            $productImage->image_url = Storage::disk('s3')->url($path);
            return $productImage;
          }, $images);
        
        return  $productImages;
    }
}
