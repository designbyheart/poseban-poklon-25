<template>
  <section class="home-products-carousel-container">
    <div class="section-title-container">
      <h3 class="col-md-12 section-title">
        {{ title }}
      </h3>
    </div>
    <div class="home-carousel-row container">
      <swiper
        ref="mySwiper"
        :options="sliderOptions"
      >
        <swiper-slide
          v-for="product,index in products"
          :key="index"
        >
          <div class="home-carousel-item">
            <img
              :src="product.images.length ? product.images[0].url : defaultImage.url"
              :alt="product.images.length ? product.images[0].alt : defaultImage.alt"
              class="carousel-bg-image"
            >
            <div class="product-carousel-icon-row-left">
              <div class="product-carousel-icon-item">
                <div class="product-carousel-icon-link wish-list-btn wish-btn-active">
                  <img
                    v-if="!product.in_wishlist"
                    src="/images/icons/wish_icon_opacity.svg"
                    alt="PosebanPoklon"
                    class="wish-list-image product-carousel-icon-image"
                    @click="addToWishlist(product)"
                  >
                  <img
                    v-if="product.in_wishlist"
                    src="/images/icons/wish_icon_fill.svg"
                    alt="PosebanPoklon"
                    class="wish-list-image-fill product-carousel-icon-image"
                    @click="removeFromWishlist(product.id)"
                  >
                </div>
                <span class="product-carousel-hover-icon">Lista želja</span>
              </div>
            </div>
            <div class="carousel-icon-row">
              <div
                v-if="product.discount_price > 0"
                class="carousel-icon-item icon-item-sale"
              >
                <div class="carousel-icon-link sale-custom-icon">
                  <span class="carousel-icon-image-promo">Sale</span>
                </div>
                <span class="product-carousel-hover-icon">Sale kategorije</span>
              </div>
              <div
                v-if="product.vip"
                class="carousel-icon-item"
              >
                <a
                  :href="API.category.vip"
                  class="carousel-icon-link"
                >
                  <img
                    src="/images/icons/diadem_product_icon.svg"
                    alt
                    class="carousel-icon-image"
                  >
                </a>
                <span class="product-carousel-hover-icon">VIP ponuda</span>
              </div>
              <div
                v-if="product.promo"
                class="carousel-icon-item"
              >
                <a
                  :href="API.category.promo"
                  class="carousel-icon-link"
                >
                  <img
                    src="/images/icons/star_product_icon.svg"
                    alt
                    class="carousel-icon-image"
                  >
                </a>
                <span class="product-carousel-hover-icon">Promocija</span>
              </div>
              <div
                v-if="product.new"
                class="carousel-icon-item"
              >
                <a
                  :href="API.category.new"
                  class="carousel-icon-link"
                >
                  <img
                    src="/images/icons/plus_product_icon.svg"
                    alt
                    class="carousel-icon-image"
                  >
                </a>
                <span class="product-carousel-hover-icon">Novo</span>
              </div>
            </div>
            <a
              :href="productUrl(product.slug)"
              class="carousel-main-link"
            >
              <div class="carousel-desc-row">
                <p class="carousel-product-title">{{ product.title }}</p>
                <p
                  v-if="product.discount_price > 0"
                  class="carousel-product-price"
                >{{ product.discount_price + ' ' + applicationParams.currency }}</p>
                <p
                  class="carousel-product-price-regular"
                  :class="[product.discount_price > 0 ? 'sale' : '']"
                >{{ product.price + ' ' + applicationParams.currency ?? "RSD" }}</p>
              </div>
            </a>
          </div>
        </swiper-slide>
        <div
          slot="button-prev"
          class="swiper-button-prev"
        />
        <div
          slot="button-next"
          class="swiper-button-next"
        />
      </swiper>
    </div>
  </section>
</template>

<script>
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
                init: true,
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
                loop: false,
                speed: 500,
                grabCursor: true,
                watchOverflow: true,
                resistance: true,
                resistanceRatio: 0.85,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    // Mobile
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 15,
                        freeMode: false,
                    },
                    // Tablet
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        slidesPerGroup: 2,  // Move 2 slides at a time on tablet
                        freeMode: false,
                    },
                    // Desktop
                    1024: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                        slidesPerGroup: 3,  // Move 3 slides at a time on desktop
                        freeMode: false,
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
    mounted() {
        //Get products
        this.getProducts();

        //Listen to events
        this.listenEvents();
        
        // Initialize custom navigation
        this.$nextTick(() => {
            if (!this.$refs.mySwiper) return;
            
            const swiper = this.$refs.mySwiper.$swiper;
            if (!swiper) return;
            
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Disable default navigation
                swiper.params.navigation.disabledClass = 'hidden';
                swiper.navigation.destroy();
                swiper.update();
                
                // Get navigation elements
                const nextBtn = this.$el.querySelector('.swiper-button-next');
                const prevBtn = this.$el.querySelector('.swiper-button-prev');
                
                if (nextBtn) {
                    // Clear previous event listeners
                    nextBtn.replaceWith(nextBtn.cloneNode(true));
                    const newNextBtn = this.$el.querySelector('.swiper-button-next');
                    
                    // Add custom mobile navigation
                    newNextBtn.addEventListener('click', () => {
                        const containerWidth = swiper.$el.offsetWidth;
                        const scrollAmount = containerWidth * 0.85;  // Almost full screen width
                        swiper.setTranslate(swiper.getTranslate() - scrollAmount);
                        swiper.updateProgress();
                        swiper.updateActiveIndex();
                        swiper.updateSlidesClasses();
                    });
                }
                
                if (prevBtn) {
                    // Clear previous event listeners
                    prevBtn.replaceWith(prevBtn.cloneNode(true));
                    const newPrevBtn = this.$el.querySelector('.swiper-button-prev');
                    
                    // Add custom mobile navigation
                    newPrevBtn.addEventListener('click', () => {
                        const containerWidth = swiper.$el.offsetWidth;
                        const scrollAmount = containerWidth * 0.85;  // Almost full screen width
                        swiper.setTranslate(swiper.getTranslate() + scrollAmount);
                        swiper.updateProgress();
                        swiper.updateActiveIndex();
                        swiper.updateSlidesClasses();
                    });
                }
            }
        });
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
    }
};
</script>

<style lang="scss">
.home-carousel-row {
    position: relative;
    
    .swiper-container {
        padding: 10px 0;
        margin: -10px 0;
        overflow: visible;
        
        @media (max-width: 767px) {
            overflow: hidden;
        }
    }
    
    .swiper-slide {
        height: auto;
        width: 280px;
        
        @media (min-width: 768px) {
            width: 320px;
        }
        
        @media (min-width: 1024px) {
            width: 340px;
        }
    }
    
    .swiper-button-next,
    .swiper-button-prev {
        background-color: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        transition: transform 0.3s ease;
        
        &:after {
            display: none;
        }
        
        @media (max-width: 767px) {
            opacity: 0.8;
        }
    }
    
    .swiper-button-prev {
        &:hover {
            transform: translateX(-3px);
        }
    }
    
    .swiper-button-next {
        &:hover {
            transform: translateX(3px);
        }
    }
}

.home-carousel-item {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
}
</style>
