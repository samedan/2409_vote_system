<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Vote extends Model
{
    protected $guarded = [];
    use HasFactory;

    public function option() {
        return $this->belongsTo(Option::class);
    }

    public function allVotes() {
        $count = Vote::all()->count();
        return $count;
    }

    public function allPolls() {
        $allPolls = Poll::all();
        return $allPolls;
    }
}
