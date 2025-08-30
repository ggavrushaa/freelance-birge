<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->morphs('favorable');

            $table->timestamps();

            $table->unique(['user_id', 'favorable_type', 'favorable_id']);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
