<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Poll;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $votes = Vote::orderBy("created_at", "desc")->get()->all();
       
       
        // $fromDate = Carbon::now()->subMonth()->startOfMonth()->toDateString();
        // $fromDate = Carbon::now()->subMonth()->startOfMonth();

        // $tillDate = Carbon::now()->subMonth()->endOfMonth()->toDateString();

       
        // Current Month
        $currentMonth = Vote::orderBy("created_at", "desc")->where(
            'created_at', 
            '>=', 
            Carbon::now()->startOfMonth())
            ->where('created_at', '<=', Carbon::now()->endOfMonth())->get();
        
            // Previous month
        $previousMonth = Vote::where('created_at', '>=', Carbon::now()->startOfMonth()->subMonth())
            ->where('created_at', '<=', Carbon::now()->startOfMonth()->subMonth()->endOfMonth())
            ->get();
        // dd($previousMonth);
        // dd($currentMonth);
        // dd($votesMonth);

            // dd($votes);
            $data = [];
            $polls = Poll::all();
            $data['polls'] = $polls;
            $data['votes'] = $votes;
            $options = Option::all();
            
        
        return Inertia::render('Graphs/BeforeGraphs'
        // ,[
            
        //     'polls' => $polls,
        //     'votes' => $votes          
        //     ]
            // , ['data'=>$data]
            
        
        )->with([ 'polls' => $polls,
             'votes' => $votes,
             'options' => $options,
            ]); 
    }

    public function allPolls () {
        $polls = Poll::all();       
        $votes = Vote::orderBy("created_at", "desc")->get()->all();
        return [
            'polls' => $polls,
            'votes' => $votes,            
        ];
    }
}
