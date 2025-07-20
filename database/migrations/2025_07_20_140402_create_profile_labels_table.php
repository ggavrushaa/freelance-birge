<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profile_labels', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->foreignId('profile_id')->constrained('profiles');
            $table->foreignId('label_id')->constrained('labels');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profile_labels');
    }
};
