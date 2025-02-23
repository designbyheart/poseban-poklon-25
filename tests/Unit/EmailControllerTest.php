<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\EmailController;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Model\SendSmtpEmail;
use Exception;

class EmailControllerTest extends TestCase
{
    protected $emailController;
    protected $apiInstanceMock;

    protected function setUp(): void
    {
        parent::setUp();

        // Mock the TransactionalEmailsApi
        $this->apiInstanceMock = $this->createMock(TransactionalEmailsApi::class);

        // Create EmailController instance with mocked dependencies
        $this->emailController = new EmailController();

        // Set the mocked API instance
        $reflection = new \ReflectionClass($this->emailController);
        $property = $reflection->getProperty('apiInstance');
        $property->setAccessible(true);
        $property->setValue($this->emailController, $this->apiInstanceMock);
    }

    public function testSendTransactionalEmailSuccess()
    {
        // Arrange
        $expectedResponse = (object)[
            'messageId' => 'test-message-id'
        ];

        $this->apiInstanceMock
            ->expects($this->once())
            ->method('sendTransacEmail')
            ->willReturn($expectedResponse);

        // Act
        $response = $this->emailController->sendTransactionalEmail();
        $responseData = json_decode($response->getContent(), true);

        // Assert
        $this->assertTrue($responseData['success']);
        $this->assertEquals('Email sent successfully', $responseData['message']);
        $this->assertEquals($expectedResponse, $responseData['data']);
    }

    public function testSendTransactionalEmailFailure()
    {
        // Arrange
        $expectedError = 'API Error';

        $this->apiInstanceMock
            ->expects($this->once())
            ->method('sendTransacEmail')
            ->willThrowException(new Exception($expectedError));

        // Act
        $response = $this->emailController->sendTransactionalEmail();
        $responseData = json_decode($response->getContent(), true);

        // Assert
        $this->assertFalse($responseData['success']);
        $this->assertEquals('Error sending email', $responseData['message']);
        $this->assertEquals($expectedError, $responseData['error']);
    }
}
