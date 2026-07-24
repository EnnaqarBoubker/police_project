<?php

namespace App\Policies;

use App\Models\Entity;
use App\Models\User;

class EntityPolicy
{
    /**
     * Shared-dataset model, same rules as ReportPolicy: any approved admin
     * may view/create/update/delete any entity. created_by is for
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

    public function view(User $user, Entity $entity): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function create(User $user): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function update(User $user, Entity $entity): bool
    {
        return $this->isApprovedAdmin($user);
    }

    public function delete(User $user, Entity $entity): bool
    {
        return $this->isApprovedAdmin($user);
    }
}
