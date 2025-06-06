<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:m-0 m-4">
            <vx-card>
                <form name="login" action="/login" method="post">
                    <div slot="no-body" class="full-page-bg-color">
                        <div class="vx-row no-gutter justify-center items-center">
                            <div class="vx-col w-full d-theme-dark-bg">
                                <div class="p-8">
                                    <div class="vx-card__title mb-8">
                                        <h4 class="mb-4">{{ $t('auth.formTitle') }}</h4>
                                        <p>{{ $t('auth.formSubtitle') }}</p>
                                    </div>
                                    <vs-input
                                        icon="icon icon-user"
                                        icon-pack="feather"
                                        :label-placeholder="$t('auth.email')"
                                        name="email"
                                        v-model="email"
                                        class="w-full no-icon-border"/>

                                    <vs-input
                                        type="password"
                                        icon="icon icon-lock"
                                        icon-pack="feather"
                                        :label-placeholder="$t('auth.password')"
                                        name="password"
                                        v-model="password"
                                        class="w-full mt-6 no-icon-border"/>

                                    <input type="hidden" name="_token" :value="csrf">

                                    <div class="flex flex-wrap justify-between my-5">
                                        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">
                                            {{ $t('auth.rememberMe') }}
                                        </vs-checkbox>
                                        <router-link to="#">{{ $t('auth.forgotPassword') }}</router-link>
                                    </div>

                                    <vs-button class="float-right mb-3" @click="login">{{
                                            $t('auth.login')
                                        }}
                                    </vs-button>

                                    <vs-divider></vs-divider>

                                    <div class="social-login flex flex-wrap justify-between">
                                        <div class="social-login-buttons flex flex-wrap items-center mt-4">

                                            <!-- facebook -->
                                            <div class="bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fab"
                                                     data-icon="facebook-f"
                                                     class="text-white h-4 w-4 svg-inline--fa fa-facebook-f fa-w-9"
                                                     role="img" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 264 512">
                                                    <path fill="currentColor"
                                                          d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"></path>
                                                </svg>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </vx-card>
        </div>
    </div>
</template>

<script>

//Library for working with requests

export default {
    data() {
        return {
            email: '',
            password: '',
            checkbox_remember_me: false,
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    },
    methods: {
        login() {
            document.querySelector('form[name="login"]').submit();
        }
    }
}

</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
            background-color: #1551b1;
        }

        .bg-twitter {
            background-color: #00aaff;
        }

        .bg-google {
            background-color: #4285F4;
        }

        .bg-github {
            background-color: #333;
        }
    }
}
</style>
