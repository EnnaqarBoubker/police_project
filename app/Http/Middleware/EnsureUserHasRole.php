<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Restrict a route group to one or more roles, e.g. role:admin or role:superadmin.
     * This is what keeps Super Admin out of reports/calendar/summary routes, and
     * keeps Admin out of the approval-only /superadmin/* routes.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, $roles, true)) {
            abort(403, 'You are not authorized to access this area.');
        }

        return $next($request);
    }
}
