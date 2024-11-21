<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voter extends Model
{
    use HasFactory;

    protected $fillable = [
        'voting_client',
        'voting_date',
    ];
    protected $casts = [
        'voting_client',
        'voting_date',
    ];
}
