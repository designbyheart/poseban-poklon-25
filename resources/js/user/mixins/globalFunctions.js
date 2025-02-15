//Library for working with requests
import axios from 'axios';

//Application routes
import { API } from "../helpers/api";

//Global event bus
import { EventBus } from "../EventBus";

//Utilize ready functions for usage across the dashboard
const globalFunctions = {
    data() {
        return {
            applicationParams: {
                currency: 'RSD',
                user: null,
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                images: ''
            },
            API,
            EventBus
        }
    },
    computed: {

        isLoggedIn(){

            return this.applicationParams.user !== null;

        }

    },
    methods: {
        //Convert a date to format that allows to save it to the database
        convertDate(date, format, connection_string) {
            let selectedDate = new Date(date);
            let dateDay = selectedDate.getDate();
            let dateMonth = selectedDate.getMonth()+1;
            let dateYear = selectedDate.getFullYear();

            if(dateDay < 10){
                dateDay = '0' + dateDay;
            }

            if(dateMonth < 10){
                dateMonth = '0' + dateMonth;
            }

            let connector = '-';

            if(connection_string !== undefined){

                connector = connection_string;

            }

            if(format === 'd/m/y'){

                return dateDay + connector + dateMonth + connector + dateYear;

            }
            else{

                return dateYear + connector + dateMonth + connector + dateDay;

            }

        },
        //Show a toasted notification
        showNotification(type, text){

            /*let toastOptions = {

                position: 'bottom-right',
                duration: '3000',
                type: type

            };

            this.$toasted.show(text, toastOptions);*/

            let options = {
                type: type,
                title: "<p style='font-family: Rubik-medium;'>" + text + "</p>",
                confirmButtonColor: '#ed2025'
            };

            this.$swal(options);

        },
        //Validate a form field
        validateField(model, field){

            if(this.$v[model][field]){

                return this.$v[model][field].$invalid;

            }

        },
        //Set the application parameters
        setApplicationParams(){

            let instance = this;

            this.applicationParams = window.applicationParams;

            /*window.addEventListener('load', function () {

                if(window.applicationParams.user !== null){

                    instance.applicationParams.user = Object.assign({}, window.applicationParams.user);

                }

            });*/

        },
        openAuthModal(type){

            //Open the auth modal
            this.EventBus.$emit('open-auth-modal', type);

        },
        addToWishlist(product){

            if(this.isLoggedIn){

                let wishlistId = this.applicationParams.user.wishlist.id;

                let productsList = [product.id];

                let requestUrl = this.API.wishlist.update + wishlistId;

                let requestParams = {
                    products: productsList
                };

                axios.put(requestUrl, requestParams).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'Ponuda je dodata u listu želja.');

                    }

                });

                //Update user's wishlist
                this.applicationParams.user.wishlist.products.push(product);

                this.EventBus.$emit('added-to-wishlist', product.id);

            }
            else{

                this.openAuthModal('login');

            }

        },
        removeFromWishlist(productId){

            let wishlistId = this.applicationParams.user.wishlist.id;

            let productsList = [productId];

            let requestUrl = this.API.wishlist.update + wishlistId + '/remove';

            let requestParams = {
                products: productsList
            };

            axios.post(requestUrl, requestParams).then(response => {

                if(response.data === 'success'){

                    this.showNotification('success', 'Proizvod je uklonjen iz liste želja.');

                }

            });

            //Update user's wishlist
            let wishlistProducts = this.applicationParams.user.wishlist.products;

            let removedProduct = wishlistProducts.find(function (product) {
                return product.id === productId;
            });

            let productIndex = wishlistProducts.indexOf(removedProduct);

            this.EventBus.$emit('removed-from-wishlist', productId);

        },
        redirectToUrl(url){

            window.location.replace(url);

        }
    },
    mounted(){

        this.setApplicationParams();

    }
};

export default {
    install (Vue, options){
        Vue.mixin(globalFunctions)
    }
}