<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'center_id',
        'entity_id',
        'full_name',
        'age',
        'gender',
        'marital_status',
        'violation_type',
        'report_date',
        'count',
        'notes',
    ];

    protected $casts = [
        'report_date' => 'date:Y-m-d',
        'age' => 'integer',
        'count' => 'integer',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function center(): BelongsTo
    {
        return $this->belongsTo(Center::class);
    }

    public function entity(): BelongsTo
    {
        return $this->belongsTo(Entity::class);
    }

    public function entities(): HasMany
    {
        return $this->hasMany(ReportEntity::class);
    }

    /**
     * Shared search/filter logic used by both the reports index listing
     * and the Excel export, so exports always match what's on screen.
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            ->when($filters['search'] ?? null, function (Builder $q, $search) {
                $q->where(function (Builder $q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('id', $search);
                });
            })
            ->when($filters['date'] ?? null, fn (Builder $q, $date) => $q->whereDate('report_date', $date))
            ->when($filters['center_id'] ?? null, fn (Builder $q, $centerId) => $q->where('center_id', $centerId))
            ->when($filters['entity_id'] ?? null, fn (Builder $q, $entityId) => $q->where('entity_id', $entityId))
            ->when($filters['gender'] ?? null, fn (Builder $q, $gender) => $q->where('gender', $gender))
            ->when($filters['marital_status'] ?? null, fn (Builder $q, $status) => $q->where('marital_status', $status))
            ->when($filters['violation_type'] ?? null, fn (Builder $q, $type) => $q->where('violation_type', 'like', '%'.$type.'%'));
    }
}
