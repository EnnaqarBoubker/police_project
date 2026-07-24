<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Center>
 */
class CenterFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => 'Zone '.fake()->unique()->numberBetween(1, 1000),
        ];
    }
}
