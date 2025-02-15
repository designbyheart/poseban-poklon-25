<template>
    <section class="home-products-carousel-container">
        <div class="section-title-container">
            <h3 class="col-md-12 section-title">{{ title }}</h3>
        </div>
        <div class="home-carousel-row container">
            <swiper :options="sliderOptions">
                <swiper-slide :key="index" v-for="product,index in products">
                    <div class="home-carousel-item">
                        <img
                            v-bind:src="product.images.length ? product.images[0].url : defaultImage.url"
                            v-bind:alt="product.images.length ? product.images[0].alt : defaultImage.alt"
                            class="carousel-bg-image"
                        />
                        <div class="product-carousel-icon-row-left">
                            <div class="product-carousel-icon-item">
                                <div class="product-carousel-icon-link wish-list-btn wish-btn-active">
                                    <img
                                        src="/images/icons/wish_icon_opacity.svg"
                                        alt="PosebanPoklon"
                                        class="wish-list-image product-carousel-icon-image"
                                        @click="addToWishlist(product)"
                                        v-if="!product.in_wishlist"
                                    />
                                    <img
                                        src="/images/icons/wish_icon_fill.svg"
                                        alt="PosebanPoklon"
                                        class="wish-list-image-fill product-carousel-icon-image"
                                        @click="removeFromWishlist(product.id)"
                                        v-if="product.in_wishlist"
                                    />
                                </div>
                                <span class="product-carousel-hover-icon">Lista želja</span>
                            </div>
                        </div>
                        <div class="carousel-icon-row">
                            <div class="carousel-icon-item icon-item-sale" v-if="product.discount_price > 0">
                                <div class="carousel-icon-link sale-custom-icon">
                                    <span class="carousel-icon-image-promo">Sale</span>
                                </div>
                                <span class="product-carousel-hover-icon">Sale kategorije</span>
                            </div>
                            <div class="carousel-icon-item" v-if="product.vip">
                                <a :href="API.category.vip" class="carousel-icon-link">
                                    <img src="/images/icons/diadem_product_icon.svg" alt class="carousel-icon-image"/>
                                </a>
                                <span class="product-carousel-hover-icon">VIP ponuda</span>
                            </div>
                            <div class="carousel-icon-item" v-if="product.promo">
                                <a :href="API.category.promo" class="carousel-icon-link">
                                    <img src="/images/icons/star_product_icon.svg" alt class="carousel-icon-image"/>
                                </a>
                                <span class="product-carousel-hover-icon">Promocija</span>
                            </div>
                            <div class="carousel-icon-item" v-if="product.new">
                                <a :href="API.category.new" class="carousel-icon-link">
                                    <img src="/images/icons/plus_product_icon.svg" alt class="carousel-icon-image"/>
                                </a>
                                <span class="product-carousel-hover-icon">Novo</span>
                            </div>
                        </div>
                        <a :href="productUrl(product.slug)" class="carousel-main-link">
                            <div class="carousel-desc-row">
                                <p class="carousel-product-title">{{ product.title }}</p>
                                <p
                                    class="carousel-product-price"
                                    v-if="product.discount_price > 0"
                                >{{ product.discount_price + ' ' + applicationParams.currency }}</p>
                                <p
                                    class="carousel-product-price-regular"
                                    v-bind:class="[product.discount_price > 0 ? 'sale' : '']"
                                >{{ product.price + ' ' + applicationParams.currency }}</p>
                            </div>
                        </a>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev" id="recommended-slide-prev" slot="button-prev"></div>
            <div class="swiper-button-next" id="recommended-slide-next" slot="button-next"></div>
        </div>
    </section>
</template>

<style>
.home-carousel-row {
    position: relative;
}

.home-carousel-row .swiper-slide {
    padding-top: 10px;
    min-width: 30rem;
    max-width: 90vw;
}

.home-carousel-item {
    box-sizing: border-box;
}
</style>

<script>
//Library for sending requests
import axios from "axios";

export default {
    name: "RecommendedProducts",
    props: {
        title: {
            type: String
        },
        perPage: {
            type: Number,
            default: 24
        },
        categoryId: {
            type: Number
        }
    },
    data() {
        return {
            products: [],
            sliderOptions: {
                slidesPerView: 4,
                spaceBetween: 0,
                navigation: {
                    nextEl: "#recommended-slide-next",
                    prevEl: "#recommended-slide-prev"
                },
                breakpoints: {
                    1000: {
                        slidesPerView: 2.5,
                        spaceBetween: 5
                    },
                    767: {
                        slidesPerView: 1.5,
                        spaceBetween: 0
                    }
                }
            },
            defaultImage: {
                url: "/images/default/product/posebanpoklon_product.jpg",
                alt: ""
            }
        };
    },
    computed: {
        isMobile() {
            return window.innerWidth < 767;
        }
    },
    methods: {
        productUrl(slug) {
            return this.API.product.show + slug;
        },
        getProducts() {
            let requestUrl = this.API.product.list;

            let requestParams = {
                per_page: this.perPage,
                category_slug: "preporucujemo"
            };

            axios.get(requestUrl, {params: requestParams}).then(response => {
                this.products = response.data.data;
            });
        },
        listenEvents() {
            this.EventBus.$on("added-to-wishlist", product => {
                this.changeWishlistStatus(product);
            });

            this.EventBus.$on("removed-from-wishlist", product => {
                this.changeWishlistStatus(product);
            });
        },
        changeWishlistStatus(productId) {
            let product = this.products.find(function (product) {
                return product.id === productId;
            });

            if (product.in_wishlist) {
                product.in_wishlist = false;
            } else {
                product.in_wishlist = true;
            }
        }
    },
    mounted() {
        //Get products
        this.getProducts();

        //Listen to events
        this.listenEvents();
    }
};
</script>
