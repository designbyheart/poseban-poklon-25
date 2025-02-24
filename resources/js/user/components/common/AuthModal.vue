<template>

    <div class="modal-login-container" v-if="isActive">
        <!--Login form-->
        <div class="modal-login-row" v-if="isLoginForm">
            <div class="modal-btn-close" @click="close">
                <button class="modal-btn">
                    <img src="/images/icons/modal_close_icon.png" alt="PosebanPoklon" class="modal-btn-image">
                </button>
            </div>
            <div class="modal-login-col col-signin">
                <h3 class="modal-title">
                    Uloguj se
                </h3>
                <div class="signin-form">
                    <form name="login" action="/login" method="post">
                        <input type="text" name="email" v-model="form.email" @input="$v.form.email.$touch" class="signin-input" placeholder="Email">
                        <span class="error" v-if="$v.form.email.$anyError && $v.form.email.$dirty">Polje nije validno.</span>
                        <input type="password" name="password" v-model="form.password" @input="$v.form.password.$touch" class="signin-input" placeholder="Šifra">
                        <span class="error" v-if="$v.form.password.$anyError && $v.form.password.$dirty">Polje je obavezno.</span>
                        <input type="hidden" name="_token" :value="applicationParams.csrf">
                        <div class="signin-btn-row">
                            <div class="signin-btn" @click="submitForm">Uloguj se</div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-login-col col-signup">
                <div class="col-signup-info">
                    <h3 class="modal-title">
                        Registracija
                    </h3>
                    <p class="signup-desc">
                        Unesi svoje podatke za registraciju
                    </p>
                </div>
                <div class="signup-btn-row">
                    <div class="signup-btn" @click="switchFormType('register')">Registracija</div>
                </div>
            </div>
        </div>

        <!--Registration form-->
        <div class="modal-login-row" v-if="isRegistrationForm">
            <div class="modal-btn-close" @click="close">
                <button class="modal-btn">
                    <img src="/images/icons/modal_close_icon.png" alt="PosebanPoklon" class="modal-btn-image">
                </button>
            </div>
            <div class="modal-login-col col-signup">
                <h3 class="modal-title">
                    Registracija
                </h3>
                <div class="signin-form">
                    <form name="register" action="/register" method="post">
                        <input type="text" id="name" name="name" v-model.trim="form.name" @input="$v.form.name.$touch" class="signin-input" placeholder="Ime">
                        <span class="error" v-if="$v.form.name.$anyError && $v.form.name.$dirty">Polje je obavezno.</span>
                        <input type="email" id="email" name="email" v-model.trim="form.email" @input="$v.form.email.$touch" class="signin-input" placeholder="Email">
                        <span class="error" v-if="$v.form.email.$anyError && $v.form.email.$dirty">Polje nije validno.</span>
                        <input type="password" id="password" name="password" v-model.trim="form.password" @input="$v.form.password.$touch" class="signin-input" placeholder="Šifra">
                        <span class="error" v-if="$v.form.password.$anyError && $v.form.password.$dirty">Polje je obavezno.</span>
                        <input type="password" id="password-confirm" name="password_confirmation" v-model.trim="form.password_confirmation" @input="$v.form.password_confirmation.$touch" class="signin-input" placeholder="Potvrdi šifru">
                        <span class="error" v-if="$v.form.password_confirmation.$anyError && $v.form.password.$dirty">Šifre se ne poklapaju.</span>
                        <input type="hidden" name="_token" :value="applicationParams.csrf">
                        <div class="modal-form-checkbox">
                            <label class="modal-item-label">
                                <input type="checkbox" class="modal-item-checkbox" v-model="form.privacyPolicy" @change="$v.form.privacyPolicy.$touch">
                                <span class="modal-item-check"></span>
                                Slažem se sa Politikom Privatnosti
                            </label>
                            <span class="error" v-if="$v.form.privacyPolicy.$anyError && $v.form.privacyPolicy.$dirty">Polje je obavezno.</span>
                        </div>
                        <div class="signin-btn-row">
                            <div class="signin-btn" @click="submitForm">Registracijae</div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-login-col col-signin">
                <div class="col-signup-info">
                    <h3 class="modal-title">
                        Uloguj se
                    </h3>
                    <p class="signup-desc">
                        Unesi svoje podatke za logovanje
                    </p>
                </div>
                <div class="signup-btn-row">
                    <div class="signup-btn" @click="switchFormType('login')">Uloguj se</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    //Validation library
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

    export default {
        name: 'AuthModal',
        data() {

            return {

                isActive: false,
                type: 'login',
                form: {}

            }

        },
        computed: {

            isLoginForm(){

                return this.type === 'login';

            },
            isRegistrationForm(){

                return this.type === 'register';

            }

        },
        validations(){

            if(this.type === 'login'){

                return {
                    form: {

                        email: {
                            email,
                            required
                        },
                        password: {
                            required
                        }

                    }
                }

            }
            else if(this.type === 'register'){

                return {

                    form: {

                        name: {

                            required

                        },
                        email: {

                            required,
                            email

                        },
                        password: {

                            required

                        },
                        password_confirmation: {

                            sameAsPassword: sameAs('password')

                        },
                        privacyPolicy: {
                            required
                        }

                    }

                }

            }

        },
        methods: {

            listenEvents(){

                this.EventBus.$on('open-auth-modal', (type) => {

                    this.type = type;
                    this.isActive = true;

                });

            },
            submitForm(){

                if(!this.$v.$invalid){

                   if(this.isLoginForm){

                       document.querySelector('form[name="login"]').submit();

                   }
                   else if(this.isRegistrationForm){

                       document.querySelector('form[name="register"]').submit();

                   }

                }


            },
            switchFormType(type){

                if(type === 'login' || type === 'register'){

                    this.type = type;

                }

            },
            close(){

                this.isActive = false;

            }

        },
        mounted(){

            //Listen to the external events
            this.listenEvents();

        }
    }

</script>
