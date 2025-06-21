<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->from(1001);
            $table->string('telegram_id')->unique();
            $table->string('username')->unique()->comment('Telegram username');

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();

            $table->decimal('balance', 10, 2)->default(0);
            $table->float('rating')->default(0);

            $table->unsignedBigInteger('orders_count')->default(0);
            $table->unsignedBigInteger('completed_orders_count')->default(0);
            $table->unsignedBigInteger('canceled_orders_count')->default(0);
            $table->unsignedBigInteger('disputes_count')->default(0);
            $table->unsignedBigInteger('win_disputes_count')->default(0);
            $table->unsignedBigInteger('lose_disputes_count')->default(0);
            $table->unsignedBigInteger('referrals_count')->default(0);

            $table->longText('seed_phrase')->nullable();
            $table->string('pin_code')->nullable();
            $table->unsignedBigInteger('pin_code_attempts')->default(0);
            $table->timestamp('pin_code_blocked_until')->nullable();

            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();

            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
