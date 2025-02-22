<?php

namespace App\Http\Controllers;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Log;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;

class ContactController extends Controller
{
    protected $apiInstance;

    public function sendContact(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email',
                'message' => 'required|string',
            ]);

            $fields = $request->request->all();
            $fields['mail'] = ['email' => $fields['email'], 'name' => $fields['name'], 'message' => $fields['message']];

            $mainSender = ['email' => 'kontakt@posebanpoklon.rs', 'name' => 'Poseban Poklon'];
            $emailParams = [
                'to' => [$mainSender],
                'sender' => $mainSender,
                'htmlContent' => view('emails.contact', $fields)->render(),
                'params' => $fields,
                'subject' => 'New question - Contact Page',
            ];

            $config = Configuration::getDefaultConfiguration()
                ->setApiKey('api-key', config('services.brevo.key'));

            // Create API instance
            $this->apiInstance = new TransactionalEmailsApi(
                new Client(),
                $config
            );

            $sendSmtpEmail = new SendSmtpEmail($emailParams);
            $result = $this->apiInstance->sendTransacEmail($sendSmtpEmail);

            return redirect('/kontaktiraj-nas');
        } catch (Exception $e) {
            Log::error($e);
            dd($e);
            return redirect('/kontaktiraj-nas')->with('error', 'Došlo je do greške prilikom slanja poruke. Pokušajte ponovo.');
        }
    }
}
