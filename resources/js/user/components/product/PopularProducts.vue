<template>
    <section class="home-products-carousel-container">
        <div class="section-title-container">
            <h3 class="col-md-12 section-title">{{ title }}</h3>
        </div>
        <div class="product-carousel-row container">
            <swiper :options="sliderOptions" class="popular-products-carousel">
                <swiper-slide :key="index" v-for="product,index in products">
                    <div class="product-carousel-item">
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
                        <div class="product-carousel-icon-row">
                            <div
                                class="product-carousel-icon-item icon-item-sale"
                                v-if="product.discount_price > 0"
                            >
                                <div class="product-carousel-icon-link carousel-icon-link sale-custom-icon">
                                    <span class="carousel-icon-image-promo">Sale</span>
                                </div>
                                <span class="product-carousel-hover-icon">Sale kategorije</span>
                            </div>
                            <div class="product-carousel-icon-item" v-if="product.vip">
                                <a :href="API.category.vip" class="product-carousel-icon-link">
                                    <img
                                        src="/images/icons/diadem_product_icon.svg"
                                        alt
                                        class="product-carousel-icon-image"
                                    />
                                </a>
                                <span class="product-carousel-hover-icon">VIP ponuda</span>
                            </div>
                            <div class="product-carousel-icon-item" v-if="product.new">
                                <a :href="API.category.new" class="product-carousel-icon-link">
                                    <img
                                        src="/images/icons/plus_product_icon.svg"
                                        alt
                                        class="product-carousel-icon-image"
                                    />
                                </a>
                                <span class="product-carousel-hover-icon">Novo</span>
                            </div>
                            <div class="product-carousel-icon-item" v-if="product.promo">
                                <a :href="API.category.promo" class="product-carousel-icon-link">
                                    <img
                                        src="/images/icons/star_product_icon.svg"
                                        alt
                                        class="product-carousel-icon-image"
                                    />
                                </a>
                                <span class="product-carousel-hover-icon">Promocija</span>
                            </div>
                        </div>
                        <a :href="productUrl(product.slug)" class="product-carousel-link">
                            <div class="product-carousel-image-row">
                                <img
                                    v-bind:src="product.images.length ? product.images[0].url : defaultImage.url"
                                    v-bind:alt="product.images.length ? product.images[0].alt : defaultImage.alt"
                                    class="product-carousel-image"
                                />
                                <div class="product-carousel-star-row">
                                    <img
                                        :src="star.src"
                                        alt
                                        class="product-star-icon"
                                        :key="index"
                                        v-for="star, index in buildStars(product.rating)"
                                    />
                                    <div class="prodcut-carousel-star-number">
                                        <span>{{ product.reviews_count }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="product-carousel-desc">
                                <h4 class="product-carousel-title">{{ product.title }}</h4>
                                <p class="product-carousel-city">{{ product.location }}</p>
                                <p class="product-carousel-price" v-if="product.discount_price === 0">
                                    {{ product.price }}
                                    <span class="price-currency">{{ applicationParams.currency }}</span>
                                </p>
                                <p class="product-carousel-price product-carousel-price-sale" v-else>
                  <span class="price-regular">
                    {{ product.price }}
                    <span class="price-currency">{{ applicationParams.currency }}</span>
                  </span>
                                    <span class="price-line">-</span>
                                    <span class="price-promo">
                    {{ product.discount_price }}
                    <span
                        class="price-currency"
                    >{{ applicationParams.currency }}</span>
                  </span>
                                </p>
                                <p class="product-carousel-btn">Pogledaj više</p>
                            </div>
                        </a>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev" id="popular-slide-prev" slot="button-prev"/>
            <div slot="button-next" class="swiper-button-next" id="popular-slide-next"/>
        </div>
    </section>
</template>

<style>
.product-carousel-row {
    position: relative;
}

.product-carousel-row .swiper-slide {
    padding-top: 10px;
}

.product-carousel-item {
    box-sizing: border-box;
    padding: 0 10px 10px;
}

.product-carousel-item .product-carousel-icon-row-left {
    position: absolute;
    top: -10px;
    left: 0;
    z-index: 1;
}

.product-carousel-item .product-carousel-icon-row {
    right: 0;
}
</style>

<script>
//Library for sending requests
import axios from "axios";

export default {
    name: "PopularProducts",
    props: {
        title: {
            type: String,
            default: "Najpopularnije ponude"
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
                spaceBetween: 5,
                navigation: {
                    nextEl: "#popular-slide-next",
                    prevEl: "#popular-slide-prev"
                },
                breakpoints: {
                    1000: {
                        slidesPerView: 3,
                        spaceBetween: 5
                    },
                    767: {
                        slidesPerView: 1.5,
                        spaceBetween: 5
                    }, 400: {
                        slidesPerView: 2,
                        spaceBetween: 3
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
                category_slug: "najpopularnije"
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
        },
        buildStars(rating) {
            let filledStarImage = {
                src: "/images/icons/product_price_star.svg"
            };

            let borderedStarImage = {
                src: "/images/icons/star-border.svg"
            };

            //Clear the list
            let stars = [];

            for (let i = 0; i < rating; i++) {
                let star = Object.assign({}, filledStarImage);

                stars.push(star);
            }

            let difference = 5 - stars.length;

            if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    let star = Object.assign({}, borderedStarImage);

                    stars.push(star);
                }
            }

            return stars;
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
