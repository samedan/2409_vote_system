<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GraphController extends Controller
{
    // GET Graphs /
    public function index() {
        // $polls = auth()->user()->polls()->select('title', 'status', 'id')->paginate(10);
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        // return  Inertia:: view('graphs.list');
        return Inertia::render('Graphs/Graphs');
    }
    // GET Charts from Bitcoin app /
    public function chart() {
        // $polls = auth()->user()->polls()->select('title', 'status', 'id')->paginate(10);
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        // return  Inertia:: view('graphs.list');
        return Inertia::render('Graphs/HistoryChart');
    }
}
