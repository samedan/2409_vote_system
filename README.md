### Source Youtube :

> https://www.youtube.com/watch?v=-s6LCYAKib8

### Source GitHUb

> https://github.com/ahmetsabri/polling-app

> this Git : https://github.com/samedan/2409_vote_system

### Models: Option, Poll, User

## Enum for Status (Poll table)

> /app/Enums/PollStatus.php
> Poll_Table_Migration -> $table->enum('status', array_column(PollStatus::cases(), 'value'));
