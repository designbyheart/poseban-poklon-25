<?php

namespace App\Http\Controllers;

use App\Order;
use App\Services\FiscalInvoiceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class FiscalController extends Controller
{
    protected $fiscalService;

    public function __construct(FiscalInvoiceService $fiscalService)
    {
        $this->fiscalService = $fiscalService;
    }

    /**
     * Sign in to the fiscal service
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function signin(Request $request): JsonResponse
    {
        try {
            $result = $this->fiscalService->signin();

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => [
                        'token' => $result['token'] ?? null,
                        'expires_in' => $result['data']['expiresIn'] ?? null
                    ]
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => $result['message'],
                'error' => $result['error'] ?? null
            ], 400);

        } catch (\Exception $e) {
            Log::error('Fiscal signin endpoint error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check fiscal service status
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function status(Request $request): JsonResponse
    {
        try {
            $result = $this->fiscalService->status();

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => $result['data'] ?? null
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => $result['message'],
                'error' => $result['error'] ?? null
            ], 400);

        } catch (\Exception $e) {
            Log::error('Fiscal status endpoint error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate fiscal invoice for an order
     *
     * @param Request $request
     * @param int $orderId
     * @return JsonResponse
     */
    public function generateInvoice(Request $request, $orderId): JsonResponse
    {
        try {
            // Find the order
            $order = Order::find($orderId);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found',
                    'error' => "Order with ID {$orderId} does not exist"
                ], 404);
            }

            // Generate the invoice
            $result = $this->fiscalService->generateInvoice($order);

            if ($result['success']) {
                return response()->json([
                    'success' => true,
                    'message' => $result['message'],
                    'data' => [
                        'order_id' => $orderId,
                        'invoice_data' => $result['data'] ?? null
                    ]
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => $result['message'],
                'error' => $result['error'] ?? null
            ], 400);

        } catch (\Exception $e) {
            Log::error('Fiscal generate invoice endpoint error: ' . $e->getMessage(), [
                'order_id' => $orderId
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
