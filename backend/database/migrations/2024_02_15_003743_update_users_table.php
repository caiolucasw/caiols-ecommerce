<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('users', function (Blueprint $table) {
            $table->string('cpf', '11')->after('name');
            $table->date('date_birth')->nullable(true)->default(null)->after('cpf');
            $table->string('phone', 20)->after('date_birth');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['cpf', 'date_birth', 'phone']);
        });
    }
};
