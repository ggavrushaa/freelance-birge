<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('canceled_projects', function (Blueprint $table) {
            $table->id()->from(1001);
            
            $table->string('reason')->nullable();
            $table->text('description')->nullable();
            $table->text('file_url')->nullable();

            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('canceled_projects');
    }
};
