<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use SendinBlue\Client\Api\TransactionalEmailsApi;

class EmailControllerTest extends TestCase
{
    public function testSendEmailEndpoint()
    {
        // Mock the TransactionalEmailsApi
        $apiMock = $this->createMock(TransactionalEmailsApi::class);
        $apiMock->method('sendTransacEmail')
            ->willReturn((object)['messageId' => 'test-message-id']);

        // Replace the real API with our mock
        $this->app->instance(TransactionalEmailsApi::class, $apiMock);

        // Make the request
        $response = $this->post('/send-email');

        // Assert the response
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Email sent successfully'
            ]);
    }

    public function testSendEmailEndpointFailure()
    {
        // Mock the API to throw an exception
        $apiMock = $this->createMock(TransactionalEmailsApi::class);
        $apiMock->method('sendTransacEmail')
            ->willThrowException(new \Exception('API Error'));

        // Replace the real API with our mock
        $this->app->instance(TransactionalEmailsApi::class, $apiMock);

        // Make the request
        $response = $this->post('/send-email');

        // Assert the response
        $response->assertStatus(500)
            ->assertJson([
                'success' => false,
                'message' => 'Error sending email'
            ]);
    }
}
