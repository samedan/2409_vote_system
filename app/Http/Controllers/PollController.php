<?php

namespace App\Http\Controllers;

use App\Enums\PollStatus;
use App\Http\Requests\CreatePollRequest;
use App\Http\Requests\UpdatePollRequest;
use App\Http\Requests\VoteRequest;
use App\Models\Option;
use App\Models\Poll;
use App\Models\Vote;
use App\Models\Voter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PollController extends Controller
{
    
    // POST Poll
    public function store(CreatePollRequest $request) {
        $poll = auth()->user()->polls()->create($request->safe()->except('options'));

        dd($request->options);
        // array:2 [▼ // app\Http\Controllers\PollController.php:14
        //     0 => array:1 [▼
        //         "content" => "red"             ]
        //     1 => array:1 [▶]
        //     ]
        // dd($poll);
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

    // Incognito GET all Polls
    public function indexIncognito() {
        // $polls = auth()->user()->polls()->select('title', 'status', 'id')->paginate(10);
        $polls = Poll::where( 'status','STARTED')->with('options')->get();
        // $polls = Poll::with('options')->where( 'status','STARTED')->select('title', 'status', 'id', 'options')->get();
        // $polls = Poll::with('options')->get();
        // if($poll->status === PollStatus::PENDING->value)
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        // return  view('polls.list-all-polls', compact('polls'));
        return Inertia::render('ListAllPolls', ['polls'=> $polls]);
    }

    // Incognito GET Single Poll Incognito
    public function IndexPollIncognito($id) {
        
        // $polls = auth()->user()->polls()->select('title', 'status', 'id')->paginate(10);
        $pollToVoteOn = Poll::where( 'id',$id)->with('options')->get();
        // $polls = Poll::with('options')->where( 'status','STARTED')->select('title', 'status', 'id', 'options')->get();
        // $polls = Poll::with('options')->get();
        // if($poll->status === PollStatus::PENDING->value)
        // dd($polls);
        // 'compact' Creates an array containing variables and their values.
        // return  view('polls.list-all-polls', compact('polls'));

        // dd($pollToVoteOn);
        return Inertia::render('PollToVoteOn', ['poll'=> $pollToVoteOn]);
    }

    // GET Post edit form filled
    public function edit(Poll $poll) {
        
        // dd($poll);
        // abort_if(auth()->user()->isNot($poll->user), 403);
        // abort_if($poll->status != PollStatus::STARTED->value, 404);
        // abort_if($poll->status == PollStatus::PENDING->value, 404);
        $poll = $poll->load('options'); 

        
        return view("polls.update", compact('poll'));
    }

    // UPDATE PUT Poll
    public function update(UpdatePollRequest $request, Poll $poll) {
        
        $data = $request->safe()->except('options');
        dd($data);
        $poll->update($data);
        $poll->options()->delete();
        // return options as array of array
        $poll->options()->createMany($request->options);
        dd($poll);
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


    // Show Poll Votes (Options)
    public function show(Poll $poll)
     {
        $poll = $poll->load('options');
        $selectedOption = $poll->votes()->where('user_id', auth()->id())->first()?->option_id;
        // dd($selectedOption);
        if($poll->user->is(auth()->user())) {            
                return view('polls.show', compact('poll', 'selectedOption'));
        }      
        abort_if($poll->status != PollStatus::STARTED->value, 404);
       
        return view('polls.show', compact('poll', 'selectedOption'));
        
        
      }

      public function vote(VoteRequest $request, Poll $poll) {
        abort_if($poll->status != PollStatus::STARTED->value, 404);
        $selectedOption = $poll->votes()->where('user_id', auth()->id())->first()?->option;
        $poll->votes()->updateOrCreate(
            ['user_id'=>auth()->id()],
            ['option_id'=>$request->option_id]
        );
        Option::find($request->option_id)->increment('votes_count');

        if($selectedOption) {
            $selectedOption->decrement('votes_count');
        }

        return back();
        
      }

      // Anybody votes
    //   public function voteIncognito(Option $option, Poll $poll ) {
      public function voteIncognito(Option $option,Request $request ) {
        // abort_if($poll->status != PollStatus::STARTED->value, 404);
        // $selectedOption = $poll->votes()->where('user_id', auth()->id())->first()?->option;
        
        // dd($request[0]);
        // dd($request[0]['voting_client']);
        // dd($option);
        
        $option_id = $option->id;
        // $poll->votes()->updateOrCreate(
        //     ['user_id'=>str()->random(5)],
        //     ['option_id'=>$request->option_id]
        // );
        
        $voter = new Voter([
            'voting_client'=> $request[0]['voting_client'],
            'voting_date'=> now()->format('Y-m-d H:i:s')
        ]);
        
        $voter->save();
        $vote = new Vote([
            'option_id' => $option->id,
            'ip_address'=> $request[0]['voting_client'],
            'poll_id'=> $option->poll_id,
            'user_id'=> 1,
        ]);
        $vote->save();
        Option::find($option_id)->increment('votes_count');
        // $polls = Poll::where( 'status','STARTED')->with('options')->get();
        // if($selectedOption) {
        //     $selectedOption->decrement('votes_count');
        // }

        return  response()
        ->json(['option' => $option_id, 'votes_count' => Option::find($option_id)->votes_count]);
        
               
      }


}
