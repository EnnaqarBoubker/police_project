<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Entity extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'name',
        'status',
        'created_by',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Entity::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Entity::class, 'parent_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    public function scopeTopLevel(Builder $query): Builder
    {
        return $query->whereNull('parent_id');
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isTopLevel(): bool
    {
        return $this->parent_id === null;
    }

    /**
     * Display label including parent, e.g. "Sûreté Régionale de Nador — بي نصار", used
     * anywhere a report's entity is shown (list/show/export).
     */
    public function displayName(): string
    {
        return $this->relationLoaded('parent') && $this->parent
            ? "{$this->parent->name} — {$this->name}"
            : $this->name;
    }
}
