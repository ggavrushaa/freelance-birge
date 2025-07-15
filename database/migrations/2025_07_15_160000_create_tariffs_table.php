<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tariffs', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->string('name');
            $table->text('description');

            $table->decimal('price', 10, 2);
            $table->integer('term'); // in days
            $table->integer('corrections');
            
            $table->json('additional_options')->nullable();

            $table->foreignId('freelance_gig_id')->constrained('freelance_gigs')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tariffs');
    }
};