<?php

namespace App\Console\Commands;

use App\Enums\PollStatus;
use App\Models\Poll;
use Illuminate\Console\Command;

class EndPolls extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'poll:end';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ends started poll';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Poll::query()->where([
            ['status', PollStatus::STARTED->value],
            ['end_at', '<=', now()]
        ])->update(['status'=>PollStatus::FINISHED->value]);
    }
}
