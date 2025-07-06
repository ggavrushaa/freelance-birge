<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('freelance_gigs', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->string('name')->unique();
            $table->string('photo')->nullable();

            $table->boolean('is_active')->default(true);
            $table->boolean('express_mode')->default(false);
            $table->boolean('premium_mode')->default(false);

            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('sub_category_id')->constrained('sub_categories')->onDelete('cascade')->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('The freelancer who created the service');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('freelance_services');
    }
};
