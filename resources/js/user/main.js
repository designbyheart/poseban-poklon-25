/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
==========================================================================================*/


import Vue from 'vue'

// Globally registered public components
import '../user/userGlobalComponents.js'

// Globally registered functions
import globaFunctions from './mixins/globalFunctions';

Vue.use(globaFunctions);

//Form model validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

//i18n
//import i18n from '../dashboard/translation/i18n';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue().$mount('#app')
