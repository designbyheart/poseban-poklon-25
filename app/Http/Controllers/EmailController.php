<?php

namespace App\Http\Controllers;

use App\Order;
use App\Services\EmailService;
use App\Services\FiscalCashRegister;
use App\Utilities\VoucherUtility;
use App\Voucher;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use PDF;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;

class EmailController extends Controller
{
    protected $apiInstance;

    public function __construct()
    {
        // Configure API key authorization
        $config = Configuration::getDefaultConfiguration()
            ->setApiKey('api-key', config('services.brevo.key'));

        // Create API instance
        $this->apiInstance = new TransactionalEmailsApi(
            new Client(),
            $config
        );
    }

    public function sendTransactionalEmail()
    {
        try {
            $sendSmtpEmail = new SendSmtpEmail([
                'to' => [
                    [
                        'email' => 'recipient@example.com',
                        'name' => 'John Doe'
                    ]
                ],
                'templateId' => 1, // Replace with your template ID
                'params' => [
                    'name' => 'John',
                    'surname' => 'Doe'
                ],
                'headers' => [
                    'X-Mailin-custom' => 'custom_header_1:custom_value_1'
                ]
            ]);

            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);

            return Response::json([
                'success' => true,
                'message' => 'Email sent successfully',
                'data' => $result
            ]);
        } catch (Exception $e) {
            Log::error('Brevo email error: ' . $e->getMessage());
            return Response::json([
                'success' => false,
                'message' => 'Error sending email',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendVoucher(string $orderId)
    {
        $emailService = new EmailService();
        $emailService->sendVoucher($orderId);
    }

    public function testVoucher() {
        $voucherId = 1670;

        $voucher = Voucher::where('id', '=', $voucherId)->first();
        $voucher->sendCompanyEmail();
    }

    public function fiscal($id){
        $order = Order::where('id', $id)->first();
        $cashRegister = new FiscalCashRegister();
        $cashRegister->sendInvoice($order);
    }
}
