<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_jobs', function (Blueprint $table) {
            $table->foreignId('author_id')
                ->nullable()
                ->constrained('users')
                ->cascadeOnDelete()
                ->after('user_id')
                ->comment('The user who created the job');
        });
    }

    public function down(): void
    {
        Schema::table('customer_job', function (Blueprint $table) {
            //
        });
    }
};
