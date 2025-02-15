<template>

    <div class="product-wish-list-container">
        <div class="wish-list-btn" v-bind:class="{ 'wish-btn-active': isInWishlist }">
            <img src="/images/icons/wish_icon_opacity.svg" alt="PosebanPoklon" class="wish-list-image" v-show="!isInWishlist" @click="addToWishlist(product)">
            <img src="/images/icons/wish_icon_fill.svg" alt="PosebanPoklon" class="wish-list-image-fill" v-show="isInWishlist" @click="removeFromWishlist(product.id)">
        </div>
    </div>

</template>

<script>

    export default {

        name: 'WishlistButtons',
        props: {
            product: {
                type: Object
            }
        },
        data(){

            return {

                isInWishlist: false

            }

        },
        methods: {

            setWishlistStatus(){

                this.isInWishlist = this.product.in_wishlist;

            },
            listenEvents(){

                //Update product's wishlist status
                this.EventBus.$on('added-to-wishlist', product => {

                    this.isInWishlist = true;

                });

                this.EventBus.$on('removed-from-wishlist', product => {

                    this.isInWishlist = false;

                });

            }

        },
        mounted(){

            //Set the product wishlist status
            this.setWishlistStatus();

            //Listen to events
            this.listenEvents();

        }

    }

</script>