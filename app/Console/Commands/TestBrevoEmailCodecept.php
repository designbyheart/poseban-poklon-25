<?php

namespace App\Console\Commands;

use App\Services\EmailService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestBrevoEmailCodecept extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'codecept:test-brevo {email? : Email address to send the test to}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a test email via Brevo API for Codeception testing';

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
        $email = $this->argument('email') ?: 'designbyheart@gmail.com';

        $this->info("===== Brevo API Test for Codeception =====");
        $this->info("Brevo API Key length: " . strlen(config('services.brevo.key')));

        // Create a new EmailService instance
        $emailService = new EmailService();

        // Set up test email data
        $subject = "Codeception Brevo API Test - " . now()->format('Y-m-d H:i:s');
        $message = "This is a test email sent from the Codeception testing command to verify Brevo API integration.";

        $this->info("Sending test email to: $email");
        $this->info("Subject: $subject");

        try {
            // Create a simple HTML email content
            $htmlContent = "<h1>Codeception Brevo Test Email</h1><p>$message</p><p>Time: " . now() . "</p>";

            // Send test email
            $result = $emailService->sendEmail(
                'emails.test.test_email',
                ['message' => $message],
                [['email' => $email, 'name' => 'Codeception Test Recipient']],
                $subject
            );

            if ($result) {
                $this->info("✅ Success! Email sent successfully via Brevo API.");
                $this->info("✅ Codeception tests should work correctly.");
                Log::info("Codeception Brevo test email sent successfully", ['email' => $email]);
                return 0;
            } else {
                $this->error("❌ Failed to send email. Brevo API returned an error.");
                $this->error("❌ Check the logs for more details.");
                Log::error("Failed to send Codeception Brevo test email", ['email' => $email]);
                return 1;
            }
        } catch (\Exception $e) {
            $this->error("❌ Exception: " . $e->getMessage());
            Log::error("Exception in Codeception Brevo test command", [
                'email' => $email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return 1;
        }
    }
}
