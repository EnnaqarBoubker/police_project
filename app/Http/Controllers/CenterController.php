<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Center;

class CenterController extends Controller
{
    /**
     * Quick "extend the list" action from the report form — any approved
     * admin may add a new center/zone to the shared, extendable list.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:centers,name'],
        ]);

        Center::create($data);

        return back()->with('status', 'Center added.');
    }
}
