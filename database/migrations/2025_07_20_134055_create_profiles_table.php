<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->foreignId('user_id')->constrained('users');
            $table->string('description')->nullable();
            $table->string('avatar')->nullable();

            $table->decimal('balance', 10, 2)->default(0);
            $table->integer('rating')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->integer('orders_count')->default(0);
            $table->integer('completed_orders_count')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
