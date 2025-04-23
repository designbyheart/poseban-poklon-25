<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    return "Cache is cleared";
});*/

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\EmailController;

//Route::get('/email-test', [EmailController::class, 'testVoucher']);
//Route::post('/vouchers/send', 'VoucherController@sendCustomerEmail');

Route::get('/', 'HomeController@index')->name('home');

Route::get('fiscal/{id}', 'EmailController@fiscal');

Auth::routes();

Route::get('/dashboard', 'DashboardController@index')->name('dashboard');

Route::get('/kontaktiraj-nas', 'PageController@contactPage')->name('contact');

Route::get('/postani-nas-partner', 'PageController@contactCompany')->name('contact_company');


// Test route for voucher generation
Route::get('/test/generate-vouchers/{orderId}','OrderController@testVoucherGeneration');


//Sitemap
Route::get('/sitemap.xml', 'SitemapController@index');


//Successful payment
Route::get('/payment/success', 'OrderController@paymentSuccess');
Route::post('/payment/success', 'OrderController@paymentSuccess');
//Unsuccessful payment
Route::post('/payment/fail', 'OrderController@paymentFail');
Route::get('/payment/fail', 'OrderController@paymentFail');

Route::get('/emails', 'EmailController@index');
Route::get('/send-voucher/{id}', 'EmailController@sendVoucher');

/**
 * User
 */

//Receive products from wishlist with pagination
Route::get('/wishlist/list', [
    'uses' => 'WishlistController@indexData'
]);

//Remove products from wishlist (uses array with products id`s)
Route::post('/wishlists/{wishlist}/remove', [
    'uses' => 'WishlistController@removeFromWishlist'
]);

/**
 * Edit user data
 */
Route::get('/profile/edit', [
    'uses' => 'UserController@edit',
    'as' => 'user.edit'
]);

Route::put('/profile/edit', [
    'uses' => 'UserController@update',
    'as' => 'user.update'
]);

/**
 * User newsletter subscription control
 */
Route::get('/profile/subscription', [
    'uses' => 'UserController@editSubscription',
    'as' => 'user.editSubscription'
]);

/**
 * User orders history
 */
Route::get('/profile/orders', [
    'uses' => 'OrderController@ordersHistory',
    'as' => 'order.history'
]);

/**
 * User shipping details
 */
Route::get('/profile/shipping', [
    'uses' => 'AddressController@indexAddresses',
    'as' => 'address.indexAddresses'
]);

/**
 * User orders history
 */
Route::get('/profile/wishlist', [
    'uses' => 'WishlistController@show',
    'as' => 'user.wishlist'
]);

/**
 * User send contact form
 */
Route::post('/contact/send', 'ContactController@sendContact');

/**
 * Profile
 */
Route::get('/profile/{user}', [
    'uses' => 'UserController@profile',
    'as' => 'user.profile'
]);

/**
 * Products
 */
//Receive products list with pagination
Route::get('/products/list', [
    'uses' => 'ProductController@publicIndexData'
]);

Route::get('/pokloni/{slug}', [
    'uses' => 'ProductController@show',
    'as' => 'products.show'
]);

/**
 * Orders
 */
//Receive orders list with pagination for current user
Route::get('/orders/list', [
    'uses' => 'OrderController@publicIndexData',
    'as' => 'order.publicIndexData'
]);

Route::post('/orders/calculate', [
    'uses' => 'OrderController@calculate',
    'as' => 'order.calculate'
]);

Route::get('/orders/success', [
    'uses' => 'OrderController@orderSuccess',
    'as' => 'order.success'
]);

/**
 * Order statuses
 */
//Receive order statuses list with pagination
Route::get('/order/statuses/list', [
    'uses' => 'OrderStatusController@publicIndexData',
    'as' => 'order_status.publicIndexData'
]);

/**
 * Dialogs
 */
//Receive dialogs list for index view with pagination
Route::get('/dialogs/list', [
    'uses' => 'DialogController@indexData',
    'as' => 'dialog.indexData'
]);

/**
 * Categories
 */
//Receive filter of a given categories with connected attributes
Route::post('/categories/filter', [
    'uses' => 'CategoryController@getFilters',
    'as' => 'categories.filter'
]);

//Categories public index page
Route::get('/kategorije', [
    'uses' => 'CategoryController@publicIndex',
    'as' => 'categories.index'
]);

Route::get('/kategorije/{slug}', [
    'uses' => 'CategoryController@show',
    'as' => 'categories.show'
]);

/**
 * Pages
 */
Route::get('/pages/list', [
    'uses' => 'PageController@publicIndexData',
    'as' => 'page.publicIndexData'
]);

/**
 * Checkout
 */
Route::get('/checkout', [
    'uses' => 'CartController@checkout',
    'as' => 'checkout'
]);


/**
 * Images
 */
Route::get('/user/images', [
    'uses' => 'ImageController@index',
    'as' => 'user.images'
]);

//Receive user images list for index view with pagination
Route::get('/images/list', [
    'uses' => 'ImageController@indexData',
    'as' => 'image.indexData'
]);

Route::post('/products/filter-by-attributes', [
    'uses' => 'ProductController@filterByAttributes',
    'as' => 'products.filterByAttributes'
]);

Route::resource('producents', 'ProducentController')->only(['index', 'show']);
Route::resource('products', 'ProductController')->only('index');
//    Route::resource('categories', 'CategoryController')->only('show');
Route::resource('filter', 'FilterController')->only('index', 'show');
Route::resource('dialogs', 'DialogController')->only('index', 'show', 'store');
Route::resource('messages', 'MessageController')->only('store');
Route::resource('wishlists', 'WishlistController')->only('show', 'update');
Route::resource('orders', 'OrderController')->only('create', 'store');
Route::resource('reviews', 'ReviewController')->only('create', 'store');
Route::resource('addresses', 'AddressController')->only('store', 'update', 'destroy');
Route::resource('subscriptions', 'NewsletterSubscriptionController')->only('store');

//Get the user newsletter subscription status
Route::get('/subscriptions/status', 'NewsletterSubscriptionController@getSubscriptionStatus');

//Remove the user newsletter subscription
Route::post('/subscriptions/remove', 'NewsletterSubscriptionController@removeUserSubscription');


Route::resource('posts', 'PostController')->only(['index', 'show']);
Route::resource('post_categories', 'PostCategoryController')->only(['show']);

//Activate voucher using activation code
Route::post('/vouchers/activate', [
    'uses' => 'VoucherController@activateVoucher',
    'as' => 'voucher.activate'
]);

//Get payment methods list
Route::get('/payment_methods/list', [
    'uses' => 'PaymentMethodController@publicIndexData'
]);

//Get shipping methods list
Route::get('/shipping_methods/list', [
    'uses' => 'ShippingMethodController@publicIndexData'
]);

/**
 * Likes
 */
/**
 * Products
 */
Route::post('/products/like/{product}', [
    'uses' => 'LikeController@likeProduct',
    'as' => 'product.like'
]);

Route::post('/products/dislike/{product}', [
    'uses' => 'LikeController@dislikeProduct',
    'as' => 'product.dislike'
]);

/**
 * Posts
 */
Route::post('/posts/like/{post}', [
    'uses' => 'LikeController@likePost',
    'as' => 'post.like'
]);

Route::post('/posts/dislike/{post}', [
    'uses' => 'LikeController@dislikePost',
    'as' => 'post.dislike'
]);

//Validate a coupon
Route::post('/coupons/validate', [
    'uses' => 'CouponController@validateCoupon',
    'as' => 'coupon.validate'
]);

//Validate a giftCard
Route::post('/gift-card/validate', [
    'uses' => 'GiftCardController@validateGiftCard'
]);

//Get filter with attributes for category page
Route::get('/filters/list', 'FilterController@publicIndexData');

/**
 * Dashboard
 */
Route::group(['prefix' => '/dashboard', 'as' => 'dashboard.'], function () {

    /**
     * Download users csv file
     */
    Route::post('/users/download', [
        'uses' => 'UserController@download',
        'as' => 'user.download'
    ]);

    /**
     * Download users csv file
     */
    Route::post('/subscriptions/download', [
        'uses' => 'NewsletterSubscriptionController@download',
        'as' => 'email.download'
    ]);

    /**
     * Download order items statistic csv file
     */
    Route::post('/order-items/download', [
        'uses' => 'StatisticController@downloadStatisticCsv',
        'as' => 'order-items.download'
    ]);

    /**
     * Statistic
     */



    Route::get('statistic/get', [
        'uses' => 'StatisticController@getStatistic'
    ]);

    /** USERS */
    //change user role
    Route::post('/users/role/change', [
        'uses' => 'UserController@changeRole',
        'as' => 'role.change'
    ]);

    //Change user status
    Route::post('/users/status/change', [
        'uses' => 'UserController@changeStatus',
        'as' => 'user.status.change'
    ]);

    /** PRODUCTS */
    //Receive products list with pagination
    Route::get('/products/list', [
        'uses' => 'ProductController@indexData'
    ]);

    /** ORDERS */
    // Update order status ['order_id', 'status_id']
    Route::post('/order/status/update', [
        'uses' => 'OrderController@updateOrderStatus',
        'as' => 'order.status.update'
    ]);

    //Approve dispatch
    Route::post('/dispatch/approve', [
        'uses' => 'DispatchController@approveDispatch',
        'as' => 'dispatch.approve'
    ]);

    //Receive users list with pagination
    Route::get('/users/list', [
        'uses' => 'UserController@indexData',
        'as' => 'user.indexData'
    ]);

    //Receive filter list for index view with pagination (Admin)
    Route::get('/filters/list', [
        'uses' => 'FilterController@indexData',
        'as' => 'filter.indexData'
    ]);

    //Receive producents list for index view with pagination
    Route::get('/producents/list', [
        'uses' => 'ProducentController@indexData',
        'as' => 'producent.indexData'
    ]);

    //Receive categories list for index view with pagination
    Route::get('/categories/list', [
        'uses' => 'CategoryController@indexData',
        'as' => 'category.indexData'
    ]);

    //Receive banners list with pagination
    Route::get('/banners/list', [
        'uses' => 'BannerController@indexData',
        'as' => 'banner.indexData'
    ]);

    //Receive posts list for index view with pagination
    Route::get('/posts/list', [
        'uses' => 'PostController@indexData',
        'as' => 'post.indexData'
    ]);

    //Receive post_categories list for index view with pagination
    Route::get('/post_categories/list', [
        'uses' => 'PostCategoryController@indexData',
        'as' => 'post_category.indexData'
    ]);

    //Receive pages list for index view with pagination
    Route::get('/pages/list', [
        'uses' => 'PageController@indexData',
        'as' => 'page.indexData'
    ]);

    //Receive settings list for index view with pagination
    Route::get('/settings/list', [
        'uses' => 'SettingController@indexData'
    ]);

    // Receive orders list with pagination
    Route::get('/orders/list', [
        'uses' => 'OrderController@indexData',
        'as' => 'order.indexData'
    ]);

    //Receive order statuses list with pagination
    Route::get('/order_statuses/list', [
        'uses' => 'OrderStatusController@indexData',
        'as' => 'order_status.indexData'
    ]);

    //Receive coupons list for index view with pagination
    Route::get('/coupons/list', [
        'uses' => 'CouponController@indexData'
    ]);

    //Receive promotions list for index view with pagination
    Route::get('/promotions/list', [
        'uses' => 'PromotionController@indexData'
    ]);

    //Receive vouchers list for index view with pagination
    Route::get('/vouchers/list', [
        'uses' => 'VoucherController@indexData'
    ]);

    //Receive shipping methods list for index view with pagination
    Route::get('/shipping_methods/list', [
        'uses' => 'ShippingMethodController@indexData'
    ]);

    //Receive payment methods list for index view with pagination
    Route::get('/payment_methods/list', [
        'uses' => 'PaymentMethodController@indexData'
    ]);

    //Receive gift cards list for index view with pagination
    Route::get('/gift_cards/list', [
        'uses' => 'GiftCardController@indexData'
    ]);

    //Receive options list for index view with pagination
    Route::get('/options/list', [
        'uses' => 'OptionController@indexData'
    ]);

    //Receive option_values list for index view with pagination
    Route::get('/option_values/list', [
        'uses' => 'OptionValueController@indexData'
    ]);

    //Receive bundles list for index view with pagination
    Route::get('/bundles/list', [
        'uses' => 'BundleController@indexData'
    ]);

    //Receive bundles list for index view with pagination
    Route::get('/currencies/list', [
        'uses' => 'CurrencyController@indexData'
    ]);

    //Receive stocks list for index view with pagination
    Route::get('/stocks/list', [
        'uses' => 'StockController@indexData'
    ]);

    //Receive reviews list for index view with pagination
    Route::get('/reviews/list', [
        'uses' => 'ReviewController@indexData'
    ]);

    //Receive layouts list with pagination
    Route::get('/builder_layouts/list', [
        'uses' => 'BuilderLayoutController@indexData'
    ]);

    //Receive newsletter subscriptions list with pagination
    Route::get('/subscriptions/list', [
        'uses' => 'NewsletterSubscriptionController@indexData'
    ]);


    /**
     * Vouchers
     */
    //Generate a PDF Voucher
    Route::post('/vouchers/generate', [
        'uses' => 'VoucherController@generateVouchers',
        'as' => 'vouchers.generate'
    ]);

    //Send an email with vouchers
    Route::post('/vouchers/send', 'VoucherController@sendCustomerEmail');

    //Send an email with an updated voucher
    Route::post('/vouchers/resend', 'VoucherController@resendVoucher');

    //Print a voucher
    Route::get('/vouchers/print/{voucher}', [
        'uses' => 'VoucherController@printVoucher',
        'as' => 'voucher.print'
    ]);

    //Deactivate a voucher
    Route::post('/vouchers/deactivate', [
        'uses' => 'VoucherController@deactivateVoucher',
        'as' => 'vouchers.deactivate'
    ]);

    /**
     * Reviews
     */
    //Approve review(set status to 1) @param $review_id
    Route::post('/reviews/approve', 'ReviewController@approveReview');


    /**
     * Attributes
     */
    //Receive attributes list for index view with pagination
    Route::get('/attributes/list', [
        'uses' => 'AttributeController@indexData'
    ]);

    //Get a single category for editing
    Route::get('/categories/load', 'CategoryController@getSingleCategory');

    //Get a single filter for editing
    Route::get('/filters/load', 'FilterController@getSingleFilter');

    //        //Get a single attribute for editing
    //        Route::get('/attributes/load', 'AttributeController@getSingleAttribute');

    //Get a single shipping method for editing
    Route::get('/shipping_methods/load', 'ShippingMethodController@getSingleItem');

    //Get a single payment method for editing
    Route::get('/payment_methods/load', 'PaymentMethodController@getSingleItem');

    //Get a single producent for editing
    Route::get('/producents/load', 'ProducentController@getSingleItem');

    //Get a single banner for editing
    Route::get('/banners/load', 'BannerController@getSingleItem');

    //Get a single attribute for editing
    Route::get('/attributes/load', 'AttributeController@getSingleItem');

    //Get a single option for editing
    Route::get('/options/load', 'OptionController@getSingleItem');

    //Get a single option value for editing
    Route::get('/option_values/load', 'OptionValueController@getSingleItem');

    //Get a single bundle for editing
    Route::get('/bundles/load', 'BundleController@getSingleItem');

    //Get a single setting for editing
    Route::get('/settings/load', 'SettingController@getSingleItem');

    //Get a single order for editing
    Route::get('/orders/load', 'OrderController@getSingleItem');

    //Get a single voucher for editing
    Route::get('/vouchers/load', 'VoucherController@getSingleItem');

    //Get a currency with rates for editing
    Route::get('/currencies/load', 'CurrencyController@getSingleItem');

    //Get a single stock for editing
    Route::get('/stocks/load', 'StockController@getSingleItem');

    //Get a single rate
    Route::get('/rates/load', 'RateController@getSingleItem');

    //Get a single coupon
    Route::get('/coupons/load', 'CouponController@getSingleItem');

    //Get a single promotion
    Route::get('/promotions/load', 'PromotionController@getSingleItem');

    //Get a single gift card
    Route::get('/gift_cards/load', 'GiftCardController@getSingleItem');

    //Get a single page
    Route::get('/pages/load', 'PageController@getSingleItem');

    //Get a single builder layout
    Route::get('/builder_layouts/load', 'BuilderLayoutController@getSingleItem');

    //Update multiple settings at once
    Route::put('/settings/update', 'SettingController@updateMultiple');

    //Edit a builder layout
    Route::get('/builder_layouts/{param}', [
        'uses' => 'BuilderLayoutController@edit'
    ]);

    //Update a builder layout
    Route::put('/builder_layouts', 'BuilderLayoutController@update');

    Route::resources([
        'producents' => 'ProducentController',
        'categories' => 'CategoryController',
        'filters' => 'FilterController',
        'posts' => 'PostController',
        'post_categories' => 'PostCategoryController',
        'pages' => 'PageController',
        'settings' => 'SettingController',
        'dialogs' => 'DialogController',
        'messages' => 'MessageController',
        'attributes' => 'AttributeController',
        'banners' => 'BannerController',
        'orders' => 'OrderController',
        'coupons' => 'CouponController',
        'promotions' => 'PromotionController',
        'vouchers' => 'VoucherController',
        'order_items' => 'OrderItemController',
        'options' => 'OptionController',
        'option_values' => 'OptionValueController',
        'versions' => 'VersionController',
        'reviews' => 'ReviewController',
        'shipping_methods' => 'ShippingMethodController',
        'payment_methods' => 'PaymentMethodController',
        'gift_cards' => 'GiftCardController',
        'currencies' => 'CurrencyController',
        'rates' => 'RateController',
        'stocks' => 'StockController',
        'stock_items' => 'StockItemController',
        'builder_layouts' => 'BuilderLayoutController',
        'subscriptions' => 'NewsletterSubscriptionController',
    ]);

    //Delete a newsletter subscription
    Route::delete('/subscriptions/{param}', 'NewsletterSubscriptionController@destroy');

    Route::get('/products/load', 'ProductController@getSingleProduct');

    Route::get('/products', 'DashboardController@index');

    Route::resource('products', 'ProductController')->except(['index']);

    Route::resource('users', 'UserController')->only(['index', 'show', 'destroy']);

    Route::resource('images', 'ImageController');
});

//Card page
Route::get('/card', function () {
    return view('user.cardTest');
});

//Pages
Route::get('/{page_slug}', [
    'uses' => 'PageController@show',
    'as' => 'page.show'
]);


Route::post('/send-email', [EmailController::class, 'sendTransactionalEmail']);

Route::get('/login', [LoginController::class, 'login'])->name('login');

// Test route for voucher emails
Route::get('/test/voucher-email/{orderId}', function ($orderId) {
    $order = \App\Order::find($orderId);

    if (!$order) {
        return response()->json(['error' => 'Order not found'], 404);
    }

    // Generate vouchers if not already done
    if ($order->vouchers->isEmpty()) {
        $order->generateVouchers();
    }

    // Dispatch voucher email job immediately (bypassing the delay)
    \App\Jobs\SendVoucherEmail::dispatch($order->id);

    return response()->json([
        'message' => 'Voucher email dispatched for order ' . $order->id,
        'customer_email' => $order->customer_email
    ]);
});
