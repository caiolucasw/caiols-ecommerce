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
            $table->dropColumn('brand');
            $table->unsignedBigInteger('brand_id')->default(NULL)->after('category_id');
            $table->foreign('brand_id')->references('id')->on('brands');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //

        Schema::table('products', function(Blueprint $table) {
            $table->string('brand', 30)->after('description');
            $table->dropConstrainedForeignId('brand_id');
            $table->dropForeign('brand_id');
        });
    }
};
