<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;

class DeployGit extends Command
{
    protected $signature = 'deploy:git';
    protected $description = 'Pull the latest changes from git and copy public files to /home/plkmyid/public_html';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Starting deployment...');

        // Jalankan git pull
        $gitPull = new Process(['git', 'pull']);
        $gitPull->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$gitPull->isSuccessful()) {
            $this->error('Failed to pull latest changes from git.');
            Log::error('Failed to pull latest changes from git: ' . $gitPull->getErrorOutput());
            return;
        }

        $this->info('Successfully pulled latest changes from git.');

        // Copy files dari public ke /home/plkmyid/public_html
        $source = public_path();
        $destination = '/home/plkmyid/public_html';

        if (!File::exists($destination)) {
            $this->error('Destination directory does not exist.');
            Log::error('Destination directory does not exist: ' . $destination);
            return;
        }

        File::copyDirectory($source, $destination);

        $this->info('Successfully copied public files to ' . $destination);

        // Rename index_public.php ke index.php
        $oldFile = $destination . '/index_public.php';
        $newFile = $destination . '/index.php';

        if (File::exists($oldFile)) {
            File::move($oldFile, $newFile);
            $this->info('Successfully renamed index_public.php to index.php');
            Log::info('Successfully renamed index_public.php to index.php in ' . $destination);
        } else {
            $this->error('index_public.php does not exist in the destination directory.');
            Log::error('index_public.php does not exist in the destination directory: ' . $destination);
        }
    }
}
