<?php

namespace Database\Seeders;

use App\Models\Center;
use App\Models\Entity;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Default Super Admin — only handles account approval.
        User::factory()->superadmin()->create([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'email' => 'superadmin@police.local',
            'password' => bcrypt('password'),
        ]);

        // Sample centers/zones.
        $centers = collect(['Bouqana 1', 'Bouqana 2', 'Zone 1', 'Zone 2'])
            ->map(fn (string $name) => Center::create(['name' => $name]));

        // Default entities/parties (Sûreté Régionale de Nador, Police, FA, ...) available to all admins.
        $topLevelEntities = collect(['Sûreté Régionale de Nador', 'Police', 'FA'])
            ->mapWithKeys(fn (string $name) => [$name => Entity::firstOrCreate(['name' => $name, 'parent_id' => null], ['status' => 'active'])]);

        // Sample branches under Sûreté Régionale de Nador.
        collect(['بي نصار', 'ازغنغان', 'الناظور سنتر', 'بوعرور', 'خاص بالنزارق'])
            ->each(fn (string $name) => Entity::firstOrCreate(
                ['name' => $name, 'parent_id' => $topLevelEntities['Sûreté Régionale de Nador']->id],
                ['status' => 'active']
            ));

        // A couple of approved admins for local testing (full shared access).
        $admins = collect([
            ['name' => 'Admin One', 'username' => 'admin1', 'email' => 'admin1@police.local'],
            ['name' => 'Admin Two', 'username' => 'admin2', 'email' => 'admin2@police.local'],
        ])->map(fn (array $attrs) => User::factory()->create([
            ...$attrs,
            'role' => 'admin',
            'status' => 'approved',
            'password' => bcrypt('password'),
        ]));

        // One pending admin awaiting Super Admin approval, for testing that flow.
        User::factory()->pending()->create([
            'name' => 'Pending Admin',
            'username' => 'pendingadmin',
            'email' => 'pendingadmin@police.local',
            'password' => bcrypt('password'),
        ]);

        // Sample reports spread across the current month, created by both admins.
        for ($day = 1; $day <= 20; $day += 2) {
            $date = now()->startOfMonth()->addDays($day - 1);

            if ($date->greaterThan(now())) {
                break;
            }

            Report::factory()
                ->count(fake()->numberBetween(1, 3))
                ->create([
                    'created_by' => $admins->random()->id,
                    'center_id' => $centers->random()->id,
                    'report_date' => $date->format('Y-m-d'),
                ]);
        }
    }
}
