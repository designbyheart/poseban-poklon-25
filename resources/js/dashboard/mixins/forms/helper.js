//Library for working with requests
import axios from 'axios';

//Event bus for sending and processing global events
import EventBus from '../../EventBus';

//Datepicker component
import Datepicker from 'vuejs-datepicker';

const formHelper = {
    components: { Datepicker },
    props: {
        statuses: {
            type: Array,
            default() {
                return [
                    {
                        title: this.$t('statuses.general.published'),
                        value: true
                    },
                    {
                        title: this.$t('statuses.general.hidden'),
                        value: false
                    }
                ]
            }
        }
    },
    data() {

        return {

            instance: '',
            model: {},
            products: [],
            producents: [],
            categories: [],
            banners: [],
            filters: [],
            attributes: [],
            selectedImages: [],
            shippingMethods: [],
            paymentMethods: [],
            orderStatuses: []

        }

    },
    methods: {

        setInstance(instance){

            this.instance = instance;

        },
        getFormTitle(isEdit){

            if(isEdit){

                return this.$t('forms.' + this.instance + '.titles.edit');

            }
            else{

                return this.$t('forms.' + this.instance + '.titles.create');

            }

        },
        getSectionTitle(slug){

            return this.$t('forms.' + this.instance + '.sections.' + slug + '.label');

        },
        //Newer and more advanced method for retrieving a form section title
        getFormSectionTitle(slug){

            return this.$t('models.' + this.instance + '.form.' + slug);

        },
        //Newer and more advanced method for retrieving a model property name
        getPropertyTitle(property){

            return this.$t('models.' + this.instance + '.properties.' + property);

        },
        getFieldLabel(section, field){

            return this.$t('forms.' + this.instance + '.sections.' + section + '.fields.' + field);

        },
        getProducts(params) {

            axios.get(this.API.product.list, params).then(response => {

                this.products =  response.data.data

            });

        },
        getProducents(params) {

            axios.get(this.API.producent.list, params).then(response => {

                this.producents =  response.data.data

            });

        },
        getCategories(params) {

            axios.get(this.API.category.list, params).then(response => {

                this.categories =  response.data.data

            });

        },
        getBanners(params) {

            axios.get(this.API.banner.list, params).then(response => {

                this.banners = response.data.data

            });

        },
        getFilters(params) {

            axios.get(this.API.filter.list, params).then(response => {

                this.filters = response.data.data

            });

        },
        getAttributes(params) {

            axios.get(this.API.attribute.list, params).then(response => {

                this.attributes = response.data.data

            });

        },
        getShippingMethods(){

            let requestUrl = this.API.shippingMethod.list;

            let requestParams = this.defaultSortParams();

            axios.get(requestUrl, {params: requestParams}).then(response => {

                this.shippingMethods = response.data.data;

            });

        },
        getPaymentMethods(){

            let requestUrl = this.API.paymentMethod.list;

            let requestParams = this.defaultSortParams();

            axios.get(requestUrl, {params: requestParams}).then(response => {

                this.paymentMethods = response.data.data;

            });

        },
        getOrderStatuses(){

            let requestUrl = this.API.orderStatus.list;

            axios.get(requestUrl).then(response => {

                this.orderStatuses = response.data.data;

            });

        },
        searchProducts(search, loading){

            let requestParams = {

                params: {
                    search: search
                }

            };

            //Search products
            this.getProducts(requestParams);

        },
        searchCategories(search, loading){

            let requestParams = {

                params: {
                    search: search
                }

            };

            //Search products
            this.getCategories(requestParams);

        },
        searchFilters(search, loading){

            let requestParams = {

                params: {
                    search: search
                }

            };

            //Search products
            this.getFilters(requestParams);

        },
        showNotification(type, message, color, customInstance, isPlural){

            let instance = '';

            let count = 1;

            if(isPlural){

                count = 2;

            }

            if(customInstance){

                instance = this.$tc('models.' + customInstance + '.title', count);

            }
            else{

                instance = this.$tc('models.' + this.instance + '.title', count);

            }

            let title = this.$t('messages.' + type);

            let text = this.$tc('messages.' + message, count, { instance: instance });

            this.$vs.notify(
                {
                    title: title,
                    text:  text,
                    color: color
                }
            );

        },
        getOptions(options){

            //Get the form's field options by the property name
            return this[options];

        },
        normalizeData(options){

            let normalized = [];

            options.forEach(function(option){

                normalized.push(option.id);

            });

            return normalized;

        }
    },
    created() {

    },
    mounted: function(){

    }

};

export default formHelper;