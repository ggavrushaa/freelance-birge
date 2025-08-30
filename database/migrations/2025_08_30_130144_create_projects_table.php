<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id()->from(1001);

            $table->decimal('price', 10, 2)->default(0);
            $table->integer('terms')->default(0);
            $table->string('status')->default('Заказ создан');
            $table->text('comment')->nullable();

            $table->foreignId('customer_job_id')->constrained('customer_jobs')->onDelete('cascade');
            $table->foreignId('freelance_gig_id')->constrained('freelance_gigs')->onDelete('cascade');
            $table->foreignId('tariff_id')->constrained('tariffs')->onDelete('cascade');

            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');

            $table->boolean('is_active')->default(true);
            $table->boolean('is_offer')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
