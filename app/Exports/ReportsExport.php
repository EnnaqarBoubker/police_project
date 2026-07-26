<?php

namespace App\Exports;

use App\Models\Report;
use App\Support\Countries;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReportsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithStyles
{
    private const GENDER_LABELS = [
        'male' => 'ذكر',
        'female' => 'أنثى',
    ];

    private const MARITAL_STATUS_LABELS = [
        'single' => 'أعزب',
        'married' => 'متزوج',
        'divorced' => 'مطلق',
        'widowed' => 'أرمل',
    ];

    public function __construct(private readonly array $filters = [])
    {
    }

    public function query(): Builder
    {
        return Report::query()
            ->with(['center', 'entity.parent', 'creator'])
            ->filter($this->filters)
            ->orderByDesc('report_date')
            ->orderByDesc('id');
    }

    public function headings(): array
    {
        return [
            'رقم السجل',
            'الاسم الكامل',
            'التاريخ',
            'الوقت',
            'العمر',
            'الجنس',
            'الجنسية',
            'الحالة الاجتماعية',
            'المركز / الموقع',
            'الجهة',
            'نوع المخالفة',
            'العدد',
            'ملاحظات',
            'أُضيف بواسطة',
            'تاريخ الإنشاء',
            'تاريخ آخر تحديث',
        ];
    }

    public function map($report): array
    {
        return [
            $report->id,
            $report->full_name ?? '—',
            optional($report->report_date)->format('Y-m-d'),
            $report->report_time ? substr($report->report_time, 0, 5) : '—',
            $report->age,
            self::GENDER_LABELS[$report->gender] ?? '—',
            $report->nationality ? trim(Countries::flag($report->nationality).' '.Countries::name($report->nationality)) : '—',
            self::MARITAL_STATUS_LABELS[$report->marital_status] ?? '—',
            $report->center?->name ?? '—',
            $report->entity?->displayName() ?? '—',
            $report->violation_type ?? '—',
            $report->count,
            $report->notes,
            $report->creator?->name ?? '—',
            $report->created_at?->format('Y-m-d H:i'),
            $report->updated_at?->format('Y-m-d H:i'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
