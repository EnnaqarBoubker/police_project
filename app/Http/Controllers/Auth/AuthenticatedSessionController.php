<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = Auth::user();

        if (! $user->isApproved() || ! $user->is_active) {
            $message = match (true) {
                $user->isPending() => 'Your account is still pending Super Admin approval.',
                $user->isRejected() => 'Your account request has been rejected.',
                ! $user->is_active => 'Your account has been deactivated. Contact a Super Admin.',
                default => 'Your account is not active.',
            };

            Auth::logout();

            throw ValidationException::withMessages([
                'username' => $message,
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(
            $user->isSuperAdmin() ? route('superadmin.requests.index') : route('calendar.index')
        );
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
