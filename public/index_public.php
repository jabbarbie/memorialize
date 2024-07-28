<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));
$root_path = "repositories/memorialize";
// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../'.$root_path.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../'.$root_path.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../'.$root_path.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
