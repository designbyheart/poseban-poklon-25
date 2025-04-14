const mix = require("laravel-mix");
const path = require("path");
let tailwindcss = require("tailwindcss");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js/dashboard"),
            "@assets": path.resolve(__dirname, "resources/assets"),
            "@sass": path.resolve(__dirname, "resources/sass"),
        },
    },
    devtool: "source-map",
})
    // .sass("resources/sass/vuesax/app.scss", "public/css/dashboard")
    // .options({
    //     postCss: [require("autoprefixer")]
    // })
    // .postCss(
    //     "resources/assets/css/dashboard/main.css",
    //     "public/css/dashboard",
    //     [tailwindcss("tailwind.js")]
    // )
    //Dashboard
    .js("resources/js/dashboard/app.js", "public/js/dashboard.js")
    //.copy('node_modules/vuesax/dist/vuesax.css', 'public/css/dashboard/vuesax.css') // Vuesax framework css
    //.copy('resources/assets/css/dashboard/iconfont.css', 'public/css/dashboard/iconfont.css') // Feather Icon Font css
    //.copyDirectory('resources/assets/fonts/dashboard', 'public/fonts/dashboard') // Feather Icon fonts
    //.copyDirectory('node_modules/material-icons/iconfont', 'public/css/dashboard/material-icons') // Material Icon fonts
    //.copyDirectory('node_modules/material-icons/iconfont/material-icons.css', 'public/css/dashboard/material-icons/material-icons.css') // Material Icon fonts css
    //.copy('node_modules/prismjs/themes/prism-tomorrow.css', 'public/css/dashboard/prism-tomorrow.css')
    .sass(
        "resources/sass/custom/custom.scss",
        "public/css/dashboard/custom.css",
    )
    .js("resources/js/user/app.js", "public/js/user.js")
    //Store public styles
    .sass(
        "resources/sass/user/components/app/default-style-values.scss",
        "public/css/user/components/app/default-style-values.css",
    )
    //.sass("resources/sass/user/components/app/mixin.scss", "public/css/user/components/app/mixin.css")
    .sass(
        "resources/sass/user/components/common/header.scss",
        "public/css/user/components/common/header.css",
    )
    // .sass("resources/sass/user/components/common/modal.scss", "public/css/user/components/common/modal.css")
    .sass(
        "resources/sass/user/components/common/footer.scss",
        "public/css/user/components/common/footer.css",
    )
    //.copy("resources/sass/user/components/app/bootstrap-grid.css", "public/css/user/components/app/bootstrap-grid.css")
    //Home page styles
    //.sass("resources/sass/user/components/home-page/home-grid.scss", "public/css/user/components/home-page/home-grid.css")
    .sass(
        "resources/sass/user/components/home-page/home-info.scss",
        "public/css/user/components/home-page/home-info.css",
    )
    //.sass("resources/sass/user/components/home-page/home-information.scss", "public/css/user/components/home-page/home-information.css")
    //.sass("resources/sass/user/components/home-page/home-newsletter.scss", "public/css/user/components/home-page/home-newsletter.css")
    // .sass("resources/sass/user/components/home-page/slider-select.scss", "public/css/user/components/home-page/slider-select.css")
    .sass(
        "resources/sass/user/components/home-page/masonry.scss",
        "public/css/user/components/home-page/masonry.css",
    )
    //User profile
    .sass(
        "resources/sass/user/components/common/sidebar.scss",
        "public/css/user/components/common/sidebar.css",
    )
    .sass(
        "resources/sass/user/components/profile/profile-content.scss",
        "public/css/user/components/profile/profile-content.css",
    )
    //Product page
    .sass(
        "resources/sass/user/components/product/carousel.scss",
        "public/css/user/components/product/carousel.css",
    )
    .sass(
        "resources/sass/user/components/product/product-carousel.scss",
        "public/css/user/components/product/product-carousel.css",
    )
    //PDF
    .sass(
        "resources/sass/user/components/pdf/pdf.scss",
        "public/css/user/components/pdf/pdf.css",
    )
    .sass(
        "resources/sass/user/components/pdf/pdf-a5.scss",
        "public/css/user/components/pdf/pdf-a5.css",
    )
    //Product
    .sass(
        "resources/sass/user/components/product/product-grid.scss",
        "public/css/user/components/product/product-grid.css",
    )
    .sass(
        "resources/sass/user/components/product/product-content.scss",
        "public/css/user/components/product/product-content.css",
    )
    // .sass(
    //     "resources/sass/user/components/common/breadcrumb.scss",
    //     "public/css/user/components/common/breadcrumb.css"
    // )
    .sass(
        "resources/sass/user/components/common/filters.scss",
        "public/css/user/components/common/filters.css",
    )
    // Category Page
    .sass(
        "resources/sass/user/components/category-page/category-main.scss",
        "public/css/user/components/category-page/category-main.css",
    )
    // Cart Page
    .sass(
        "resources/sass/user/components/cart-page/cart-content.scss",
        "public/css/user/components/cart-page/cart-content.css",
    )
    // Information Page
    .sass(
        "resources/sass/user/components/information-page/information-page.scss",
        "public/css/user/components/information-page/information-page.css",
    )
    // Updated styles
    .sass(
        "resources/assets/css/updated-styles.scss",
        "public/css/user/updated-styles.css",
    )
    //User fonts
    .copyDirectory("resources/assets/fonts/user", "public/fonts/user")
    .sourceMaps()
    .version()
    .options({ processCssUrls: false })
    .disableNotifications();
