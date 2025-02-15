<template>

    <div class="product-stars-row">
        <div class="product-star product-star-icon" v-bind:class="star.class" :key="index" v-for="star, index in stars" v-on:click="postReview(star)"></div>
        <span class="product-star-number">{{ reviewsCount }}</span>
    </div>

</template>

<script>

    //Library for sending requests
    import axios from 'axios';

    export default {
        name: 'StarsRating',
        props: {
            productId: {
                type: Number
            },
            rating: {
                type: Number,
                default: 0
            },
            reviewsCount: {
                type: Number,
                default: 0
            }
        },
        data() {

            return {

                filledStarImage: {
                    class: 'filled'
                },
                borderedStarImage: {
                    class: 'bordered'
                },
                stars: []

            }

        },
        methods: {

            buildStars(){

                //Clear the list
                this.stars = [];

                for(let i = 0; i < this.rating; i++){

                    let star = Object.assign({}, this.filledStarImage);

                    this.stars.push(star);

                }

                let difference = 5 - this.stars.length;

                if(difference > 0){

                    for(let i = 0; i < difference; i++){

                        let star = Object.assign({}, this.borderedStarImage)

                        this.stars.push(star);

                    }

                }

                for(let i = 0; i < this.stars.length; i++){

                    let value = i + 1;

                    this.stars[i].value = value;

                }

            },
            postReview(star){

                if(this.applicationParams.user !== null){

                    let requestUrl = this.API.review.create;

                    let requestParams = {
                        product_id: this.productId,
                        rating: star.value
                    };

                    let component = this;

                    axios.post(requestUrl, requestParams).then(response => {

                        if(response.data === 'success'){

                            component.showNotification('success', 'Recenzija je uspešno dodata.');

                        }

                    }).catch(error => {

                        if(error.response.status === 405){

                            component.showNotification('warning', 'Već ste ostavili recenziju za ovaj poklon.');

                        }
                        else{

                            component.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                        }

                    });

                }
                else{

                    this.showNotification('error', 'Molimo da se prijavite da biste mogli da ostavite recenziju.');

                }

            }

        },
        mounted(){

            //Build stars list
            this.buildStars();

        }

    }

</script>

<style>

    .product-star{

        width: 25px;
        height: 25px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;

    }

    .product-star.filled{
        background-image: url('/images/icons/product_price_star.svg');
    }

    .product-star.bordered{
        background-image: url('/images/icons/star-border.svg');
    }

    .product-star.bordered:hover{
        background-image: url('/images/icons/product_price_star.svg');
    }

</style>