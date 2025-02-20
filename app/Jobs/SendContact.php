<?php

namespace App\Jobs;

use App\Services\EmailService;
use Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendContact implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $emailService = new EmailService();
        $emailService->sendEmail(
            'emails.contact',
            ['mail' => $this->request],
            ['email' => 'kontakt@posebanpoklon.rs'],
            'New question'
        );
//        Mail::send(new NewContactForm($this->request));
    }
}
