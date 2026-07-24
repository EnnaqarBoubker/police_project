<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CenterController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\SuperAdmin\AdminController;
use App\Http\Controllers\SuperAdmin\AdminRequestController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    if (! Auth::check()) {
        return redirect()->route('login');
    }

    return redirect()->route('home');
});

Route::get('/registration-pending', function () {
    return Inertia::render('Auth/AwaitingApproval');
})->middleware('guest')->name('registration.pending');

// Role-aware landing route used after login / from the "/" root.
Route::get('/home', function () {
    $user = Auth::user();

    return redirect($user->isSuperAdmin() ? route('superadmin.requests.index') : route('calendar.index'));
})->middleware(['auth', 'approved'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Admin workspace — shared dataset. Super Admin is explicitly blocked here.
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'approved', 'role:admin'])->group(function () {
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
    Route::get('/calendar/{date}', [CalendarController::class, 'show'])
        ->where('date', '\d{4}-\d{2}-\d{2}')
        ->name('calendar.show');

    Route::get('/reports-export', [ReportController::class, 'export'])->name('reports.export');
    Route::resource('reports', ReportController::class);

    Route::get('/summary', [SummaryController::class, 'index'])->name('summary.index');
    Route::get('/summary/daily', [SummaryController::class, 'index'])->name('summary.daily');
    Route::get('/summary/monthly', [SummaryController::class, 'index'])->name('summary.monthly');

    Route::post('/centers', [CenterController::class, 'store'])->name('centers.store');

    Route::resource('entities', EntityController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
});

/*
|--------------------------------------------------------------------------
| Super Admin — approval-only space. No access to reports/calendar/summary.
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'approved', 'role:superadmin'])
    ->prefix('superadmin')
    ->name('superadmin.')
    ->group(function () {
        Route::get('/requests', [AdminRequestController::class, 'index'])->name('requests.index');
        Route::post('/requests/{user}/approve', [AdminRequestController::class, 'approve'])->name('requests.approve');
        Route::post('/requests/{user}/reject', [AdminRequestController::class, 'reject'])->name('requests.reject');

        Route::get('/admins', [AdminController::class, 'index'])->name('admins.index');
        Route::patch('/admins/{user}/toggle-active', [AdminController::class, 'toggleActive'])->name('admins.toggle-active');
        Route::delete('/admins/{user}', [AdminController::class, 'destroy'])->name('admins.destroy');
    });

require __DIR__.'/auth.php';
