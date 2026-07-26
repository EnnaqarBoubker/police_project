<?php

namespace App\Http\Controllers;

use App\Exports\ReportsExport;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\Entity;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ReportController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Report::class, 'report');
    }

    /**
     * Search & filter across the entire shared dataset.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'date', 'entity_id', 'gender', 'nationality', 'marital_status', 'violation_type']);

        $reports = Report::query()
            ->with(['center', 'entity.parent', 'creator'])
            ->filter($filters)
            ->orderByDesc('report_date')
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
            'entities' => $this->entityTree(),
            'filters' => $filters,
        ]);
    }

    /**
     * Excel export of the shared dataset, respecting the same search/filter
     * parameters as the index listing.
     */
    public function export(Request $request): BinaryFileResponse
    {
        $this->authorize('viewAny', Report::class);

        $filters = $request->only(['search', 'date', 'entity_id', 'gender', 'nationality', 'marital_status', 'violation_type']);

        return Excel::download(new ReportsExport($filters), 'reports-'.now()->format('Y-m-d-His').'.xlsx');
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Reports/Create', [
            'entities' => $this->entityTree(),
            'date' => $request->query('date'),
        ]);
    }

    /**
     * Creates one report per person in the batch, all sharing the same
     * date/violation type/entity — the whole group is saved in a single
     * transaction rather than one request per person.
     */
    public function store(StoreReportRequest $request): RedirectResponse
    {
        $shared = $request->safe()->only(['report_date', 'report_time', 'violation_type', 'entity_id', 'notes']);
        $people = $request->safe()->input('people', []);

        $reports = DB::transaction(fn () => collect($people)->map(fn (array $person) => Report::create([
            ...$shared,
            ...$person,
            'created_by' => $request->user()->id,
        ])));

        $status = $reports->count() > 1
            ? __('تمت إضافة :count سجلات.', ['count' => $reports->count()])
            : __('تمت إضافة السجل.');

        return redirect()->route('calendar.show', $shared['report_date'])->with('status', $status);
    }

    public function show(Report $report): Response
    {
        return Inertia::render('Reports/Show', [
            'report' => $report->load(['center', 'entity.parent', 'creator', 'entities']),
        ]);
    }

    public function edit(Report $report): Response
    {
        return Inertia::render('Reports/Edit', [
            'report' => $report,
            'entities' => $this->entityTree($report),
        ]);
    }

    public function update(UpdateReportRequest $request, Report $report): RedirectResponse
    {
        $report->update($request->validated());

        return redirect()->route('reports.show', $report)->with('status', __('تم تحديث السجل.'));
    }

    public function destroy(Report $report): RedirectResponse
    {
        $date = $report->report_date->toDateString();
        $report->delete();

        return redirect()->route('calendar.show', $date)->with('status', __('تم حذف السجل.'));
    }

    /**
     * Top-level entities with their active branches, for the report form's
     * two-step entity picker. When editing a report, the currently assigned
     * entity/branch is always included even if it has since been made
     * inactive, so the form never silently drops the existing selection.
     */
    private function entityTree(?Report $report = null)
    {
        $currentEntityId = $report?->entity_id;
        $currentParentId = $report?->entity?->parent_id;

        return Entity::query()
            ->topLevel()
            ->where(function ($q) use ($currentEntityId, $currentParentId) {
                $q->where('status', 'active')
                    ->orWhere('id', $currentEntityId)
                    ->orWhere('id', $currentParentId);
            })
            ->with(['children' => function ($q) use ($currentEntityId) {
                $q->where(function ($q2) use ($currentEntityId) {
                    $q2->where('status', 'active')->orWhere('id', $currentEntityId);
                })->orderBy('name');
            }])
            ->orderBy('name')
            ->get(['id', 'name', 'parent_id', 'status']);
    }
}
