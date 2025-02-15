<template>

    <div class="product-btn-container">
        <div class="product-btn" @click="addProduct()">Dodaj u korpu</div>
    </div>

</template>

<script>

    export default {

        name: 'AddToCart',
        props: {
            product: {
                type: Object
            }
        },
        methods: {

            addProduct(){

                //Send a product to the cart
                this.EventBus.$emit('add-to-cart', this.product);

            }

        }

    }

</script>