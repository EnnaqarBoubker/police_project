<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('entities', function (Blueprint $table) {
            $table->foreignId('parent_id')->nullable()->after('id')->constrained('entities')->cascadeOnDelete();
            $table->index('parent_id');
        });
    }

    public function down(): void
    {
        Schema::table('entities', function (Blueprint $table) {
            $table->dropConstrainedForeignId('parent_id');
        });
    }
};
