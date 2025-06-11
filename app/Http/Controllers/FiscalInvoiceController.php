<?php

namespace App\Http\Controllers;

use App\Order;
use App\Services\FiscalInvoiceService;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class FiscalInvoiceController extends Controller
{
    protected $fiscalInvoiceService;

    public function __construct(FiscalInvoiceService $fiscalInvoiceService)
    {
        //        $this->middleware('check_role:admin,editor');
        $this->fiscalInvoiceService = $fiscalInvoiceService;
    }

    /**
     * Display the fiscal invoice management page
     */
    public function index()
    {
        return view('admin.fiscal.index');
    }

    /**
     * Send fiscal invoice for a specific order
     */
    public function sendInvoice($orderId)
    {
        return;
        try {
            $order = Order::find($orderId);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found'
                ], 404);
            }

            dd('test');

            $result = $this->fiscalInvoiceService->sendInvoiceForOrder($order);

            return response()->json($result, $result['success'] ? 200 : 422);
        } catch (\Exception $e) {
            Log::error('Error in fiscal invoice controller', [
                'order_id' => $orderId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send fiscal invoices for multiple orders
     */
    public function sendBulkInvoices(Request $request)
    {
        try {
            $orderIds = $request->input('order_ids', []);

            if (empty($orderIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No order IDs provided'
                ], 400);
            }

            $results = [];

            foreach ($orderIds as $orderId) {
                $order = Order::find($orderId);

                if (!$order) {
                    $results[] = [
                        'order_id' => $orderId,
                        'success' => false,
                        'message' => 'Order not found'
                    ];
                    continue;
                }

                $result = $this->fiscalInvoiceService->sendInvoiceForOrder($order);
                $result['order_id'] = $orderId;
                $results[] = $result;
            }

            $successCount = count(array_filter($results, function ($result) {
                return $result['success'] === true;
            }));

            return response()->json([
                'success' => $successCount > 0,
                'message' => $successCount . ' of ' . count($results) . ' invoices sent successfully',
                'results' => $results
            ]);
        } catch (\Exception $e) {
            Log::error('Error in bulk fiscal invoice sending', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check fiscal service status
     */
    public function checkStatus()
    {
        try {
            $result = $this->fiscalInvoiceService->checkStatus();

            return response()->json([
                'success' => true,
                'status' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check service status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
