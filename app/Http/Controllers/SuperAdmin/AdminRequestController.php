<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminRequestController extends Controller
{
    /**
     * List pending admin account requests. This — and account
     * approval/rejection — is the Super Admin's only responsibility.
     */
    public function index(): Response
    {
        return Inertia::render('SuperAdmin/Requests/Index', [
            'pendingUsers' => User::query()
                ->where('role', 'admin')
                ->where('status', 'pending')
                ->orderBy('created_at')
                ->get(['id', 'name', 'username', 'email', 'created_at']),
        ]);
    }

    public function approve(User $user): RedirectResponse
    {
        abort_if($user->role !== 'admin', 404);

        $user->update(['status' => 'approved']);

        return back()->with('status', "{$user->name} has been approved.");
    }

    public function reject(User $user): RedirectResponse
    {
        abort_if($user->role !== 'admin', 404);

        $user->update(['status' => 'rejected']);

        return back()->with('status', "{$user->name} has been rejected.");
    }
}
