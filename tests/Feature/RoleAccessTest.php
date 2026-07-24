<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_superadmin_is_blocked_from_admin_routes(): void
    {
        $superadmin = User::factory()->superadmin()->create();

        $this->actingAs($superadmin)->get('/calendar')->assertForbidden();
        $this->actingAs($superadmin)->get('/reports')->assertForbidden();
        $this->actingAs($superadmin)->get('/summary')->assertForbidden();
    }

    public function test_admin_is_blocked_from_superadmin_routes(): void
    {
        $admin = User::factory()->create();

        $this->actingAs($admin)->get('/superadmin/requests')->assertForbidden();
        $this->actingAs($admin)->get('/superadmin/admins')->assertForbidden();
    }

    public function test_superadmin_can_approve_a_pending_admin(): void
    {
        $superadmin = User::factory()->superadmin()->create();
        $pending = User::factory()->pending()->create();

        $this->actingAs($superadmin)
            ->post("/superadmin/requests/{$pending->id}/approve")
            ->assertRedirect();

        $this->assertSame('approved', $pending->fresh()->status);
    }

    public function test_superadmin_can_reject_a_pending_admin(): void
    {
        $superadmin = User::factory()->superadmin()->create();
        $pending = User::factory()->pending()->create();

        $this->actingAs($superadmin)
            ->post("/superadmin/requests/{$pending->id}/reject")
            ->assertRedirect();

        $this->assertSame('rejected', $pending->fresh()->status);
    }

    public function test_deactivated_admin_is_immediately_logged_out(): void
    {
        $admin = User::factory()->create();

        $this->actingAs($admin)->get('/calendar')->assertOk();

        $admin->update(['is_active' => false]);

        $this->actingAs($admin)->get('/calendar')->assertRedirect(route('login'));
    }
}
