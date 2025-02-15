/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

//Access control
import acl from './auth/acl'

// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// Vuesax Admin Filters
import './filters/filters'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'

//import VeeValidate from 'vee-validate'
//Vue.use(VeeValidate)

//Form model validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//i18n
import i18n from './translation/i18n';

//SEO meta
import seo from './mixins/seo/seo';

//Use the SEO meta
Vue.use(seo);

//Global application data
import applicationData from './mixins/global/applicationData';

//Use the global application data
Vue.use(applicationData);

//Global dashboard functions
import dashboardFunctions from './mixins/global/dashboardFunctions';

//Use the global dashboard functions
Vue.use(dashboardFunctions);

Vue.config.productionTip = false

new Vue({
    router,
    acl,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
