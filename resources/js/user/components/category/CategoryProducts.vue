<template>
  <div>
    <div class="filters-row">
      <div class="filters-item">
        <select class="filter-select" v-model="filter.location">
          <option selected value>Izaberi grad</option>
          <option
            :key="index"
            v-for="option, index in filter.locationOptions"
            :value="option.id"
          >{{ option.name }}</option>
        </select>
      </div>
      <div class="filters-item">
        <select class="filter-select" v-model="filter.visitorsNumber">
          <option selected value>Za Koga</option>
          <option
            :key="index"
            v-for="option, index in filter.visitorsNumberOptions"
            :value="option.id"
          >{{ option.name }}</option>
        </select>
      </div>
      <div class="filters-item">
        <select class="filter-select" v-model="filter.sort">
          <option
            :key="index"
            v-for="option, index in sortOptions"
            :value="option"
          >{{ option.label }}</option>
        </select>
      </div>
    </div>
    <div class="product-grid-container" v-show="products.length > 0">
      <div class="product-grid-row">
        <div class="product-grid-item" :key="index" v-for="product, index in products">
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
            </div>
          </div>
          <div class="product-grid-icon-row">
            <div class="carousel-icon-item icon-item-sale" v-if="product.discount_price > 0">
              <div class="carousel-icon-link sale-custom-icon">
                <span class="carousel-icon-image-promo">Sale</span>
              </div>
              <span class="product-carousel-hover-icon">Sale kategorije</span>
            </div>
            <div class="product-grid-icon-item" v-if="product.vip">
              <a :href="API.category.vip" class="product-grid-icon-link">
                <img
                  src="/images/icons/diadem_product_icon.svg"
                  alt
                  class="product-grid-icon-image"
                />
              </a>
            </div>
            <div class="product-grid-icon-item" v-if="product.new">
              <a :href="API.category.new" class="product-grid-icon-link">
                <img src="/images/icons/plus_product_icon.svg" alt class="product-grid-icon-image" />
              </a>
            </div>
            <div class="product-grid-icon-item" v-if="product.promo">
              <a :href="API.category.promo" class="product-grid-icon-link">
                <img src="/images/icons/star_product_icon.svg" alt class="product-grid-icon-image" />
              </a>
            </div>
          </div>
          <a :href="API.product.show + product.slug" class="product-grid-link">
            <div class="product-grid-image-row">
              <img
                v-bind:src="product.images.length ? product.images[0].url : defaultImage.url"
                v-bind:alt="product.images.length ? product.images[0].alt : defaultImage.alt"
                class="product-grid-image"
              />
              <div class="product-grid-star-row">
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
            <div class="product-grid-desc">
              <h4 class="product-grid-title">{{ product.title }}</h4>
              <p class="product-grid-city">{{ product.location }}</p>
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
              <p class="product-grid-btn">Pogledaj više</p>
            </div>
          </a>
        </div>
      </div>
      <div class="pagination-row">
        <div class="pagination-col">
          <div
            class="pagination-item"
            @click="changePage(pagination.nextPage)"
            v-if="pagination.nextPage !== pagination.currentPage"
          >Sledećih 20</div>
          <!--<div class="pagination-item" @click="changePage(pagination.prevPage)" v-if="pagination.prevPage !== pagination.currentPage">Prev</div>-->
          <!--<div class="pagination-item item-number" :key="index" v-for="link, index in pagination.links" @click="changePage(link)" v-bind:class="{ 'item-active': link === pagination.currentPage }">{{ link }}</div>-->
          <div
            class="pagination-item"
            @click="loadAllProducts"
            v-if="pagination.nextPage !== pagination.currentPage"
          >Prikaži sve</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Library for working with requests
import axios from "axios";

export default {
  name: "CategoryProducts",
  props: {
    categoryId: {
      type: Number
    },
    perPage: {
      type: Number,
      default: 18
    }
  },
  data() {
    return {
      products: [],
      pagination: {
        links: [],
        suffix: "?page=",
        currentPage: 1,
        lastPage: 1,
        prevPage: 1,
        nextPage: 1,
        total: 0
      },
      sortOptions: [
        {
          label: "Sortiraj po popularnosti",
          key: "like_count",
          order: "desc"
        },
        {
          label: "Sortiraj po datumu: najnovije",
          key: "created_at",
          order: "desc"
        },
        {
          label: "Sortiraj po datumu: najstariji",
          key: "created_at",
          order: "asc"
        },
        {
          label: "Sortiraj po ceni: od manje ka većoj",
          key: "price",
          order: "asc"
        },
        {
          label: "Sortiraj po ceni: od veće ka manjoj",
          key: "price",
          order: "desc"
        },
        {
          label: "Sortiraj po imenu",
          key: "title",
          order: "asc"
        }
      ],
      filter: {
        categoryId: "",
        sort: {},
        location: "",
        visitorsNumber: "",
        locationOptions: [],
        visitorsNumberOptions: []
      },
      defaultImage: {
        url: "/images/default/product/posebanpoklon_product.jpg",
        alt: ""
      }
    };
  },
  watch: {
    "filter.sort": function(oldValue, newValue) {
      //Load sorted products
      this.getClearProducts();
    },
    "filter.location": function(oldValue, newValue) {
      //Load filtered products
      this.getClearProducts();
    },
    "filter.visitorsNumber": function(oldValue, newValue) {
      //Load filtered products
      this.getClearProducts();
    }
  },
  methods: {
    getFilter() {
      let requestUrl = this.API.filter.list;

      axios.get(requestUrl).then(response => {
        this.filter.locationOptions = response.data.location.attributes;
        this.filter.visitorsNumberOptions =
          response.data.visitors_number.attributes;
      });
    },
    getProducts(params) {
      let requestUrl = this.API.product.list;

      let perPage = this.perPage;

      if (params !== undefined) {
        if (params.productsCount !== undefined) {
          perPage = params.productsCount;
        }
      }

      if (params !== undefined) {
        if (params.page !== undefined) {
          requestUrl += this.pagination.suffix + params.page;
        }
      }

      let concat = true;

      if (params !== undefined) {
        if (params.clear !== undefined) {
          concat = false;
        }
      }

      let requestParams = {
        category_id: this.filter.categoryId,
        per_page: perPage,
        sort_key: this.filter.sort.key,
        sort_order: this.filter.sort.order
      };

      let selectedAttributes = this.assembleAttributes();

      if (selectedAttributes !== undefined) {
        requestParams.category_attributes = selectedAttributes;
      }

      axios.get(requestUrl, { params: requestParams }).then(response => {
        if (concat) {
          this.products = this.products.concat(response.data.data);
        } else {
          this.products = response.data.data;
        }

        this.setPagination(
          response.data.current_page,
          response.data.last_page,
          response.data.total
        );
      });
    },
    assembleAttributes() {
      let attributes = [];

      if (this.filter.location !== "") {
        attributes.push(this.filter.location);
      }

      if (this.filter.visitorsNumber !== "") {
        attributes.push(this.filter.visitorsNumber);
      }

      if (attributes.length > 0) {
        return attributes;
      }
    },
    changePage(page) {
      let params = {
        page: page
      };

      //Load products from specific page
      this.getProducts(params);
    },
    setPagination(currentPage, lastPage, total) {
      //Import the pagination object
      let pagination = this.pagination;

      //Set pagination current page
      pagination.currentPage = currentPage;

      //Set pagination last page
      pagination.lastPage = lastPage;

      //Set pagination previous page
      if (currentPage > 1) {
        pagination.prevPage = currentPage - 1;
      } else {
        pagination.prevPage = currentPage;
      }

      //Set pagination next page
      if (currentPage < lastPage) {
        pagination.nextPage = currentPage + 1;
      } else {
        pagination.nextPage = currentPage;
      }

      //Clear the pagination links list
      pagination.links = [];

      //Populate the pagination links list
      for (let i = 1; i <= pagination.lastPage; i++) {
        pagination.links.push(i);
      }

      //Set total number of products
      pagination.total = total;
    },
    setFilter() {
      //Get URL parameters for setting a filter
      let url = new URL(window.location.href);

      let location = url.searchParams.get("location");

      let visitorsNumber = url.searchParams.get("visitors_number");

      if (location !== null) {
        this.filter.location = location;
      }

      if (visitorsNumber !== null) {
        this.filter.visitorsNumber = visitorsNumber;
      }

      //Category
      if (this.categoryId !== null) {
        this.filter.categoryId = this.categoryId;
      }

      //Sort
      this.filter.sort = Object.assign({}, this.sortOptions[0]);
    },
    selectCategory(id) {
      //Change filter category
      this.filter.categoryId = id;

      //Load category products
      this.getProducts();
    },
    changeWishlistStatus(productId) {
      let product = this.products.find(function(product) {
        return product.id === productId;
      });

      if (product.in_wishlist) {
        product.in_wishlist = false;
      } else {
        product.in_wishlist = true;
      }
    },
    clearProducts() {
      this.products = [];
    },
    loadAllProducts() {
      let perPage = this.perPage;

      let requestUrl = this.API.product.list;

      let requestParams = {
        category_id: this.filter.categoryId,
        per_page: perPage,
        sort_key: this.filter.sort.key,
        sort_order: this.filter.sort.order
      };

      if (this.pagination.nextPage !== undefined) {
        if (this.pagination.nextPage !== this.pagination.currentPage) {
          requestUrl += this.pagination.suffix + this.pagination.nextPage;
        }
      }

      let selectedAttributes = this.assembleAttributes();

      if (selectedAttributes !== undefined) {
        requestParams.category_attributes = selectedAttributes;
      }

      axios.get(requestUrl, { params: requestParams }).then(response => {
        this.products = this.products.concat(response.data.data);

        this.setPagination(
          response.data.current_page,
          response.data.last_page,
          response.data.total
        );

        if (this.pagination.nextPage !== this.pagination.currentPage) {
          this.loadAllProducts();
        }
      });
    },
    getClearProducts() {
      let params = {
        clear: true
      };

      this.getProducts(params);
    },
    listenEvents() {
      //Change active category
      this.EventBus.$on("category-selected", id => {
        this.selectCategory(id);
        this.clearProducts();
      });

      //Product was added to wishlist
      this.EventBus.$on("added-to-wishlist", product => {
        this.changeWishlistStatus(product);
      });

      //Product was removed from wishlist
      this.EventBus.$on("removed-from-wishlist", product => {
        this.changeWishlistStatus(product);
      });
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
    //Set default filter
    this.setFilter();

    //Get products
    this.getProducts();

    //Listen to events
    this.listenEvents();

    //Get filter settings
    this.getFilter();
  }
};
</script>