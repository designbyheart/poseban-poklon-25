//Application routes
import {API} from "@/mixins/api/api";

//Library for working with requests
import axios from 'axios';

const tableHelper = {
    props: {
    },
    data() {

        return {

            instance: '',
            items: [],
            per_page: 20,
            pagination: {
                currentPage: 1,
                nextPageUrl: '',
                totalPages: 1
            },
            search: '',
            sortKey: '',
            sortOrder: '',
            API

        }

    },
    watch: {
        'pagination.currentPage': function(value, oldValue) {

            this.getItems();

        },
        'search': function () {

            this.getItems();

        }
    },
    methods: {

        setInstance(instance){

            this.instance = instance;

        },
        getItems(params) {

            const instance = this.instance;

            let requestParams = {

                params: {

                    per_page: this.per_page,
                    sort_key: 'created_at',
                    sort_order: 'desc'

                }

            };

            if(params !== undefined){

                requestParams.params = params;

            }

            if(this.search !== ''){

                requestParams.params.search = this.search;

                this.pagination.currentPage = 1;

            }

            let requestUrl = this.API[instance].list;

            let selectedPage = this.pagination.currentPage;

            if(this.pagination.nextPageUrl !== '' && this.search === '') {

                requestUrl = requestUrl + '?page=' + selectedPage;

            }

            axios.get(requestUrl, requestParams).then(response => {
                this.items = response.data.data;
                this.pagination.nextPageUrl = response.data.next_page_url;
                this.pagination.totalPages = response.data.last_page;
            });

        },
        handleSort(key, active) {

            let sort_order = active ? 'desc' : 'asc';

            let params = {
                sort_key: key,
                sort_order: sort_order
            };

            this.getItems(params);

        },
        deleteItem(id) {

            const instance = this.instance;

            axios.delete(this.API[instance].delete + '/' + id)
                .then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.deletedSuccess', 'success');

                            //Update the items list
                            this.getItems();

                        }

                    })
                .catch(
                    error => {

                        this.showNotification('error', 'request.error', 'danger');

                    }
                );

        },
        getTableTitle(){

            return this.$t('tables.' + this.instance + '.title');

        },
        getColumnTitle(model){

            return this.$t('models.' + this.instance + '.properties.' + model);

        },
        getPropertyTitle(property){

            return this.$t('models.' + this.instance + '.properties.' + property);

        },
        convertDate(date){

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

            let convertedDate = dateDay + '.' + dateMonth + '.' + dateYear;

            return convertedDate;

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
        showDeleteAlert(id){

            let deleteItemFunction = this.deleteItem.bind(null, id);

            let instance = this.$tc('models.' + this.instance + '.title', 1);

            let text = this.$t('messages.confirmation.delete', { instance: instance });

            this.$vs.dialog({
                color:'primary',
                title: 'Confirm',
                text: text,
                accept: deleteItemFunction
            });

        }

    },
    mounted: function(){

    }

};

export default tableHelper;