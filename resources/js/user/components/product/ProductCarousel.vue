<template>

    <div class="product-carousel-container">
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide class="slide" :key="index" v-for="slide,index in safeSlides">
                <img :src="slide.url" :alt="slide.alt || ''" />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide class="slide" :key="index" v-for="slide,index in safeSlides">
                <img :src="slide.url" :alt="slide.alt || ''" />
            </swiper-slide>
        </swiper>
    </div>

</template>

<script>

    export default {

        name: 'ProductCarousel',
        props: {
            slides: {
                type: Array,
                default(){

                    return [
                        {
                            url: '/images/default/product/posebanpoklon_product.jpg',
                            alt: ''
                        }
                    ]

                }
            }
        },
        data(){
            return {
                swiperOptionTop: {
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                swiperOptionThumbs: {
                    spaceBetween: 10,
                    slideToClickedSlide: true,
                    slidesPerView: 6,
                    centeredSlides: true,
                    touchRatio: 0.2
                }
            }
        },
        computed: {
            safeSlides() {
                // Filter out any invalid slides and ensure all properties exist
                return (this.slides || []).map(slide => {
                    return {
                        url: slide && typeof slide.url === 'string' ? slide.url : '/images/default/product/posebanpoklon_product.jpg',
                        alt: slide && typeof slide.alt === 'string' ? slide.alt : ''
                    };
                });
            }
        },
        methods: {
            sliderTo(index) {
                this.$refs.swiperTop.swiper.slideTo(index);
            }
        },
        mounted() {

            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop?.swiper;
                const swiperThumbs = this.$refs.swiperThumbs?.swiper;
                
                if (swiperTop && swiperThumbs && swiperTop.controller && swiperThumbs.controller) {
                    swiperTop.controller.control = swiperThumbs;
                    swiperThumbs.controller.control = swiperTop;
                }
            })

        }

    }

</script>

<style lang="scss">

    .product-carousel-container{
        height: 100%;

        .swiper-container {
            background-color: transparent;
        }

        .swiper-slide {
            background-size: cover;
            background-position: center;
        }

        .gallery-top {
            height: calc(100% - 110px) !important;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 10px;
            max-height: 500px;

            .swiper-slide img{

                width: 100%;
                height: 100%;
                object-fit: cover;

            }
        }

        .gallery-thumbs {
            height: 100px!important;
            box-sizing: border-box;
            padding: 0;

            /*.swiper-wrapper{
                transform: translate3d(0px, 0, 0) !important;
            }*/

        }
        .gallery-thumbs .swiper-slide {
            width: 16.66%;
            height: 100%;
            border: 2px solid transparent;
            border-radius: 4px;
            box-sizing: border-box;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .gallery-thumbs .swiper-slide-active {
            border-color: #ed2025;
        }
    }

</style>