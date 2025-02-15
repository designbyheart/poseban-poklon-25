/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
    {
        url: "/dashboard",
        name: "sidebar.home",
        slug: "home",
        icon: "HomeIcon",
        role: 'editor'
    },
    {
        url: "/store",
        name: "sidebar.store",
        slug: "store",
        icon: "ShoppingCartIcon",
        submenu: [
            {
                url: "/dashboard/products",
                name: "sidebar.products",
                slug: "products",
            },
            {
                url: "/dashboard/producents",
                name: "sidebar.producents",
                slug: "producents",
            },
            {
                url: "/dashboard/categories",
                name: "sidebar.categories",
                slug: "categories",
            },
            {
                url: "/dashboard/filters",
                name: "sidebar.filters",
                slug: "filters",
            },
            {
                url: "/dashboard/attributes",
                name: "sidebar.attributes",
                slug: "attributes",
            },
            {
                url: "/dashboard/shipping_methods",
                name: "sidebar.shippingMethods",
                slug: "shipping_methods",
            },
            {
                url: "/dashboard/payment_methods",
                name: "sidebar.paymentMethods",
                slug: "payment_methods",
            },
            {
                url: "/dashboard/banners",
                name: "sidebar.banners",
                slug: "banners",
            },
            {
                url: "/dashboard/coupons",
                name: "sidebar.coupons",
                slug: "coupons",
            },
            {
                url: "/dashboard/promotions",
                name: "sidebar.promotions",
                slug: "promotions",
            },
            {
                url: "/dashboard/gift_cards",
                name: "sidebar.giftCards",
                slug: "gift_cards",
            },
        ],
        role: 'editor'
    },
    {
        url: "/sales",
        name: "sidebar.sales",
        slug: "sales",
        icon: "ShoppingBagIcon",
        submenu: [
          {
              url: "/dashboard/orders",
              name: "sidebar.orders",
              slug: "orders",
          },
          {
              url: "/dashboard/vouchers",
              name: "sidebar.vouchers",
              slug: "vouchers",
          },
        ],
        role: 'editor'
    },
    {
        url: "/content",
        name: "sidebar.content",
        slug: "content",
        icon: "BookmarkIcon",
        submenu: [
            {
                url: "/dashboard/reviews",
                name: "sidebar.reviews",
                slug: "reviews",
            },
            {
                url: "/dashboard/pages",
                name: "sidebar.pages",
                slug: "pages",
            }
        ],
        role: 'editor'
    },
    {
        url: "/dashboard/users",
        name: "sidebar.users",
        slug: "users",
        icon: "UsersIcon",
        role: 'admin'
    },
    {
        url: "/dashboard/subscriptions",
        name: "sidebar.newsletter",
        slug: "subscriptions",
        icon: "MailIcon",
        role: 'admin'
    },
    {
        url: "/dashboard/builder_layouts",
        name: "sidebar.pageBuilder",
        slug: "page_builder",
        icon: "GridIcon",
        submenu: [
            {
                url: "/dashboard/builder_layouts/home",
                name: "sidebar.homeBuilder",
                slug: "builder_layouts_home",
            }
        ],
        role: 'editor'
    },
    {
        url: "/settings",
        name: "sidebar.settings",
        slug: "settings",
        icon: "SettingsIcon",
        submenu: [
            {
                url: "/dashboard/settings",
                name: "sidebar.settings",
                slug: "settings",
            },
            /*{
                url: "/dashboard/currencies",
                name: "sidebar.currencies",
                slug: "currencies",
            }*/
        ],
        role: 'editor'
    },
]
