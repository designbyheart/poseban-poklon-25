<?php $__env->startSection('seo_title', $seo_title); ?>
<?php $__env->startSection('seo_description', $seo_description); ?>
<?php $__env->startSection('seo_keywords', $seo_keywords); ?>

<?php $__env->startSection('content'); ?>

<!--Home page slider-->
<home-slider :slides="<?php echo e(json_encode($page_layout->slider->slides)); ?>"></home-slider>

<!--Products filter bar-->
<filter-bar :location-options="<?php echo e($locationAttributes); ?>" :visitors-options="<?php echo e($visitorsAttributes); ?>"></filter-bar>

<section class="home-info-container">
    <div class="container">
        <a href="/garancije">
            <div class="home-info-row">
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/gift_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">POKLON VAUČERI</p>
                        <p class="item-desc">važe godinu dana</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/report_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BESPLATNA ZAMENA</p>
                        <p class="item-desc">za sve vaučere</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/round_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">365 DANA ZAMENE</p>
                        <p class="item-desc">za sve vaučere</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/credit_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BEZBEDNA</p>
                        <p class="item-desc">kupovina</p>
                    </div>
                </div>
                <div class="home-info-item">
                    <div class="home-info-item-icon">
                        <img src="images/icons/truck_icon.svg" alt="" class="item-icon">
                    </div>
                    <div class="home-info-item-text">
                        <p class="item-title">BESPLATNA DOSTAVA</p>
                        <p class="item-desc">preko 9900 RSD</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
</section>

<recommended-products title="PREPORUČUJEMO"></recommended-products>

<!--Carousel-->

<!--Categories builder section-->
<section class="home-masonry-container container">
    <div class="section-title-container">
        <h3 class="col-md-12 section-title">
            <?php echo e($page_layout->sectionTitles->category->value); ?>

        </h3>
    </div>
    <div class="home-masonry-row row">
        <div class="home-masonry-col-left col-md-9">
            <div class="home-masonry-col-top row">
                <div class="col-md-8 top-left left-col">
                    <a class="home-masonry-item" href="<?php echo e($page_layout->categories->items[0]->link); ?>"
                        style="background-image: url('<?php echo e($page_layout->categories->items[0]->image[0]->url); ?>');">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                <?php echo e($page_layout->categories->items[0]->title); ?>

                            </h4>
                            <p class="masonry-desc">
                                <?php echo e($page_layout->categories->items[0]->subtitle); ?>

                            </p>
                            <?php if($page_layout->categories->items[0]->showButton): ?>
                            <p class="masonry-btn">
                                <?php echo e($page_layout->categories->items[0]->buttonText); ?>

                            </p>
                            <?php endif; ?>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 top-right left-col">
                    <a class="home-masonry-item" href="<?php echo e($page_layout->categories->items[1]->link); ?>"
                        style="background-image: url(<?php echo e($page_layout->categories->items[1]->image[0]->url); ?>);">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                <?php echo e($page_layout->categories->items[1]->title); ?>

                            </h4>
                            <p class="masonry-desc">
                                <?php echo e($page_layout->categories->items[1]->subtitle); ?>

                            </p>
                            <?php if($page_layout->categories->items[1]->showButton): ?>
                            <p class="masonry-btn">
                                <?php echo e($page_layout->categories->items[1]->buttonText); ?>

                            </p>
                            <?php endif; ?>
                        </div>
                    </a>
                </div>
            </div>
            <div class="home-masonry-col-bottom row">
                <div class="col-md-4 bottom-left left-col">
                    <a class="home-masonry-item" href="<?php echo e($page_layout->categories->items[2]->link); ?>"
                        style="background-image: url(<?php echo e($page_layout->categories->items[2]->image[0]->url); ?>);">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                <?php echo e($page_layout->categories->items[2]->title); ?>

                            </h4>
                            <p class="masonry-desc">
                                <?php echo e($page_layout->categories->items[2]->subtitle); ?>

                            </p>
                            <?php if($page_layout->categories->items[2]->showButton): ?>
                            <p class="masonry-btn">
                                <?php echo e($page_layout->categories->items[2]->buttonText); ?>

                            </p>
                            <?php endif; ?>
                        </div>
                    </a>
                </div>
                <div class="col-md-8 bottom-right left-col">
                    <a class="home-masonry-item" href="<?php echo e($page_layout->categories->items[3]->link); ?>"
                        style="background-image: url(<?php echo e($page_layout->categories->items[3]->image[0]->url); ?>);">
                        <div class="home-masonry-item-hover">
                            <h4 class="masonry-title">
                                <?php echo e($page_layout->categories->items[3]->title); ?>

                            </h4>
                            <p class="masonry-desc">
                                <?php echo e($page_layout->categories->items[3]->subtitle); ?>

                            </p>
                            <?php if($page_layout->categories->items[3]->showButton): ?>
                            <p class="masonry-btn">
                                <?php echo e($page_layout->categories->items[3]->buttonText); ?>

                            </p>
                            <?php endif; ?>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="home-masonry-col-right col-md-3">
            <a class="home-masonry-item" href="<?php echo e($page_layout->categories->items[4]->link); ?>"
                style="background-image: url(<?php echo e($page_layout->categories->items[4]->image[0]->url); ?>);">
                <div class="home-masonry-item-hover">
                    <h4 class="masonry-title">
                        <?php echo e($page_layout->categories->items[4]->title); ?>

                    </h4>
                    <p class="masonry-desc">
                        <?php echo e($page_layout->categories->items[4]->subtitle); ?>

                    </p>
                    <?php if($page_layout->categories->items[4]->showButton): ?>
                    <p class="masonry-btn">
                        <?php echo e($page_layout->categories->items[4]->buttonText); ?>

                    </p>
                    <?php endif; ?>
                </div>
            </a>
        </div>
    </div>
</section>

<popular-products></popular-products>

<!--<div class="bank-logo-row home">
    <a href="https://www.bancaintesa.rs/" target="_blank" class="bank-img">
        <img src="/images/checkout/logo_intesa.png"/>
    </a>
    <img class="bank-img" src="/images/checkout/visa.png"/>
    <img class="bank-img" src="/images/checkout/mastercard.png"/>
    <img class="bank-img" src="/images/checkout/maestro.png"/>
</div>-->

<section class="home-information-container">
    <div class="home-information-row" style="background-image: url(<?php echo e($page_layout->aboutUs->image[0]->url); ?>);">
        <div class="home-information-text container">
            <h2 class="information-title">
                <?php echo e($page_layout->aboutUs->title); ?>

            </h2>
            <p class="information-desc">
                <?php echo e($page_layout->aboutUs->description); ?>

            </p>
        </div>
    </div>
    <div class="home-information-row-buttons container">
        <?php $__currentLoopData = $page_layout->bottomLinks; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $button): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="information-button">
            <a href="<?php echo e($button->link); ?>" class="information-link">
                <span><?php echo e($button->title); ?></span>
            </a>
        </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
</section>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /Users/work/poseban-poklon/poklon/resources/views/home.blade.php ENDPATH**/ ?>