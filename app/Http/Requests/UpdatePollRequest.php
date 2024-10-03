<?php

namespace App\Http\Requests;

use App\Enums\PollStatus;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePollRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
        // check to see if user created the poll
        // return auth()->user()->is($this->poll->user) 
        //  &&
        //  $this->poll->status == PollStatus::PENDING->value
        //  ;
    }

    public function prepareForValidation()
    {
        //    dd($this->all());
        $this->merge([            
            'start_at' => Carbon::parse($this->start_date . $this->start_time )->toDateTimeString(),
            'end_at' => Carbon::parse($this->end_date . $this->start_time )->toDateTimeString(),
        ]);

        // dd($this->all());
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string' ],
            'start_at' => ['required', 'date','after_or_equal:now' ],
            'end_at' => ['required', 'date','after:start_at' ],
            'options' => ['required', 'array', 'min:2'],
        ];
    }
}
