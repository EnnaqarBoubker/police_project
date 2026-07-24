<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('center_id')->nullable()->constrained('centers')->nullOnDelete();
            $table->string('full_name');
            $table->unsignedTinyInteger('age')->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed'])->nullable();
            $table->string('violation_type');
            $table->date('report_date');
            $table->unsignedInteger('count')->default(1);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('report_date');
            $table->index('violation_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
