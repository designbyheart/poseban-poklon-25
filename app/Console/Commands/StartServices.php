<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class StartServices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start both the web server and queue worker concurrently';

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
        $this->info('Starting Laravel development server and queue worker...');
        
        // Create process for artisan serve
        $serverProcess = new Process(['php', 'artisan', 'serve']);
        $serverProcess->setTimeout(null);
        $serverProcess->start(function ($type, $buffer) {
            if (Process::ERR === $type) {
                $this->error($buffer);
            } else {
                $this->line('<info>[Server]</info> ' . $buffer);
            }
        });
        
        $this->info('Laravel development server started.');
        
        // Create process for queue worker
        $queueProcess = new Process(['php', 'artisan', 'queue:work']);
        $queueProcess->setTimeout(null);
        $queueProcess->start(function ($type, $buffer) {
            if (Process::ERR === $type) {
                $this->error($buffer);
            } else {
                $this->line('<comment>[Queue]</comment> ' . $buffer);
            }
        });
        
        $this->info('Queue worker started.');
        $this->info('Press Ctrl+C to stop all services.');
        
        // Keep the command running
        while ($serverProcess->isRunning() && $queueProcess->isRunning()) {
            sleep(1);
        }
        
        // If one process dies, kill the other
        if ($serverProcess->isRunning()) {
            $this->warn('Queue worker stopped unexpectedly. Stopping server...');
            $serverProcess->stop();
        }
        
        if ($queueProcess->isRunning()) {
            $this->warn('Server stopped unexpectedly. Stopping queue worker...');
            $queueProcess->stop();
        }
        
        return 0;
    }
}
