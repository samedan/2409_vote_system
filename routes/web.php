<?php

use App\Http\Controllers\PollController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/entry', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Incognito
Route::get('/', [PollController::class, 'indexIncognito'])->name('poll.indexIncognito');
// Route::get('/polls', [PollController::class, 'indexIncognito']);
Route::post('/polls/{option}', [PollController::class, 'voteIncognito']);
Route::get('/polls/{id}', [PollController::class, 'IndexPollIncognito']);
Route::get('/chart',  function () {
    return Inertia::render('Chart');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
// Route::get('/showAllPolls', function () {
//     return Inertia::render('ShowAllPolls');
// })->middleware(['auth', 'verified'])->name('showAllPolls');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// POLLS
Route::prefix('poll')->middleware('auth')->group(function() {
    Route::view('create', 'polls.create')->name('poll.create');
    Route::post('create', [PollController::class, 'store'])->name('poll.store');
    Route::get('/', [PollController::class, 'index'])->name('poll.index');
    Route::get('/update/{poll}', [PollController::class, 'edit'])->name('poll.edit');
    Route::put('/update/{poll}', [PollController::class,'update'])->name('poll.update');
    Route::get('delete/{poll}', [PollController::class, 'delete'])->name('poll.delete');

    Route::get('/{poll}', [PollController::class, 'show'])->name('poll.show');
    Route::post('/{poll}/vote', [PollController::class, 'vote'])->name('poll.vote');
});

require __DIR__.'/auth.php';
