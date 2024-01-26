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


        Schema::table('products', function(Blueprint $table) {
            $table->dropColumn('category');
            $table->unsignedBigInteger('category_id')->default(NULL)->after('description');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('products', function(Blueprint $table) {
            $table->string('category', 30)->after('description');
            $table->dropConstrainedForeignId('category_id');
            $table->dropForeign('category_id');
        });
    }
};