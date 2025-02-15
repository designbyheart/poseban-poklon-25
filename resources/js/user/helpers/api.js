export const API = {
    user: {
        editProfile: "/profile/edit"
    },
    address: {
        create: "/addresses",
        update: "/addresses/",
        delete: "/addresses/"
    },
    newsletterSubscription: {
        status: "/subscriptions/status",
        create: "/subscriptions",
        delete: "/subscriptions",
        remove: "/subscriptions/remove"
    },
    product: {
        list: "/products/list",
        show: "/pokloni/"
    },
    review: {
        create: "/reviews"
    },
    category: {
        list: "/categories/list",
        show: "/kategorije/",
        vip: "/kategorije/vip",
        new: "/kategorije/novi",
        promo: "/kategorije/promo"
    },
    filter: {
        list: "/filters/list"
    },
    paymentMethod: {
        list: "/payment_methods/list"
    },
    shippingMethod: {
        list: "/shipping_methods/list"
    },
    order: {
        calculate: "/orders/calculate",
        create: "/orders",
        success: "/orders/success"
    },
    coupon: {
        validate: "/coupons/validate"
    },
    giftCard: {
        validate: "/gift_cards/validate"
    },
    page: {
        list: "/pages/list"
    },
    resources: {
        defaultImages: {
            product: "/images/default/product/posebanpoklon_product.jpg"
        }
    },
    wishlist: {
        update: "/wishlists/"
    }
};
