<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_languages', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->foreignId('profile_id')->constrained('profiles');
            $table->foreignId('language_id')->constrained('languages');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_languages');
    }
};
