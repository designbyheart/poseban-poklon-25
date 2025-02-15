<template>

    <section class="footer-container">
        <newsletter-section></newsletter-section>
        <footer class="home-footer container">
            <div class="footer-row footer-logo-row">
                <a href="/" class="footer-logo-link">
                    <img src="/images/header/posebanpoklon_logo.png" alt="Posebanpoklon" class="footer-logo-image">
                </a>
            </div>
            <div class="footer-row footer-desc-row">
                <div class="footer-desc-text">Već dve godine učestvujemo u najlepšim iznenađenjima. Naše poklone kupuju i dobijaju svi, jer smo napravili izbor za svaki džep i uzrast.</div>
            </div>
            <div class="footer-row footer-social-row">
                <div class="footer-social-icons">
                    <a :href="applicationParams.fb_url" class="footer-social-link" target="_blank">
                        <img src="/images/icons/facebook_icon_black.svg" alt="" class="footer-social-icon">
                    </a>
                </div>
                <div class="footer-social-icons">
                    <a :href="applicationParams.twitter_url" class="footer-social-link" target="_blank">
                        <img src="/images/icons/twitter_icon_black.svg" alt="" class="footer-social-icon">
                    </a>
                </div>
                <div class="footer-social-icons">
                    <a :href="applicationParams.instagram_url" class="footer-social-link" target="_blank">
                        <img src="/images/icons/instagram_icon_black.svg" alt="" class="footer-social-icon">
                    </a>
                </div>
                <div class="footer-social-icons">
                    <a :href="applicationParams.youtube_url" class="footer-social-link" target="_blank">
                        <img src="/images/icons/youtube_icon_black.svg" alt="" class="footer-social-icon">
                    </a>
                </div>
            </div>
            <div class="footer-row footer-links-row">
                <div class="footer-links-item">
                    <a href="/kontaktiraj-nas" class="footer-link" target="_blank">Kontakt</a>
                </div>
                <div class="footer-links-item">
                    <a href="/uslovi-koriscenja" class="footer-link" target="_blank">Pravila korišćenja</a>
                </div>
                <div class="footer-links-item">
                    <a href="/politika-privatnosti" class="footer-link" target="_blank">Politika privatnosti</a>
                </div>
            </div>
            <div class="footer-row footer-bank-row">
                <img class="maestro" src="/images/checkout/maestro.png"/>
                <img class="mastercard" src="/images/checkout/mastercard.png"/>
                <img class="dina" src="/images/checkout/dina_logo.png"/>
                <img class="visa" src="/images/checkout/visa.png"/>
                <img class="american" src="/images/checkout/american_logo.png"/>
                <a href="https://www.bancaintesa.rs/" target="_blank" class="bank-img-intesa">
                    <img class="intesa" src="/images/checkout/logo_intesa.png"/>
                </a>
                <a href="http://www.mastercard.com/rs/consumer/credit-cards.html" target="_blank" class="bank-img-securecode">
                    <img class="securecode" src="/images/checkout/securecode.gif"/>
                </a>
                <a href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html" target="_blank" class="bank-img-visa-secure">
                    <img class="visa-secure" src="/images/checkout/visa_secure.jpeg"/>
                </a>
            </div>
            <div class="footer-row footer-copyright-row">
                <p class="footer-copyright-text">
                    ©️ {{ currentYear }} PosebanPoklon
                </p>
            </div>
        </footer>
    </section>

</template>

<script>

    export default {
        name: 'CommonFooter',
        computed: {

            currentYear(){

                let date = new Date;

                return date.getFullYear();

            }

        }
    }

</script>