<template>

    <div class="header-wishlist-dropdown">
        <h3 class="cart-dropdown-title">Lista želja</h3>
        <div class="cart-dropdown-table">
            <div class="dropdown-table-title-row">
                <div class="table-title-item dropdown-col-1">
                    Informacije o ponudi
                </div>
                <div class="table-title-item dropdown-col-3">
                    Cena
                </div>
            </div>
            <div class="dropdown-table-product-row" :key="index" v-for="item,index in items">
                <div class="table-product-desc dropdown-col-1">
                    <a :href="API.product.show + item.slug" class="table-product-desc-link">
                        <img :src="item.images[0].url" alt="PosebanPoklon"
                             class="table-product-image">
                        <span class="table-product-title">{{ item.title }}</span>
                    </a>
                </div>
                <div class="table-product-price dropdown-col-3">
                    <div class="product-price">
                        <span class="product-price">{{ item.price }}</span>
                        <span class="product-currency">{{ applicationParams.defaultCurrency }}</span>
                    </div>
                    <button class="table-product-cancel" @click="removeFromWishlist(item.id)">
                        <img src="/images/icons/cart_cancel_icon.svg" alt="PosebanPoklon"
                             class="table-product-cancel-icon">
                    </button>
                </div>
            </div>

            <!-- Btn -->
            <div class="dropdown-table-buttons-row">
                <div class="table-buttons-container">
                    <a href="/profile/wishlist" class="table-buttons-add">Lista želja</a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'HeaderWishlist',
        data() {

            return {
                items: [],
                hidden: false
            }

        },
        methods: {

            setItems(){

                if(this.isLoggedIn){

                    this.items = applicationParams.user.wishlist.products;

                }

            },
            updateList(id){

                let product = this.items.find(function(product){

                    return product.id === id;

                });

                let position = this.items.indexOf(product);

                this.items.splice(position, 1);

            },
            listenEvents(){

                //Update product list
                this.EventBus.$on('removed-from-wishlist', id => {

                    this.updateList(id);

                });

            }

        },
        mounted() {

            //Set the items list
            this.setItems();

            //Liten to events
            this.listenEvents();

        }
    }

</script>