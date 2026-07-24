<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * List existing admin accounts (approved or rejected) for
     * deactivation/reactivation/deletion. Still approval-space only —
     * no report/calendar/summary data is touched here.
     */
    public function index(): Response
    {
        return Inertia::render('SuperAdmin/Admins/Index', [
            'admins' => User::query()
                ->where('role', 'admin')
                ->whereIn('status', ['approved', 'rejected'])
                ->orderBy('name')
                ->get(['id', 'name', 'username', 'email', 'status', 'is_active', 'created_at']),
        ]);
    }

    public function toggleActive(User $user): RedirectResponse
    {
        abort_if($user->role !== 'admin', 404);

        $user->update(['is_active' => ! $user->is_active]);

        return back()->with('status', $user->is_active ? "{$user->name} reactivated." : "{$user->name} deactivated.");
    }

    public function destroy(User $user): RedirectResponse
    {
        abort_if($user->role !== 'admin', 404);

        $user->delete();

        return back()->with('status', 'Account deleted.');
    }
}
