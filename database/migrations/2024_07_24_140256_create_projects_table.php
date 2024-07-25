<?php

use App\Models\User;
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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("short_name")->nullable();
            $table->string("long_name")->nullable();
            $table->text("description")->nullable();

            $table->string("image_path")->nullable();
            $table->string('link_database')->nullable();
            $table->string('link_repository')->nullable();
            $table->string('website_local_link')->nullable();
            $table->string('website_local_port')->nullable();
            $table->string('website_public_link')->nullable();
            $table->string('color')->nullable();

            $table->longText('notes')->nullable();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};