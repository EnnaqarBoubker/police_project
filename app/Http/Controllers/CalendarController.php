<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Services\ReportSummaryService;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function __construct(private readonly ReportSummaryService $summaries)
    {
    }

    /**
     * Monthly grid view, current day highlighted, days with records visually marked.
     */
    public function index(Request $request): Response
    {
        $month = $this->resolveMonth($request->query('month'));

        return Inertia::render('Calendar/Index', [
            'month' => $month->format('Y-m'),
            'monthLabel' => $month->translatedFormat('F Y'),
            'today' => CarbonImmutable::today()->toDateString(),
            'startOfMonthWeekday' => (int) $month->startOfMonth()->dayOfWeekIso, // 1 (Mon) - 7 (Sun)
            'daysInMonth' => $month->daysInMonth,
            'countsByDay' => $this->summaries->countsByDayForMonth($month),
            'prevMonth' => $month->subMonthNoOverflow()->format('Y-m'),
            'nextMonth' => $month->addMonthNoOverflow()->format('Y-m'),
        ]);
    }

    /**
     * All reports logged on a given date (shared across every admin), plus an add-entry action.
     */
    public function show(Request $request, string $date): Response
    {
        $day = CarbonImmutable::createFromFormat('Y-m-d', $date);

        $reports = Report::query()
            ->with(['center', 'entity.parent', 'creator'])
            ->whereDate('report_date', $day->toDateString())
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Calendar/Show', [
            'date' => $day->toDateString(),
            'dateLabel' => $day->translatedFormat('l, F j, Y'),
            'reports' => $reports,
        ]);
    }

    private function resolveMonth(?string $month): CarbonImmutable
    {
        if ($month && preg_match('/^\d{4}-\d{2}$/', $month)) {
            return CarbonImmutable::createFromFormat('Y-m-d', "{$month}-01");
        }

        return CarbonImmutable::today()->startOfMonth();
    }
}
