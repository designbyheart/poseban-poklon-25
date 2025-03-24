<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CleanupOldEmailTests extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email-tests:cleanup {--force : Skip confirmation prompt}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove old PHPUnit email tests after migration to Codeception';

    /**
     * The list of files to be deleted.
     *
     * @var array
     */
    protected $filesToDelete = [
        'tests/Feature/BrevoEmailTest.php',
        'tests/Feature/EmailServiceTest.php'
    ];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('=== Email Tests Cleanup ===');
        $this->info('This command will remove old PHPUnit email tests that have been migrated to Codeception.');

        // Check if new Codeception tests exist first
        if (!File::exists(base_path('tests/functional/BrevoEmailCest.php'))) {
            $this->error('❌ Migration to Codeception does not appear to be complete!');
            $this->error('The Codeception test file tests/functional/BrevoEmailCest.php does not exist.');
            $this->error('Please make sure the migration is complete before cleaning up old tests.');
            return 1;
        }

        // List files that will be deleted
        $this->info('The following files will be deleted:');
        foreach ($this->filesToDelete as $file) {
            $path = base_path($file);
            if (File::exists($path)) {
                $this->line(" - <fg=yellow>{$file}</>");
            } else {
                $this->line(" - <fg=gray>{$file}</> (not found)");
            }
        }

        // Get confirmation unless --force is used
        if (!$this->option('force')) {
            if (!$this->confirm('Do you want to proceed with deletion?', false)) {
                $this->info('Operation cancelled. No files were deleted.');
                return 0;
            }
        }

        // Delete files
        $deleted = 0;
        foreach ($this->filesToDelete as $file) {
            $path = base_path($file);
            if (File::exists($path)) {
                try {
                    File::delete($path);
                    $this->info("✅ Deleted: {$file}");
                    $deleted++;
                } catch (\Exception $e) {
                    $this->error("❌ Failed to delete {$file}: {$e->getMessage()}");
                }
            }
        }

        // Summary
        if ($deleted > 0) {
            $this->info("Successfully deleted {$deleted} file(s).");
            $this->line('✅ Cleanup complete. The old PHPUnit email tests have been removed.');
        } else {
            $this->info('No files were deleted. They may have already been removed.');
        }

        return 0;
    }
}
