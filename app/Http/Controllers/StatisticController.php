<?php

namespace App\Http\Controllers;

use App\OrderItem;
use App\Product;
use Illuminate\Http\Request;
use App\Order;
use Illuminate\Support\Arr;
use Response;
use \Carbon\Carbon;

class StatisticController extends Controller
{

    public function __construct(){

//        $this->middleware('check_role:admin,editor');

    }

    public function getStatistic(Request $request){
        $type = $request->type;

        if($type == 'product'){
            $statistic = $this->getProductStatistic($request);
        }
        elseif($type == 'general'){
            $statistic = $this->getGeneralStatistic($request);
        }

        if(!empty($statistic)){
            return response()->json(['statistic' => $statistic], 200);
        }
    }

    private function getProductStatistic($request){

        //period dates
        $start_date = new Carbon($request->start_date);
        $end_date =  date('Y-m-d', strtotime($request->end_date. ' + 1 days'));
        $end_date = new Carbon($end_date);

        //days in period
        $days = $start_date->diff($end_date)->days;

        $product = Product::find($request->product_id);

        //order items of a given product in period
        $orderItems = $product->orderItems()->whereBetween('created_at', [$start_date, $end_date]);

        //how much times the product was ordered in given period
        $ordersPlaced = $orderItems->count();

        //how much products where ordered in a given period
        $itemsPurchased = $orderItems->sum('product_quantity');

        //total cost of all ordered products in a period
        $grossSales = $orderItems->sum('product_total');
        $grossSalesDaily = round($grossSales / $days, 2);

        //total cost of all ordered products in a period without taxes and other expenses included
        $netSales = $orderItems->sum('product_total');
        $netSalesDaily = round($netSales / $days, 2);

        $statistic = compact('ordersPlaced', 'itemsPurchased', 'grossSales', 'grossSalesDaily', 'netSales', 'netSalesDaily');

        return $statistic;
    }

    private function getGeneralStatistic(Request $request){

        //period dates
        $start_date = new Carbon($request->start_date);
        $end_date =  date('Y-m-d', strtotime($request->end_date. ' + 1 days'));
        $end_date = new Carbon($end_date);

        //days in period
        $days = $start_date->diff($end_date)->days;

        //orders in period
        $orders = Order::whereBetween('created_at', [$start_date, $end_date]);

        //orders quantity in period
        $ordersPlaced = $orders->count();

        //how much products where ordered in a given period
        $itemsPurchased = OrderItem::whereBetween('created_at', [$start_date, $end_date])->sum('product_quantity');

        //total cost of all ordered products in a period
        $grossSales = $orders->sum('total');
        $grossSalesDaily = round($grossSales / $days, 2);

        //total cost of all ordered products in a period without taxes and other expenses included
        //TODO subtract shipping cost; include discounts???
        $netSales = $orders->sum('total');
        $netSalesDaily = round($netSales / $days, 2);

        //TODO add relations with coupons to orders, order_items...
        $couponsWorth = $orders->sum('coupon_discount');
        $giftcardWorth= $orders->sum('giftcard_discount');

        //Statistic in a table format
        $productsList = Product::all();

        foreach ($productsList as $key => $product){

            $order_items = OrderItem::whereBetween('created_at', array($start_date, $end_date))
                ->whereHas('product', function($query) use ($product){

                    $query->where('id', 'like', "%{$product->id}%");

                })->get();

            if($order_items->isEmpty()){

                $productsList = $productsList->forget($key);

            }
            else{

                $product_sold = 0;
                $product_total = 0;

                foreach ($order_items as $item){

                    $product_sold += $item->product_quantity;
                    $product_total += $item->product_total;

                }

                $product['sold_quantity'] = $product_sold;
                $product['sold_total'] = $product_total;

                $product->load('producent');

            }

        }

        $productsList = $productsList->values();

        $statistic = compact('ordersPlaced', 'itemsPurchased', 'grossSales', 'grossSalesDaily', 'netSales', 'netSalesDaily', 'couponsWorth', 'giftcardWorth', 'productsList');

        return $statistic;

    }

    //download csv with statistic data
    public function downloadStatisticCsv(Request $request){

        $headers = [

            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=statistic.csv',
            'Expires'             => '0',
            'Pragma'              => 'public'

        ];

        $from = $request->from;
        $to = date('Y-m-d', strtotime($request->to. ' + 1 days'));
        $producent_id = $request->producent_id;
        $product_id = $request->product_id;

        $orderItems = new OrderItem();

        if (!empty($from) && !empty($to)){

            $orderItems = $orderItems->where('created_at', '>=', $from)->where('created_at', '<=', $to);

        }

        if (!empty($producent_id)){

            $orderItems = $orderItems->whereHas('product.producent', function($query) use ($producent_id){
                $query->where('producent_id', $producent_id);
            });

        }

        if (!empty($product_id)){

            $orderItems = $orderItems->where('product_id', $product_id);

        }

        $orderItems = $orderItems->with(

            ['order' => function ($query) {
                $query->select('id', 'user_id', 'order_status_id', 'customer_name', 'customer_surname', 'customer_email', 'customer_phone', 'coupon_code', 'giftcard_code', 'shipping_method_id', 'address_one', 'address_two', 'city', 'country', 'zip_code');
            },

            'order.status' => function ($query) {
                $query->select('id', 'title');
            },
            'product' => function ($query) {
                $query->select('id', 'title', 'company_price', 'producent_id', 'properties');
            },
            'product.promotion',
            'product.attributes',
            'product.attributes.filter',
            'product.producent' => function ($query) {
                $query->select('id', 'title');
            },
            'order.user' => function ($query) {
                $query->select('id', 'name', 'phone_number');
            },
            'vouchers' => function ($query) {
                $query->select('id', 'order_item_id', 'voucher_code', 'activation_code', 'end_date');
            },
            'order.shippingMethod' => function ($query) {
                $query->select('id', 'name', 'cost');
            }]
            )->get();

        $callback = function() use ($orderItems) {

            $FH = fopen('php://output', 'w');

            $column_names = [
                'STATUS',
                'DATUM PORUDZBINE',
                'BROJ PORUDZBINE',
                'Kod vaučera',
                'BROJ REZERVACIJE',
                'DATUM ISTEKA',
                'NAZIV PONUDE',
                'IME',
                'PREZIME',
                'EMAIL',
                'TELEFON',
                'ADRESA',
                'GRAD',
                'LOKACIJA',
                'CENA PROIZVODA',
                'PRODAJNA CENA',
                'KUPONI',
                'COUPON DISCOUNT',
                'GIFTCARD',
                'GIFTCARD DISCOUNT',
                'PROMOCIJA',
                'PROMOTION DISCOUNT',
                'IZNOS',
                'CENA PARTNER',
                'PARTNER',
                'VRSTA POSILJKE',
                'CENA POSILJKE',
                'MARGIN',
                'PROFIT'
                ];

            fputcsv($FH, $column_names);

            foreach ($orderItems as $item) {

                $row = [];

            /*
             * One row structure
             */

                //order status title
                array_push($row, $item->order->status->title);
                //creation date
                array_push($row, $item->created_at->format('d/m/Y'));
                //order_id
                array_push($row, $item->order->id);

                $vouchers = $item->vouchers;                //voucher codes
                array_push($row, $vouchers->implode('voucher_code', "\n"));
                //voucher activation codes
                array_push($row, $vouchers->implode('activation_code', "\n"));
                //Vouchers end dates (DATUM ISTEKA)
                array_push($row, $vouchers->implode('end_date', "\n"));
                //product title
                array_push($row, $item->product->title);
                //customer name
                array_push($row, $item->order->customer_name);
                //customer surname
                array_push($row, $item->order->customer_surname);
                //customer email
                array_push($row, $item->order->customer_email);
                //customer phone
                array_push($row, $item->order->customer_phone);
                //order address
                $address = $item->order->address_one . ' ' . $item->order->address_two . ' ' . $item->order->country . ' ' . $item->order->city . ' ' . $item->order->zip_code;
                array_push($row, $address);
                //city (GRAD)
                $attribute = $item->product->attributes->where('filter.slug', 'location')->first();
                if(!empty($attribute)){
                    array_push($row, $attribute->name);
                }
                else{
                    array_push($row, '');
                }
                //location (LOKACIJA)
                $properties = json_decode($item->product->properties);
                array_push($row, $properties->location);
                //product price (CENA PROiZVODA)
                array_push($row, $item->product_total);
                //product total price - promotion discount
                array_push($row, $item->product_total - $item->promotion_discount);
                //coupon_code
                array_push($row, $item->order->coupon_code);
                //coupon discount
                array_push($row, $item->coupon_discount);
                //giftcard_code
                array_push($row, $item->order->giftcard_code);
                //giftcard discount
                array_push($row, $item->gift_card_discount);
                //promotion
                if (!empty($item->product->promotion)){
                    //product promotion title
                    array_push($row, $item->product->promotion->title);
//                    //product promotion discount value
//                    array_push($row, $item->product->promotion->value);
//                    //product promotion is fixed ?
//                    array_push($row, $item->product->promotion->is_fixed_price);
                }
                else{
                    array_push($row, "");
//                    array_push($row, "");
//                    array_push($row, "");
                }
                //giftcard discount
                array_push($row, $item->promotion_discount);
                //total discount (IZNOS)
                array_push($row, $item->promotion_discount + $item->coupon_discount + $item->gift_card_discount);
                //product company price
                array_push($row, $item->product->company_price);
                //producent title
                array_push($row, $item->product->producent->title);
                //shipping method name
                array_push($row, $item->order->shippingMethod->name);
                //shipping method cost
                array_push($row, $item->order->shippingMethod->cost);
                //margin (product_total - product company price  * quantity)
                $margin = $item->product_total - ($item->product->company_price * $item->product_quantity);
                array_push($row, round($margin, 2));
                //profit (margin - shipping_price)
                $profit = $margin - ($item->order->shippingMethod->cost / count($orderItems));
                array_push($row, $profit);

                fputcsv($FH, $row);

            }
//        return response()->json($statistic);
            fclose($FH);
        };

        return Response::stream($callback, 200, $headers);

    }
}
