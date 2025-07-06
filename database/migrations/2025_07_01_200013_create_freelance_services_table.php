<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('freelance_services', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->string('photo')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->integer('terms')->default(0);

            $table->boolean('is_active')->default(true);
            $table->boolean('express_mode')->default(false);
            $table->boolean('premium_mode')->default(false);

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('The freelancer who created the service');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freelance_services');
    }
};
