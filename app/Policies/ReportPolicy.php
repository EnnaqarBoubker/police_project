<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ReportPolicy
{
    /**
     * Shared-dataset model: any approved admin may view/create/update/delete
     * any report, regardless of who created it. created_by is for
     * traceability only, never for scoping visibility or write access.
     */
    private function isApprovedAdmin(User $user): bool
    {
        return $user->isAdmin() && $user->canAccessSystem();
    }

    public function viewAny(User $user): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function view(User $user, Report $report): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function create(User $user): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function update(User $user, Report $report): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function delete(User $user, Report $report): bool
    {
        return $this->isApprovedAdmin($user);
    }
}
