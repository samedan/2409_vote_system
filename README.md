### Source Youtube :

> https://www.youtube.com/watch?v=-s6LCYAKib8
> 2 https://youtu.be/sEvE-JnwJMA?si=832i93F_3X3eSLqo&t=1998

### Source GitHUb

> https://github.com/ahmetsabri/polling-app

> this Git : https://github.com/samedan/2409_vote_system

### Models: Option, Poll, User

## Enum for Status (Poll table)

> /app/Enums/PollStatus.php
> Poll_Table_Migration -> $table->enum('status', array_column(PollStatus::cases(), 'value'));

### Controllers

> PollController use CreatePollRequest > php artisan make:request CreatePollRequest

## CreatePollRequest

> merge date & time with Carbon
> 'start_at' => Carbon::parse($this->start_date . $this->start_time )->toDateTimeString(),
> ![Carbon merge](https://github.com/samedan/2409_vote_system/blob/main/public/images/printscreen1.jpg)

### Update Poll

> Poll model -> separate day from hour again
> getStartDateAttribute, getStartTimeAttribute etc
> format('M d, Y'); display date & time

## UpdatePollRequest -> check to see if user created the poll

### Check to see if Polls are ready to start

> php artisan make:command StartPendingPolls -> /app/Console/Commands/StartPendingPolls.php
> handle() in StartPendingPolls, schedule() in Kernel.php
> Run command: /localURL/.config\herd\bin\php81\php.exe php artisan schedule:run

### Vote

> php artisan make:model Vote -m
> Display votes options : show.blade.php
> Create selectedOption on PollController: $selectedOption and return it to show.blade.php

## New vote request

> php artisan make:request VoteRequest

## Show frontend options of poll

> PollController show() : load selectedOption if already voted in
> PollController vote() : increase/decrease 'votes_count' in 'options' table
