/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import { AclRule } from 'vue-acl'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [

      {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
        path: '/dashboard',
        component: () => import('./layouts/main/Main.vue'),
        children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
        {
            path: '',
            name: 'dashboard',
            component: () => import('./views/Dashboard.vue'),
            meta: {
                title: 'routes.dashboard.title',
                description: 'routes.dashboard.description',
                rule: 'editor'
            }
        },
        {
            path: 'products',
            name: 'products',
            component: () => import('./views/products/Products.vue'),
            meta: {
                title: 'routes.product.index.title',
                description: 'routes.product.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'products/create',
            name: 'products_create',
            component: () => import('./views/products/Form.vue'),
            meta: {
                title: 'routes.product.create.title',
                description: 'routes.product.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'products/:productId/edit',
            name: 'products_edit',
            component: () => import('./views/products/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.product.edit.title',
                description: 'routes.product.edit.description',
                rule: 'editor'
            }
        },
        {
            path: 'categories',
            name: 'categories',
            component: () => import('./views/categories/Categories.vue'),
            meta: {
                title: 'routes.category.index.title',
                description: 'routes.category.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'categories/create',
            name: 'categories_create',
            component: () => import('./views/categories/Form.vue'),
            meta: {
                title: 'routes.category.create.title',
                description: 'routes.category.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'categories/:categoryId/edit',
            name: 'categories_edit',
            component: () => import('./views/categories/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.category.edit.title',
                description: 'routes.category.edit.description',
                rule: 'editor'
            }
        },
        {
            path: 'filters',
            name: 'filters',
            component: () => import('./views/filters/Filters.vue'),
            meta: {
                title: 'routes.filter.index.title',
                description: 'routes.filter.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'filters/create',
            name: 'filters_create',
            component: () => import('./views/filters/Form.vue'),
            meta: {
                title: 'routes.filter.create.title',
                description: 'routes.filter.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'filters/:filterId/edit',
            name: 'filters_edit',
            component: () => import('./views/filters/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.filter.edit.title',
                description: 'routes.filter.edit.description',
                rule: 'editor'
            }
        },
        {
            path: 'attributes',
            name: 'attributes',
            component: () => import('./views/attributes/Attributes.vue'),
            meta: {
                title: 'routes.attribute.index.title',
                description: 'routes.attribute.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'attributes/create',
            name: 'attributes_create',
            component: () => import('./views/attributes/Form.vue'),
            meta: {
                title: 'routes.attribute.create.title',
                description: 'routes.attribute.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'attributes/:attributeId/edit',
            name: 'attributes_edit',
            component: () => import('./views/attributes/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.attribute.edit.title',
                description: 'routes.attribute.edit.description',
                rule: 'editor'
            }
        },
        //Shipping methods
        {
            path: 'shipping_methods',
            name: 'shipping_methods',
            component: () => import('./views/shipping/ShippingMethods.vue'),
            meta: {
                title: 'routes.shippingMethod.index.title',
                description: 'routes.shippingMethod.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'shipping_methods/create',
            name: 'shipping_methods_create',
            component: () => import('./views/shipping/Form.vue'),
            meta: {
                title: 'routes.shippingMethod.create.title',
                description: 'routes.shippingMethod.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'shipping_methods/:id/edit',
            name: 'shipping_methods_edit',
            component: () => import('./views/shipping/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.shippingMethod.edit.title',
                description: 'routes.shippingMethod.edit.description',
                rule: 'editor'
            }
        },
        //Payment methods
        {
            path: 'payment_methods',
            name: 'payment_methods',
            component: () => import('./views/payment/PaymentMethods.vue'),
            meta: {
                title: 'routes.paymentMethod.index.title',
                description: 'routes.paymentMethod.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'payment_methods/create',
            name: 'payment_methods_create',
            component: () => import('./views/payment/Form.vue'),
            meta: {
                title: 'routes.paymentMethod.create.title',
                description: 'routes.paymentMethod.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'payment_methods/:id/edit',
            name: 'payment_methods_edit',
            component: () => import('./views/payment/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.paymentMethod.edit.title',
                description: 'routes.paymentMethod.edit.description',
                rule: 'editor'
            }
        },
        //Producents
        {
            path: 'producents',
            name: 'producents',
            component: () => import('./views/producent/Producents.vue'),
            meta: {
                title: 'routes.producent.index.title',
                description: 'routes.producent.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'producents/create',
            name: 'producents_create',
            component: () => import('./views/producent/Form.vue'),
            meta: {
                title: 'routes.producent.create.title',
                description: 'routes.producent.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'producents/:id/edit',
            name: 'producents_edit',
            component: () => import('./views/producent/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.producent.edit.title',
                description: 'routes.producent.edit.description',
                rule: 'editor'
            }
        },
        //Banners
        {
            path: 'banners',
            name: 'banners',
            component: () => import('./views/banner/Banners.vue'),
            meta: {
                title: 'routes.banner.index.title',
                description: 'routes.banner.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'banners/create',
            name: 'banners_create',
            component: () => import('./views/banner/Form.vue'),
            meta: {
                title: 'routes.banner.create.title',
                description: 'routes.banner.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'banners/:id/edit',
            name: 'banners_edit',
            component: () => import('./views/banner/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.banner.edit.title',
                description: 'routes.banner.edit.description',
                rule: 'editor'
            }
        },
        //Coupons
        {
            path: 'coupons',
            name: 'coupons',
            component: () => import('./views/coupon/Coupons.vue'),
            meta: {
                title: 'routes.coupon.index.title',
                description: 'routes.coupon.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'coupons/create',
            name: 'coupons_create',
            component: () => import('./views/coupon/Form.vue'),
            meta: {
                title: 'routes.coupon.create.title',
                description: 'routes.coupon.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'coupons/:id/edit',
            name: 'coupons_edit',
            component: () => import('./views/coupon/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.coupon.edit.title',
                description: 'routes.coupon.edit.description',
                rule: 'editor'
            }
        },
        //Promotions
        {
            path: 'promotions',
            name: 'promotions',
            component: () => import('./views/promotion/Promotions.vue'),
            meta: {
                title: 'routes.promotion.index.title',
                description: 'routes.promotion.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'promotions/create',
            name: 'promotions_create',
            component: () => import('./views/promotion/Form.vue'),
            meta: {
                title: 'routes.promotion.create.title',
                description: 'routes.promotion.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'promotions/:id/edit',
            name: 'promotions_edit',
            component: () => import('./views/promotion/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.promotion.edit.title',
                description: 'routes.promotion.edit.description',
                rule: 'editor'
            }
        },
        //Gift cards
        {
            path: 'gift_cards',
            name: 'giftCards',
            component: () => import('./views/giftCard/GiftCards.vue'),
            meta: {
                title: 'routes.giftCard.index.title',
                description: 'routes.giftCard.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'gift_cards/create',
            name: 'gift_cards_create',
            component: () => import('./views/giftCard/Form.vue'),
            meta: {
                title: 'routes.giftCard.create.title',
                description: 'routes.giftCard.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'gift_cards/:id/edit',
            name: 'gift_cards_edit',
            component: () => import('./views/giftCard/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.giftCard.edit.title',
                description: 'routes.giftCard.edit.description',
                rule: 'editor'
            }
        },
        //Currencies
        /*{
            path: 'currencies',
            name: 'currencies',
            component: () => import('./views/currency/Currencies.vue'),
            meta: {
                title: 'routes.currency.index.title',
                description: 'routes.currency.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'currencies/create',
            name: 'currencies_create',
            component: () => import('./views/currency/Form.vue'),
            meta: {
                title: 'routes.currency.create.title',
                description: 'routes.currency.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'currencies/:id/edit',
            name: 'currencies_edit',
            component: () => import('./views/currency/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.currency.edit.title',
                description: 'routes.currency.edit.description',
                rule: 'editor'
            }
        },*/
        //Orders
        {
            path: 'orders',
            name: 'orders',
            component: () => import('./views/order/AdminOrders.vue'),
            meta: {
                title: 'routes.order.index.title',
                description: 'routes.order.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'orders/create',
            name: 'orders_create',
            component: () => import('./views/order/Form.vue'),
            meta: {
                title: 'routes.order.create.title',
                description: 'routes.order.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'orders/:id',
            name: 'orders_show',
            component: () => import('./views/order/AdminShow.vue'),
            meta: {
                title: 'routes.order.show.title',
                description: 'routes.order.show.description',
                rule: 'editor'
            }
        },
        //Vouchers
        {
            path: 'vouchers',
            name: 'vouchers',
            component: () => import('./views/voucher/AdminVouchers.vue'),
            meta: {
                title: 'routes.voucher.index.title',
                description: 'routes.voucher.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'vouchers/:id/edit',
            name: 'vouchers_edit',
            component: () => import('./views/voucher/Edit.vue'),
            meta: {
                title: 'routes.voucher.edit.title',
                description: 'routes.voucher.edit.description',
                rule: 'editor'
            }
        },
        //Reviews
        {
            path: 'reviews',
            name: 'reviews',
            component: () => import('./views/review/Reviews.vue'),
            meta: {
                title: 'routes.review.index.title',
                description: 'routes.review.index.description',
                rule: 'editor'
            }
        },
        //Pages
        {
            path: 'pages',
            name: 'pages',
            component: () => import('./views/page/Pages.vue'),
            meta: {
                title: 'routes.page.index.title',
                description: 'routes.page.index.description',
                rule: 'editor'
            }
        },
        {
            path: 'pages/create',
            name: 'pages_create',
            component: () => import('./views/page/Form.vue'),
            meta: {
                title: 'routes.page.create.title',
                description: 'routes.page.create.description',
                rule: 'editor'
            }
        },
        {
            path: 'pages/:id/edit',
            name: 'pages_edit',
            component: () => import('./views/page/Form.vue'),
            props: { isEditForm: true },
            meta: {
                title: 'routes.page.edit.title',
                description: 'routes.page.edit.description',
                rule: 'editor'
            }
        },
        //Settings
        {
            path: 'settings',
            name: 'settings',
            component: () => import('./views/setting/Settings.vue'),
            meta: {
                title: 'routes.setting.index.title',
                description: 'routes.setting.index.description',
                rule: 'editor'
            }
        },
        //Users
        {
            path: 'users',
            name: 'users',
            component: () => import('./views/user/AdminUsers.vue'),
            meta: {
                title: 'routes.user.index.title',
                description: 'routes.user.index.description',
                rule: 'admin'
            }
        },
        //Newsletter
        {
            path: 'subscriptions',
            name: 'subscriptions',
            component: () => import('./views/newsletter/NewsletterSubscriptions.vue'),
            meta: {
                title: 'routes.newsletter.index.title',
                description: 'routes.newsletter.index.description',
                rule: 'admin'
            }
        },
        //Builder
        {
            path: 'builder_layouts/home',
            name: 'builder_layouts_home',
            component: () => import('./views/builder/Home.vue'),
            meta: {
                title: 'routes.builder.home.title',
                description: 'routes.builder.home.description',
                rule: 'editor'
            }
        }
        ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
      {
        path: '',
        component: () => import('@/layouts/full-page/FullPage.vue'),
        children: [
      // =============================================================================
      // PAGES
      // =============================================================================
          {
            path: '/login',
            name: 'pageLogin',
            component: () => import('@/views/pages/Login.vue'),
            meta: {
                rule: 'public'
            }
          },
          {
            path: '/pages/error-404',
            name: 'pageError404',
            component: () => import('@/views/pages/Error404.vue')
          },
        ]
      },
      // Redirect to 404 page, if no match found
      {
        path: '*',
        redirect: '/pages/error-404'
      },
    ],
})

export default router
