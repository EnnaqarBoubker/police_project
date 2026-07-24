<?php

namespace Database\Factories;

use App\Models\Center;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    public function definition(): array
    {
        return [
            'created_by' => User::factory(),
            'center_id' => Center::factory(),
            'full_name' => fake()->name(),
            'age' => fake()->numberBetween(18, 65),
            'gender' => fake()->randomElement(['male', 'female']),
            'marital_status' => fake()->randomElement(['single', 'married', 'divorced', 'widowed']),
            'violation_type' => fake()->randomElement(['Theft', 'Assault', 'Public Disturbance', 'Traffic Violation', 'Fraud']),
            'report_date' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'count' => fake()->numberBetween(1, 3),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
