<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;
use GuzzleHttp\Client;
use Exception;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Log;

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
}
