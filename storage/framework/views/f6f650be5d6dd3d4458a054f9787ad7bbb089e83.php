<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">

<head>

    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="<?php echo e(asset('images/header/favicon.jpg')); ?>" sizes="16x16">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo $__env->yieldContent('seo_title'); ?></title>

    <meta name="description" content="<?php echo $__env->yieldContent('seo_description'); ?>">

    <meta name="keywords" content="<?php echo $__env->yieldContent('seo_keywords'); ?>">

    <meta property="og:title" content="<?php echo $__env->yieldContent('og_title'); ?>">

    <meta property="og:description" content="<?php echo $__env->yieldContent('og_description'); ?>">

    <meta property="og:url" content="<?php echo $__env->yieldContent('og_url'); ?>">

    <?php if(trim($__env->yieldContent('og_image'))): ?>
    <meta property="og:image" content="<?php echo $__env->yieldContent('og_image'); ?>">
    <?php else: ?>
    <meta property="og:image" content="<?php echo e($applicationParams->siteLogo); ?>">
    <?php endif; ?>

    <meta property="og:image:type" content="image/png">

    <meta property="og:image:width" content="600">

    <meta property="og:image:height" content="600">

    <meta property="product:brand" content="<?php echo $__env->yieldContent('brand'); ?>">

    <meta property="product:availability" content="in stock">

    <meta property="product:condition" content="new">

    <meta property="product:price:amount" content="<?php echo $__env->yieldContent('price'); ?>">

    <meta property="product:price:currency" content="<?php echo $__env->yieldContent('currency'); ?>">

    <meta property="product:retailer_item_id" content="<?php echo $__env->yieldContent('item_id'); ?>">

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css"
        integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y"
        crossorigin="anonymous">

    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-P6923Q2');
    </script>
    <!-- End Google Tag Manager -->

    <!-- Styles -->
    <link rel="stylesheet" href="<?php echo e(asset('css/user/style.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/user/updated-styles.css')); ?>">

    <!-- Bootstrap grid -->
    <link rel="stylesheet" href="<?php echo e(asset('css/user/components/app/bootstrap-grid.css')); ?>">

    <!--Facebook Pixel-->
    <?php echo $fb_pixel; ?>


    <!--Analitycs scripts-->
    <?php echo $__env->yieldPushContent("head"); ?>


    <!--Custom CSS-->
    <style>
        <?php echo $__env->yieldContent('styles'); ?>
        <?php echo $settings->custom_css; ?>

    </style>

</head>

<body class="has-background-light">

    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6923Q2"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <div id="app">
        <common-header></common-header>
        <?php echo $__env->yieldContent('content'); ?>
        <common-footer></common-footer>
    </div>

    <script>
        //Set global application parameters
        window.applicationParams = Object.assign({}, <?php echo json_encode($applicationParams); ?>);

        if (window.applicationParams.user !== null) {

            localStorage.setItem('userRole', window.applicationParams.user.role.name);

        }
    </script>

    <script src="<?php echo e(asset('js/user.js')); ?>"></script>
    <script src="<?php echo e(asset('js/user/helpers.js')); ?>" type="module"></script>
    <script src="<?php echo e(asset('js/user/hamburger.js')); ?>"></script>
    <script src="<?php echo e(asset('js/common/header.js')); ?>"></script>

    <!--Google Analytics-->
    <?php echo $google_analytics; ?>


    <!--Custom JS-->
    <?php echo $settings->custom_js; ?>


    <?php echo $__env->yieldContent('scripts'); ?>

</body>

</html>
<?php /**PATH /Users/work/poseban-poklon/poklon/resources/views/layouts/app.blade.php ENDPATH**/ ?>