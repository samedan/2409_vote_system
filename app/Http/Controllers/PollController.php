<?php

namespace App\Http\Controllers;

use App\Enums\PollStatus;
use App\Http\Requests\CreatePollRequest;
use App\Http\Requests\UpdatePollRequest;
use App\Models\Poll;
use Illuminate\Http\Request;

class PollController extends Controller
{
    
    // POST Poll
    public function store(CreatePollRequest $request) {
        $poll = auth()->user()->polls()->create($request->safe()->except('options'));

        // dd($request->options);
        // array:2 [▼ // app\Http\Controllers\PollController.php:14
        //     0 => array:1 [▼
        //         "content" => "red"             ]
        //     1 => array:1 [▶]
        //     ]
        $poll->options()->createMany(
            $request->options           
        );
        return back();
        // dd($request -> validated());
    }


    // GET all Polls
    public function index() {
        $polls = auth()->user()->polls()->select('title', 'status', 'id')->paginate(10);
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        return  view('polls.list', compact('polls'));
    }

    // GET Post edit form filled
    public function edit(Poll $poll) {
        $poll = $poll->load('options'); 
        // dd($poll);
        return view("polls.update", compact('poll'));
    }

    // UPDATE PUT Poll
    public function update(UpdatePollRequest $request, Poll $poll) {
        $data = $request->safe()->except('options');
        $poll->update($data);
        $poll->options()->delete();
        // return options as array of array
        $poll->options()->createMany($request->options);
        return to_route('poll.index'); // = response()->route('poll.index)
    }

    // DELETE Poll
    public function delete(Poll $poll) {
        if($poll->status === PollStatus::PENDING->value) {
            abort(404, 'No pending poll');
        } 
        $poll->options()->delete();
        $poll->delete();
        return back();
    }




}
