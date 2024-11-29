@extends('layouts.home')

@section('content')
    <div class="container">
        <h1 class="center">
            Graphs
        </h1>
        <div class="row">
            <a class="waves-effect waves-light btn info darken-2" 
            href="{{route('poll.create')}}"
            >
            new poll &plus;
            </a>
        </div>
  <table class="centered">
        <thead>
          <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
          </tr>
        </thead>

        <tbody>
            
            <tr>
                <td>
                Graphs   
                </td>
              </tr>

            

        </tbody>
      </table>
    </div>

@endsection
