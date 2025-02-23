<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'company';

    protected $fillable = [
        'legal_name',
        'commercial_reason',
        'ruc',
        'address',
        'phone',
        'email',
        'date_of_constitution',
        'status'
    ];

    protected $casts = [
        'date_of_constitution' => 'date',
        'status' => 'boolean',
    ];
}
