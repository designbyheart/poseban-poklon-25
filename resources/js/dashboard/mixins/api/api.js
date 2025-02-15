export const API = {

        product: {

            list: '/dashboard/products/list',
            single: '/dashboard/products/load',
            create: '/dashboard/products',
            update: '/dashboard/products',
            delete: '/dashboard/products',
            show: '/products/'

        },
        producent: {

            list: '/dashboard/producents/list',
            single: '/dashboard/producents/load',
            create: '/dashboard/producents',
            update: '/dashboard/producents',
            delete: '/dashboard/producents'

        },
        filter: {

            list: '/dashboard/filters/list',
            single: '/dashboard/filters/load',
            create: '/dashboard/filters',
            update: '/dashboard/filters',
            delete: '/dashboard/filters'

        },
        attribute: {

            list: '/dashboard/attributes/list',
            single: '/dashboard/attributes/load',
            create: '/dashboard/attributes',
            update: '/dashboard/attributes',
            delete: '/dashboard/attributes'

        },
        category: {

            list: '/dashboard/categories/list',
            single: '/dashboard/categories/load',
            create: '/dashboard/categories',
            update: '/dashboard/categories',
            delete: '/dashboard/categories'

        },
        image: {

            list: '/images/list',
            create: '/dashboard/images',
            update: '/dashboard/images',
            delete: '/dashboard/images'

        },
        banner: {

            list: '/dashboard/banners/list',
            single: '/dashboard/banners/load',
            create: '/dashboard/banners',
            update: '/dashboard/banners',
            delete: '/dashboard/banners'

        },
        coupon: {

            list: '/dashboard/coupons/list',
            single: '/dashboard/coupons/load',
            create: '/dashboard/coupons',
            update: '/dashboard/coupons',
            delete: '/dashboard/coupons'

        },
        shippingMethod: {
            list: '/dashboard/shipping_methods/list',
            single: '/dashboard/shipping_methods/load',
            create: '/dashboard/shipping_methods',
            update: '/dashboard/shipping_methods',
            delete: '/dashboard/shipping_methods'
        },
        paymentMethod: {
            list: '/dashboard/payment_methods/list',
            single: '/dashboard/payment_methods/load',
            create: '/dashboard/payment_methods',
            update: '/dashboard/payment_methods',
            delete: '/dashboard/payment_methods'
        },
        promotion: {
            list: '/dashboard/promotions/list',
            single: '/dashboard/promotions/load',
            create: '/dashboard/promotions',
            update: '/dashboard/promotions',
            delete: '/dashboard/promotions'
        },
        bundle: {
            list: '/dashboard/bundles/list',
            single: '/dashboard/bundles/load',
            create: '/dashboard/bundles',
            update: '/dashboard/bundles',
            delete: '/dashboard/bundles'
        },
        voucher: {
            generate: '/dashboard/vouchers/generate',
            print: '/dashboard/vouchers/print',
            list: '/dashboard/vouchers/list',
            single: '/dashboard/vouchers/load',
            send: '/dashboard/vouchers/resend',
            activate: '/vouchers/activate',
            deactivate: '/dashboard/vouchers/deactivate',
            create: '/dashboard/vouchers',
            update: '/dashboard/vouchers',
            delete: '/dashboard/vouchers'
        },
        giftCard: {
            list: '/dashboard/gift_cards/list',
            single: '/dashboard/gift_cards/load',
            create: '/dashboard/gift_cards',
            update: '/dashboard/gift_cards',
            delete: '/dashboard/gift_cards'
        },
        currency: {
            list: '/dashboard/currencies/list',
            single: '/dashboard/currencies/load',
            create: '/dashboard/currencies',
            update: '/dashboard/currencies',
            delete: '/dashboard/currencies'
        },
        rate: {
            create: '/dashboard/rates',
            update:'/dashboard/rates',
            delete: '/dashboard/rates'
        },
        order: {
            list: '/dashboard/orders/list',
            single: '/dashboard/orders/load',
            create: '/dashboard/orders',
            update: '/dashboard/orders',
            delete: '/dashboard/orders'
        },
        orderItem: {
            create: '/dashboard/order_items',
            update: '/dashboard/order_items',
            delete: '/dashboard/order_items'
        },
        orderStatus: {
            list: '/dashboard/order_statuses/list'
        },
        review: {
            list: '/dashboard/reviews/list',
            approve: '/dashboard/reviews/approve',
            delete: '/dashboard/reviews'
        },
        page: {
            list: '/dashboard/pages/list',
            show: '/',
            single: '/dashboard/pages/load',
            create: '/dashboard/pages',
            update: '/dashboard/pages',
            delete: '/dashboard/pages'
        },
        setting: {
            list: '/dashboard/settings/list',
            update: '/dashboard/settings/update'
        },
        user: {
            list: '/dashboard/users/list',
            changeRole: '/dashboard/users/role/change',
            changeStatus: '/dashboard/users/status/change',
            delete: '/dashboard/users'
        },
        builderLayout: {
            list: '/dashboard/builder_layouts/list',
            single: '/dashboard/builder_layouts/load',
            create: '/dashboard/builder_layouts',
            update: '/dashboard/builder_layouts'
        },
        newsletterSubscription: {
            list: '/dashboard/subscriptions/list',
            delete: '/dashboard/subscriptions'
        }

}