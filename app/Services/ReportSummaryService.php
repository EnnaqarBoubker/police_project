<?php

namespace App\Services;

use App\Models\Report;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

class ReportSummaryService
{
    /**
     * Report counts per day-of-month for the given month, e.g. [1 => 3, 4 => 1],
     * used to highlight days that already contain records on the calendar grid.
     */
    public function countsByDayForMonth(CarbonImmutable $month): array
    {
        return Report::query()
            ->whereBetween('report_date', [$month->startOfMonth()->toDateString(), $month->endOfMonth()->toDateString()])
            ->get(['report_date'])
            ->groupBy(fn (Report $report) => $report->report_date->day)
            ->map->count()
            ->all();
    }

    public function dailyCount(CarbonImmutable $date, array $filters = []): int
    {
        return $this->applyFilters(Report::query()->whereDate('report_date', $date->toDateString()), $filters)->count();
    }

    public function monthlyTotal(CarbonImmutable $month, array $filters = []): int
    {
        return $this->applyFilters(
            Report::query()->whereBetween('report_date', [$month->startOfMonth()->toDateString(), $month->endOfMonth()->toDateString()]),
            $filters
        )->count();
    }

    public function monthlyByCenter(CarbonImmutable $month, array $filters = []): Collection
    {
        return $this->applyFilters(
            Report::query()
                ->whereBetween('report_date', [$month->startOfMonth()->toDateString(), $month->endOfMonth()->toDateString()])
                ->join('centers', 'centers.id', '=', 'reports.center_id'),
            $filters
        )
            ->selectRaw('centers.name as center, COUNT(*) as total')
            ->groupBy('centers.name')
            ->orderByDesc('total')
            ->get();
    }

    public function monthlyByViolationType(CarbonImmutable $month, array $filters = []): Collection
    {
        return $this->applyFilters(
            Report::query()->whereBetween('report_date', [$month->startOfMonth()->toDateString(), $month->endOfMonth()->toDateString()]),
            $filters
        )
            ->selectRaw('violation_type, COUNT(*) as total')
            ->groupBy('violation_type')
            ->orderByDesc('total')
            ->get();
    }

    private function applyFilters($query, array $filters)
    {
        return $query
            ->when($filters['center_id'] ?? null, fn ($q, $centerId) => $q->where('reports.center_id', $centerId))
            ->when($filters['violation_type'] ?? null, fn ($q, $type) => $q->where('violation_type', $type));
    }
}
