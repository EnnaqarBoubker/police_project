<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Services\ReportSummaryService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SummaryController extends Controller
{
    public function __construct(private readonly ReportSummaryService $summaries)
    {
    }

    /**
     * Daily & monthly summary, aggregated over the entire shared dataset,
     * optionally filtered by center or violation type.
     */
    public function index(Request $request): Response
    {
        $date = $request->filled('date')
            ? CarbonImmutable::createFromFormat('Y-m-d', $request->string('date'))
            : CarbonImmutable::today();

        $month = $request->filled('month')
            ? CarbonImmutable::createFromFormat('Y-m-d', $request->string('month').'-01')
            : CarbonImmutable::today()->startOfMonth();

        $filters = $request->only(['center_id', 'violation_type']);

        return Inertia::render('Summary/Index', [
            'date' => $date->toDateString(),
            'month' => $month->format('Y-m'),
            'dailyCount' => $this->summaries->dailyCount($date, $filters),
            'monthlyTotal' => $this->summaries->monthlyTotal($month, $filters),
            'byCenter' => $this->summaries->monthlyByCenter($month, $filters),
            'byViolationType' => $this->summaries->monthlyByViolationType($month, $filters),
            'centers' => Center::orderBy('name')->get(['id', 'name']),
            'filters' => $filters,
        ]);
    }
}
