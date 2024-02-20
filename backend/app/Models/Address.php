<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'person_name',
        'last_name',
        'zip_code',
        'street',
        'number',
        'district',
        'city',
        'state',
        'user_id',
    ];

    protected $hidden = [
        'user_id',
    ];
    
}
