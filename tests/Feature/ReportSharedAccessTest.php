<?php

namespace Tests\Feature;

use App\Models\Center;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportSharedAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_any_approved_admin_can_edit_or_delete_a_report_created_by_another_admin(): void
    {
        $author = User::factory()->create();
        $otherAdmin = User::factory()->create();
        $center = Center::factory()->create();

        $report = Report::factory()->create([
            'created_by' => $author->id,
            'center_id' => $center->id,
        ]);

        // otherAdmin did not create this report, but the dataset is fully shared.
        $this->actingAs($otherAdmin)
            ->put("/reports/{$report->id}", [
                'full_name' => 'Updated By Other Admin',
                'report_date' => $report->report_date->toDateString(),
                'center_id' => $center->id,
                'violation_type' => 'Updated Violation',
                'count' => 1,
            ])
            ->assertRedirect("/reports/{$report->id}");

        $this->assertSame('Updated By Other Admin', $report->fresh()->full_name);

        $this->actingAs($otherAdmin)
            ->delete("/reports/{$report->id}")
            ->assertRedirect();

        $this->assertNull(Report::find($report->id));
    }

    public function test_report_creation_records_the_creator_but_does_not_scope_visibility(): void
    {
        $admin = User::factory()->create();
        $center = Center::factory()->create();

        $this->actingAs($admin)->post('/reports', [
            'full_name' => 'Jane Doe',
            'report_date' => now()->toDateString(),
            'center_id' => $center->id,
            'violation_type' => 'Theft',
            'count' => 1,
        ])->assertRedirect();

        $report = Report::firstWhere('full_name', 'Jane Doe');
        $this->assertSame($admin->id, $report->created_by);

        // A different admin can still see it in the shared search/list.
        $anotherAdmin = User::factory()->create();
        $this->actingAs($anotherAdmin)
            ->get('/reports?search=Jane')
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('reports.data', 1));
    }
}
