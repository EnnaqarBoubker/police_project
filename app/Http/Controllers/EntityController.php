<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntityRequest;
use App\Http\Requests\UpdateEntityRequest;
use App\Models\Entity;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EntityController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Entity::class, 'entity');
    }

    /**
     * Top-level entities (Sûreté Régionale de Nador, Police, FA, ...). Each card links to its
     * own branches page.
     */
    public function index(): Response
    {
        return Inertia::render('Entities/Index', [
            'entities' => Entity::query()
                ->topLevel()
                ->with('creator:id,name')
                ->withCount(['children', 'reports'])
                ->orderBy('name')
                ->get(['id', 'name', 'status', 'created_by', 'created_at']),
        ]);
    }

    /**
     * Branches/sub-entities of a single top-level entity.
     */
    public function show(Entity $entity): Response
    {
        abort_unless($entity->isTopLevel(), 404);

        return Inertia::render('Entities/Show', [
            'parent' => $entity->only(['id', 'name', 'status']),
            'entities' => $entity->children()
                ->with('creator:id,name')
                ->withCount('reports')
                ->orderBy('name')
                ->get(['id', 'name', 'status', 'created_by', 'created_at']),
        ]);
    }

    public function store(StoreEntityRequest $request): RedirectResponse
    {
        Entity::create([
            ...$request->validated(),
            'created_by' => $request->user()->id,
        ]);

        return back()->with('status', __('تمت إضافة الجهة بنجاح.'));
    }

    public function update(UpdateEntityRequest $request, Entity $entity): RedirectResponse
    {
        $entity->update($request->validated());

        return back()->with('status', __('تم تحديث بيانات الجهة.'));
    }

    public function destroy(Entity $entity): RedirectResponse
    {
        $wasTopLevel = $entity->isTopLevel();

        $entity->delete();

        return $wasTopLevel
            ? redirect()->route('entities.index')->with('status', __('تم حذف الجهة.'))
            : back()->with('status', __('تم حذف الجهة.'));
    }
}
