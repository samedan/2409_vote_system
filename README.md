### Source Youtube :

> https://www.youtube.com/watch?v=-s6LCYAKib8
> 2 https://www.youtube.com/watch?v=sEvE-JnwJMA

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
