<template>
  <div class="header-icon-item cart-mobile cart-mobile-active">
    <a href="/checkout" class="header-icons-link cart">
      <img src="/images/icons/cart_icon.svg" alt class="header-icons-cart header-icons-cart-fixed" />
      <img
        src="/images/icons/cart_icon_white.svg"
        alt
        class="header-icons-cart header-icons-cart-scroll"
      />
      <span class="header-icons-cart-number">{{ cart.productsCount }}</span>
    </a>
    <!-- Dropdown Cart -->
    <div class="header-cart-dropdown">
      <h3 class="cart-dropdown-title">Korpa</h3>
      <div class="cart-dropdown-table">
        <div class="dropdown-table-title-row">
          <div class="table-title-item dropdown-col-1">Informacije o ponudi</div>
          <div class="table-title-item dropdown-col-2">Količina</div>
          <div class="table-title-item dropdown-col-3">Cena</div>
        </div>
        <div class="dropdown-table-product-row" :key="index" v-for="item, index in cart.items">
          <div class="table-product-desc dropdown-col-1">
            <a href="#" class="table-product-desc-link">
              <img :src="item.imageUrl" alt="PosebanPoklon" class="table-product-image" />
              <span class="table-product-title">{{ item.title }}</span>
            </a>
          </div>
          <div class="table-product-counter dropdown-col-2">
            <div class="table-product-counter-container">
              <button @click="decrementQuantity(index)" class="item-less">&mdash;</button>
              <input type="text" :value="item.quantity" class="item-counter" readonly />
              <button @click="incrementQuantity(index)" class="item-more">&#xff0b;</button>
            </div>
          </div>
          <div class="table-product-price dropdown-col-3">
            <div class="product-price">
              <span class="product-price">{{ item.total }}</span>
              <span class="product-currency">{{ cart.currency }}</span>
            </div>
            <button class="table-product-cancel" @click="removeItem(index)">
              <img
                src="/images/icons/cancel_cart_icon.svg"
                alt="PosebanPoklon"
                class="table-product-cancel-icon"
              />
            </button>
          </div>
        </div>
        <!-- General price -->
        <div class="dropdown-table-price-row">
          <div class="table-price-title dropdown-col-2">Ukupna cena</div>
          <div class="table-price-number dropdown-col-3">{{ cart.subtotal + ' ' + cart.currency }}</div>
        </div>
        <!-- Btn -->
        <div class="dropdown-table-buttons-row">
          <div class="table-buttons-container">
            <a href="/kategorije" class="table-buttons-shopping">Nastavi proces kupovine</a>
            <a href="/checkout">
              <button class="table-buttons-add">Završi kupovinu</button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- End Dropdown Cart -->
  </div>
</template>

<script>
//Import the data for the cart
import { cartModel, itemModel } from "../../static/cart/cart";

export default {
  name: "HeaderCart",
  data() {
    return {
      cart: {},
      boxPrice: 690,
    };
  },
  watch: {
    "cart.items": {
      handler(val) {
        //Calculate prices
        this.calculatePrices();

        //Count products total quantity
        this.countProducts();

        //Save an updated cart to localStorage
        this.saveCart();
      },
      deep: true
    }
  },
  methods: {
    setCart() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        this.setNewCart();
      }
    },
    setNewCart() {
      this.cart = Object.assign({}, cartModel);

      this.cart.items = [];

      this.cart.currency = this.applicationParams.currency;

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addItem(product) {
      let existingItem = this.cart.items.find(function(item) {
        return item.productId === product.id;
      });

      if (existingItem === undefined) {
        let newItem = Object.assign({}, itemModel);

        newItem.productId = product.id;
        newItem.title = product.title;
        newItem.slug = product.slug;
        newItem.price = product.price;
        newItem.discountPrice = product.discount_price;
        newItem.add_box = false;
        newItem.box_count = 0;
        newItem.box_total = 0;

        if (product.images.length) {
          newItem.imageUrl = product.images[0].url;
        }

        this.cart.items.push(newItem);
      } else {
        let itemIndex = this.cart.items.indexOf(existingItem);

        this.incrementQuantity(itemIndex);
      }

      //Show success notification
      //this.showNotification('success', 'Ponuda je dodata u korpu.');
      this.$swal({
        type: "success",
        title:
          "<p style='font-family: Rubik-medium;'>Super, tvoj poklon je u korpi!</p>",
        footer:
          "<div class='add-cart-alert-buttons'>" +
          "<div class='table-buttons-container'>" +
          "<a href=\"/kategorije\" class=\"table-buttons-shopping\">Nastavi proces kupovine</a>\n" +
          "<a href=\"/checkout\">\n" +
          "<button class=\"table-buttons-add\">Završi kupovinu</button>\n" +
          "</a>\n" +
          "</div>\n" +
          "</div>",
        showConfirmButton: false,
      });
    },
    removeItem(index) {
      this.cart.items.splice(index, 1);
    },
    calculatePrices() {
      let cart = this.cart;

      let subtotal = 0;

      if (cart.items.length) {
        cart.items.forEach(function(item) {
          let itemPrice = item.price;

          if (item.discountPrice > 0) {
            itemPrice = item.discountPrice;
          }

          let itemTotal = Math.round(itemPrice * item.quantity * 100) / 100;

          item.total = itemTotal + item.box_total;

          subtotal += itemTotal;
        });
      }

      cart.subtotal = subtotal;

      cart.total = subtotal;
    },
    incrementQuantity(index) {
      let item = this.cart.items[index];

      item.quantity += 1;

      //Update checkout products list
      this.sendUpdatedProducts();
    },
    decrementQuantity(index) {
      let item = this.cart.items[index];

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeItem(index);
      }

      //Update checkout products list
      this.sendUpdatedProducts();
    },
    incrementBoxQuantity(index){

        let product = this.cart.items[index];

        if(product && product.box_count < product.quantity){
            if(!product.add_box){
                product.add_box = true;
            }
            product.box_count += 1;
            product.box_total = product.box_count * this.boxPrice;
            product.total += this.boxPrice;
            //Update checkout products list
            this.sendUpdatedProducts();
        }

    },
    decrementBoxQuantity(index){

        let product = this.cart.items[index];

        if(product){
            if(product.box_count > 1){
                product.box_count -= 1;
                product.total -= this.boxPrice;
                product.box_total = product.box_count * this.boxPrice;
            }
            else{
                product = Object.assign(product, {
                    total: product.total - product.box_total,
                    box_total: 0,
                    box_count: 0,
                    add_box: false
                })
            }
            //Update checkout products list
            this.sendUpdatedProducts();
        }

    },
    toggleBox(index, value){

        console.log(value);

        let product = this.cart.items[index];

        if(product){
            if(value){
                this.incrementBoxQuantity(index);
            }
            else{
                this.removeBox(index);
            }
        }
    },
    removeBox(index){
        let product = this.cart.items[index];

        if(product) {
            product.box_count = 0;
            product.total -= product.box_total;
            product.box_total = 0;
            product.add_box = false;
            //Update checkout products list
            this.sendUpdatedProducts();
        }
    },
    countProducts() {
      let productsCount = 0;

      this.cart.items.forEach(function(item) {
        productsCount += item.quantity;
      });

      this.cart.productsCount = productsCount;
    },
    saveCart() {
      //Save a cart to the localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    listenEvents() {
      //Receive data form an add to cart button
      this.EventBus.$on("add-to-cart", product => {
        this.addItem(product);
      });

      //Receive a data from a checkout page
      this.EventBus.$on("product-quantity-increment", product => {
        this.incrementQuantity(product);
      });

      this.EventBus.$on("product-quantity-decrement", product => {
        this.decrementQuantity(product);
      });

      //Receive a data from a checkout page
      this.EventBus.$on("product-box-increment", product => {
          this.incrementBoxQuantity(product);
      });

      this.EventBus.$on("product-box-decrement", product => {
          this.decrementBoxQuantity(product);
      });

      this.EventBus.$on("product-toggle-box", ({index, value})  => {
          this.toggleBox(index, value);
      });

      this.EventBus.$on("product-box-remove", product => {
          this.removeBox(product);
      });

      this.EventBus.$on("order-placed", result => {
        this.setNewCart();
      });
    },
    sendUpdatedProducts() {
      //Update a checkout product list
      this.EventBus.$emit("products-updated", this.cart.items);
    }
  },
  mounted() {
    //Set the cart data
    this.setCart();

    //Listen to the events
    this.listenEvents();
  }
};
</script>