<?php

namespace App\Http\Controllers;

use App\Models\Vote;
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

    // GET AllVotes  /
    public function allVotes () {
        $votes = Vote::orderBy("created_at", "desc")->get();
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        // return  Inertia:: view('graphs.list');
        // $votes_count = Vote::all()->allVotes();
        // dd($votes);
        return Inertia::render('Graphs/Graphs',['votes'=> $votes, 
        // 'all_votes' => $votes_count
    ]);
    }
}
