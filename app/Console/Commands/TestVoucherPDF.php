<?php

namespace App\Console\Commands;

use App\Order;
use App\Utilities\VoucherUtility;
use App\Voucher;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class TestVoucherPDF extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:voucher-pdf 
                            {order_id? : The ID of the order to test, or randomize if not provided}
                            {--email= : Email to send the test to. If not provided, uses the customer email}
                            {--save : Save generated PDFs to disk for inspection}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test voucher PDF generation and email sending';

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
        $this->info('===== Voucher PDF Test =====');

        // Get order ID from argument or find a random order with vouchers
        $orderId = $this->argument('order_id');
        if (!$orderId) {
            $order = Order::whereHas('vouchers')->inRandomOrder()->first();
            if (!$order) {
                $this->error('No orders with vouchers found! Please create an order with vouchers first.');
                return 1;
            }
            $orderId = $order->id;
            $this->info("Using random order: #{$orderId}");
        } else {
            $order = Order::find($orderId);
            if (!$order) {
                $this->error("Order #{$orderId} not found!");
                return 1;
            }
            $this->info("Using specified order: #{$orderId}");
        }

        // Find vouchers for this order
        $vouchers = Voucher::where('order_id', $orderId)->get();
        if ($vouchers->isEmpty()) {
            $this->error("No vouchers found for order #{$orderId}!");
            return 1;
        }

        $this->info("Found " . $vouchers->count() . " vouchers to process");

        // Generate PDFs for each voucher
        $successCount = 0;
        $failCount = 0;

        foreach ($vouchers as $i => $voucher) {
            $this->output->write("Processing voucher " . ($i + 1) . "/" . $vouchers->count() . " (#{$voucher->id}): ");

            $pdf = VoucherUtility::generateVoucherPDF($voucher);

            if ($pdf) {
                $successCount++;
                $this->output->writeln("<fg=green>✓</>");

                // Save PDF if requested
                if ($this->option('save')) {
                    $path = storage_path('app/public/test_vouchers');
                    if (!file_exists($path)) {
                        mkdir($path, 0755, true);
                    }

                    $filename = "voucher_{$voucher->voucher_code}.pdf";
                    $pdf->save("{$path}/{$filename}");
                    $this->info("  Saved to: {$path}/{$filename}");
                }
            } else {
                $failCount++;
                $this->output->writeln("<fg=red>✗</>");
            }
        }

        // Summary
        $this->info("\nResults:");
        $this->info("- Successfully generated: {$successCount}");
        $this->info("- Failed: {$failCount}");

        // Test sending email
        if ($successCount > 0) {
            $this->info("\nTesting email:");

            // Use provided email or customer email
            $targetEmail = $this->option('email') ?: $order->customer_email;

            if (!$targetEmail) {
                $this->error("No target email provided and order doesn't have a customer email!");
                return 1;
            }

            $this->info("Sending test email to: {$targetEmail}");

            // Use the SendVoucherEmail job to test the entire flow
            if ($this->confirm("Send voucher email now?", true)) {
                // Override customer email if needed
                $originalEmail = null;
                if ($this->option('email')) {
                    $originalEmail = $order->customer_email;
                    $order->customer_email = $targetEmail;
                    $order->save();
                    $this->info("Temporarily changed order email for testing");
                }

                try {
                    $job = new \App\Jobs\SendVoucherEmail($orderId);
                    $job->handle();
                    $this->info("Email job processed");
                    $this->info("<fg=green>Email sent successfully!</>");

                    // Restore original email if changed
                    if ($originalEmail !== null) {
                        $order->customer_email = $originalEmail;
                        $order->save();
                        $this->info("Restored original order email");
                    }

                    return 0;
                } catch (\Exception $e) {
                    $this->error("Failed to send email: " . $e->getMessage());

                    // Restore original email if changed
                    if ($originalEmail !== null) {
                        $order->customer_email = $originalEmail;
                        $order->save();
                        $this->info("Restored original order email");
                    }

                    return 1;
                }
            }
        }

        return $failCount === 0 ? 0 : 1;
    }
}
