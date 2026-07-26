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

        $this->actingAs($admin)->post('/reports', [
            'report_date' => now()->toDateString(),
            'violation_type' => 'Theft',
            'people' => [
                ['full_name' => 'Jane Doe', 'count' => 1],
            ],
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

    public function test_creating_a_report_saves_multiple_people_as_separate_rows_sharing_the_context(): void
    {
        $admin = User::factory()->create();

        $this->actingAs($admin)->post('/reports', [
            'report_date' => '2026-01-15',
            'violation_type' => 'Group Violation',
            'people' => [
                ['full_name' => 'Person One', 'age' => 20],
                ['full_name' => 'Person Two', 'age' => 30],
                ['full_name' => 'Person Three'],
            ],
        ])->assertRedirect('/calendar/2026-01-15');

        $this->assertSame(3, Report::where('violation_type', 'Group Violation')->count());
        $this->assertTrue(Report::where('full_name', 'Person One')->where('age', 20)->exists());
        $this->assertTrue(Report::where('full_name', 'Person Two')->where('age', 30)->exists());
        $this->assertTrue(
            Report::where('full_name', 'Person Three')->where('report_date', '2026-01-15')->exists()
        );
    }

    public function test_all_person_and_report_fields_are_optional(): void
    {
        $admin = User::factory()->create();

        $this->actingAs($admin)->post('/reports', [
            'people' => [[]],
        ])->assertRedirect();

        $report = Report::latest('id')->first();
        $this->assertNull($report->full_name);
        $this->assertNull($report->violation_type);
        $this->assertNull($report->center_id);
        $this->assertNotNull($report->report_date);
        $this->assertSame(1, $report->count);
    }
}
