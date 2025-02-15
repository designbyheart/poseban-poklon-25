<template>

    <section class="home-newsletter-container">
        <div class="home-newsletter-row container">
            <div class="newsletter-col newsletter-col-left">
                <div class="newsletter-text">
                    <h3 class="newsletter-title">HAJDE DA SE PRATIMO</h3>
                    <p class="newsletter-desc">
                        Često delimo nagrade i priređujemo iznenađenja, a i volimo da komuniciramo sa našim poklondžijama
                    </p>
                </div>
                <div class="newsletter-social">
                    <div class="social-item">
                        <a :href="applicationParams.fb_url" class="social-links">
                            <img src="/images/icons/facebook_icon.svg" alt="PosebanPoklon" class="social-icon">
                        </a>
                    </div>
                    <div class="social-item">
                        <a :href="applicationParams.twitter_url" class="social-links">
                            <img src="/images/icons/twitter_icon.svg" alt="PosebanPoklon" class="social-icon">
                        </a>
                    </div>
                    <div class="social-item">
                        <a :href="applicationParams.instagram_url" class="social-links">
                            <img src="/images/icons/instagram_icon.svg" alt="PosebanPoklon" class="social-icon">
                        </a>
                    </div>
                    <div class="social-item">
                        <a :href="applicationParams.youtube_url" class="social-links">
                            <img src="/images/icons/youtube_icon.svg" alt="PosebanPoklon" class="social-icon">
                        </a>
                    </div>
                </div>
            </div>
            <div class="newsletter-col newsletter-col-right">
                <div class="newsletter-text">
                    <h3 class="newsletter-title">PRIJAVI SE NA NEWSLETTER</h3>
                    <p class="newsletter-desc">
                        Maksimalno jednom sedmično šaljemo više nego korisne savete, kodove za specijalne popuste i slične
                        zanimljive stvari. Bez spamovanja
                    </p>
                </div>
                <div class="newsletter-form-container">
                    <div class="newsletter-form">
                        <validation-provider ref="newsletterEmail" rules="required|email" v-slot="{ errors }">
                            <input type="text" class="newsletter-input" placeholder="Email" v-model="customerEmail">
                        </validation-provider>
                        <button type="submit" class="newsletter-button" @click="validateForm">Prijavi se</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    //Library for sending requests
    import axios from 'axios';

    //Validation
    import { ValidationProvider } from 'vee-validate';

    export default {
        name: 'NewsletterSection',
        components: {ValidationProvider},
        data() {

            return {
                customerEmail: ''
            }

        },
        methods: {

            subscribe(){

                let requestUrl = this.API.newsletterSubscription.create;

                let requestParams = {
                    email: this.customerEmail
                };

                axios.post(requestUrl, requestParams).then(response => {

                    if(response.data === 'success'){

                        this.$swal({
                            title: 'Tvoja prijava za newsletter je uspešna!',
                            type: 'success'
                        });

                    }

                }).catch(error => {

                    this.$swal({
                        title: 'Desila se greška. Pokušaj ponovo.',
                        type: 'error'
                    });

                });

            },
            async validateForm(){

                const newsletterEmailInput = await this.$refs.newsletterEmail.validate();

                if(newsletterEmailInput.valid){

                    this.subscribe();

                }
                else{

                    this.showNotification('error', 'The email should be valid.')

                }

            }

        }
    }

</script>