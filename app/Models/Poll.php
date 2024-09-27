<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Poll extends Model
{
    use HasFactory;
    protected $guarded = [];

    // get the Dates&Times
    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    // get the user, author of poll
    public function user() {
        return $this->belongsTo(User::class, 'created_by');
    }




    public function options() {
        return $this->hasMany(Option::class);
    }

    public function getStartDateAttribute() {
        return $this->start_at->format('M d, Y');
    }
    public function getStartTimeAttribute() {
        // return Carbon::parse($this->start_at)->toTimeString();
        return $this->start_at->format('h:i A');
    }
    public function getEndDateAttribute() {
        return $this->end_at->format('M d, Y');
    }
    public function getEndTimeAttribute() {
        // return Carbon::parse($this->end_at)->toTimeString();
        return $this->end_at->format('h:i A');;
    }

    // return nr of days for show.blade.php
    public function getEndDateFormatAttribute() {
        return $this->end_at->diffForHumans();
    }

    // returns all votes
    public function votes(){
        return $this->hasMany(Vote::class);
    }
}
