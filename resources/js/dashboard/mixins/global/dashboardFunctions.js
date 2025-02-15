//Library for working with requests
import axios from 'axios';

//Application routes
import { API } from "@/mixins/api/api";

//Utilize ready functions for usage across the dashboard
const dashboardFunctions = {
    data() {
        return {
            API
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
        //Get data list by instance
        loadItems(instance, params){

            let items = [];

            axios.get(this.API[instance].list, params)
                .then(response => {

                    response.data.data.forEach(function(product){

                        items.push(product);

                    });

                });
                return items;

        },
        //Show a notification for user
        showNotification(instance, type, message, color, isPlural){

            let instanceSlug = instance;
            let instanceName = '';

            let count = 1;

            if(isPlural){

                count = 2;

            }

            if(instanceSlug){

                instanceName = this.$tc('models.' + instanceSlug + '.title', count);

            }

            let title = this.$t('messages.' + type);

            let text = this.$tc('messages.' + message, count, { instance: instanceName });

            this.$vs.notify(
                {
                    title: title,
                    text:  text,
                    color: color
                }
            );

        },
        //Validate user input
        validateField(field){


            if(this.$v.model[field]){

                return this.$v.model[field].$invalid;

            }

        },
        //Redirect to an index page
        redirectToIndex(route){

            this.$router.push({ name: route });

        },
        //Deaful sort parameters for loading items
        defaultSortParams(){

            let sortParams = {
                sort_key: 'created_at',
                sort_order: 'desc'
            };

            return sortParams;

        },
        //Prepare an address for displaying
        buildAddress(order){

            let address = '';

            if(order.rec_name !== null) {
                address += order.rec_name + ' ';
            }
            if(order.rec_surname !== null){
                address += order.rec_surname;
            }
            if(order.address_one !== null){
                address += ', ';
                address += order.address_one;
            }
            if(order.address_two !== null){
                address += '/';
                address += order.address_two + ', ';
            }
            if(order.city !== null){
                address += order.city + ', ';
            }
            if(order.zip_code !== null){
                address += order.zip_code + ', ';
            }
            if(order.country !== null){
                address += order.country;
            }

            return address;

        }
    }
};

export default {
    install (Vue, options){
        Vue.mixin(dashboardFunctions)
    }
}