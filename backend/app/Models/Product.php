<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    use HasUuids;

    public function product_images(): HasMany {
        return $this->hasMany(ProductImages::class, 'product_id');
    }

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function brand(): BelongsTo {
        return $this->belongsTo(Brand::class, 'category_id');
    }
}
