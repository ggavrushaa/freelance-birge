<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->foreignId('profile_id')->constrained('profiles');
            $table->string('title');
            $table->string('description');

            $table->string('image');

            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('sub_category_id')->constrained('sub_categories');

            $table->boolean('is_published')->default(true);
            $table->decimal('price', 10, 2)->default(0);
            $table->integer('terms')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
