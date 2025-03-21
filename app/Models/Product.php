<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'product_name',
        'kcal',
        'fat',
        'saturated_fat',
        'carbs',
        'protein',
    ];

    public function user()
    {
        return $this->belongsTo( User::class );
    }
}
