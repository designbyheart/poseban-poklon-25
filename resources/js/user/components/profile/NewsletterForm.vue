<template>

    <div class="col-lg-9 col-md-9 profile-content-newsletter">
        <div class="profile-information-form">
            <h4 class="information-form-title">
                Newsletter podaci
            </h4>
            <p class="information-form-text">Budi u toku s ponudama i posebnim pogodnostima putem –emaila.</p>
            <div class="information-form-checkbox">
                <label class="product-item-label">
                    <input type="checkbox" v-model="subscriptionStatus" class="product-item-checkbox" checked>
                    <span class="product-item-check"></span>
                    Prijavite se na newsletter
                </label>
            </div>
            <div class="information-form-container form-bottom">
                <button class="information-form-btn" @click="submitForm">Sačuvaj</button>
            </div>
        </div>
    </div>

</template>

<script>

    import axios from 'axios';

    export default {

        name: 'NewsletterForm',
        props: {

            currentUser: {
                type: Object
            },
            currentStatus: {
                type: Boolean
            }

        },
        data(){
            return {
                user: {},
                subscriptionStatus: ''
            }
        },
        methods: {

            createSubscription(){

               let requestUrl = this.API.newsletterSubscription.create;

               let requestParams = {
                   'email': this.user.email
               };

                axios.post(requestUrl, requestParams).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'Tvoja prijava za newsletter je uspešna.');

                    }

                }).catch(error => {

                    this.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                });

            },
            deleteSubscription(){

                let requestUrl = this.API.newsletterSubscription.remove;

                axios.post(requestUrl).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'Tvoja odjava sa newslettera je uspešna.');

                    }

                }).catch(error => {

                    this.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                });

            },
            setFormData(){

                this.user = this.currentUser;
                this.subscriptionStatus = this.currentStatus;

            },
            submitForm() {

                if(this.subscriptionStatus === true){

                    this.createSubscription();

                }
                else{

                    this.deleteSubscription();

                }

            }

        },
        mounted() {

            //Set form data
            this.setFormData();

        }

    }

</script>