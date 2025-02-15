<template>

    <section class="profile-container container">
        <div class="row">
            <profile-sidebar></profile-sidebar>
            <div class="col-lg-9 col-md-9 profile-content-history">
                <div class="profile-information-form">
                    <h4 class="information-form-title">
                        Lista želja
                    </h4>
                    <div class="information-history-table">
                        <div class="history-row">
                            <div class="history-col-1 history-item">
                                <span class="history-item-title">Informacije o ponudi</span>
                            </div>
                        </div>
                        <div class="history-row" :key="index" v-for="product,index in productsList">
                            <div class="history-col-1 history-item">
                                <a :href="API.product.show + product.slug">
                                    <span class="history-item-text">{{ product.title }}</span>
                                </a>
                            </div>
                            <div class="history-col-2 history-item">
                                <span class="history-item-text" @click="removeFromWishlist(product.id)">Ukloniti</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    export default {
        name: 'UserWishlist',
        props: {
            products: {
                type: Array
            }
        },
        data(){

            return {
                productsList: []
            }

        },
        methods: {
            setProductsList(){

                this.productsList = this.products;

            },
            updateList(id){

                let product = this.productsList.find(function(product){

                    return product.id === id;

                });

                let position = this.productsList.indexOf(product);

                this.productsList.splice(position, 1);

            },
            listenEvents(){

                //Update product list
                this.EventBus.$on('removed-from-wishlist', id => {

                    this.updateList(id);

                });

            }
        },
        mounted(){

            //Set initial products list
            this.setProductsList();

            //Listen to events
            this.listenEvents();

        }
    }

</script>