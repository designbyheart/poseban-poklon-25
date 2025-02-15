<template>

    <vx-card :title="getFormTitle(isEditForm)" noShadow cardBorder>

        <vs-tabs class="px-0 overflow-visible">

            <vs-tab :label="getSectionTitle('general')">

                <div class="con-tab pt-3">

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">

                            <vs-input
                                    type="text"
                                    class="w-full"
                                    :label="getFieldLabel('general', 'title')"
                                    v-model="model.title"
                                    :danger="validateField('title')"
                                    val-icon-danger="close"
                            />

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('title')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                        <div class="vx-col w-full">

                            <!-- Select -->
                            <vs-select
                                    autocomplete
                                    class="w-full"
                                    :label="getFieldLabel('general', 'code')"
                                    v-model="model.code"
                                    :is-selected.sync="model.code"
                            >
                                <vs-select-item :key="index" :value="item.code" :text="item.code" v-for="item,index in currencies" />
                            </vs-select>

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('code')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                    </div>

                    <!-- Actions -->
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="!isEditForm">{{ $t('actions.create') }}</vs-button>
                            <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="isEditForm">{{ $t('actions.update') }}</vs-button>
                            <vs-button color="danger" type="border" class="mb-2" :to="{ name: indexRoute }">{{ $t('actions.cancel') }}</vs-button>
                        </div>
                    </div>

                </div>

            </vs-tab>

            <vs-tab :label="getSectionTitle('rates')" class="overflow-visible">

                <div class="con-tab pt-3">

                    <div class="vx-row mb-3 mx-0">

                        <div class="vx-col w-full mb-3 px-0">
                            <div class="vx-row mx-0" :key="index" v-for="item, index in rates">
                                <div class="vx-col px-0 mr-2">
                                    <label class="text-xs">{{ getFieldLabel('rates', 'value') }}</label>
                                    <vs-input
                                            type="number"
                                            class="w-full"
                                            v-model="item.value"
                                    />
                                </div>
                                <div class="vx-col px-0 mr-2">
                                    <label class="text-xs">{{ getFieldLabel('rates', 'rate_date') }}</label>
                                    <!-- Datepicker component -->
                                    <datepicker v-model="item.rate_date" format="dd.MM.yyyy" :open-date="defaultDate"></datepicker>
                                </div>
                                <div class="vx-col px-0">
                                    <label class="text-xs">{{ getFieldLabel('rates', 'actions') }}</label>
                                    <div class="flex">
                                        <vs-button @click="removeRate(index)" color="danger" icon="highlight_off" class="mr-2"></vs-button>
                                        <vs-button @click="saveRate(item)" color="primary" icon="save" v-show="isEditForm"></vs-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="vx-col w-full px-0">
                            <vs-button @click="addRate()" color="primary">{{ $t('actions.addNew') }}</vs-button>
                        </div>

                    </div>

                </div>

            </vs-tab>


        </vs-tabs>

    </vx-card>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Model, validations and types
    import { model, validations, formStructure } from "@/static/currency/currency";

    //Currency codes list
    import { currencies } from '@/static/currency/currenciesList';

    //Image manager
    import ImageUpload from '../../components/images/ImageUpload';

    export default {
        mixins: [ formHelper ],
        components: {ImageUpload},
        props: {
            isEditForm: Boolean,
            formModel: {

                type: String,
                default: 'currency'

            },
            indexRoute: {

                type: String,
                default: 'currencies'

            }
        },
        data() {

            return {
                formStructure,
                currencies,
                rates: [],
                rate: {
                    value: '',
                    rate_date: ''
                },
                showRateForm: false,
                defaultDate: new Date()
            }

        },
        validations: validations,
        methods: {
            addRate(){

                let new_rate = Object.assign({}, this.rate);

                this.rates.unshift(new_rate);

            },
            removeRate(index){

                if(this.isEditForm && this.rates[index].hasOwnProperty('id')){

                    let rate_id = this.rates[index].id;

                    this.deleteRate(rate_id);

                }

                this.rates.splice(index, 1);


            },
            deleteRate(id){

                let requestUrl = this.API.rate.delete + '/' + id;

                axios.delete(requestUrl)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.deletedSuccess', 'success', 'rate');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            saveRate(rate){

                let existingRate = rate.hasOwnProperty('id');

                if(existingRate){

                    this.updateRate(rate);

                }
                else{

                    this.createRate(rate);

                }

            },
            createRate(rate){

                //Normalize rate date
                rate.rate_date = this.convertDate(rate.rate_date);

                let requestUrl = this.API.rate.create;

                let requestParams = rate;

                let currency_id = this.model.id;

                requestParams.currency_id = currency_id;

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.createdSuccess', 'success', 'rate');

                            }
                            else if (response.data.type === 'error'){

                                this.showNotification('error', response.data.message_code, 'warning', 'rate');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            updateRate(rate){

                //Normalize rate date
                rate.rate_date = this.convertDate(rate.rate_date);

                let requestUrl = this.API.rate.update + '/' + rate.id;

                let requestParams = rate;

                axios.put(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.updatedSuccess', 'success', 'rate');

                            }
                            else if (response.data.type === 'error'){

                                this.showNotification('error', response.data.message_code, 'warning', 'rate');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            create(){

                //Assemble an item
                this.assembleItem();

                let requestParams = this.model;

                let requestUrl = this.API[this.instance].create;

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.createdSuccess', 'success');

                                this.afterCreateCallback();

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            update(){

                //Assemble an item
                this.assembleItem();

                let requestParams = this.model;

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].update + '/' + id;

                axios.put(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.updatedSuccess', 'success');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            afterCreateCallback(){

                const component = this;

                setTimeout(function () {
                    component.redirectToIndex(component.indexRoute);
                    component.setModel();
                }, 500);

            },
            setModel(){

                this.model = Object.assign({}, model);

            },
            getSingleItem(){

                let id = this.$route.params.id;

                let requestParams = {

                    params: {

                        id: id

                    }

                };

                let requestUrl = this.API[this.instance].single;

                axios.get(requestUrl, requestParams).then(response => {

                    this.model = response.data;
                    this.rates = response.data.rates

                });

            },
            loadData(){

                //Get products
                this.getProducts();

                //Get categories
                this.getCategories();

                //Get the data for editing
                if(this.isEditForm){

                    this.getSingleItem();

                }

            },
            assembleItem(){

                const component = this;

                //Convert rates date
                this.rates.forEach(function(rate){

                    rate.rate_date = component.convertDate(rate.rate_date);

                });

                this.model.rates = this.rates

            },
            submitForm() {

                if(!this.$v.$invalid){

                    if(this.isEditForm){

                        this.update();

                    }
                    else{

                        this.create();

                    }

                }
                else{

                    this.showNotification('error', 'validation.invalidForm', 'danger');

                }

            }
        },
        mounted() {

            //Set the model
            this.setModel();

            //Load the necessary data
            this.loadData();

        },
        created: function () {

            //Set an instance for the form rendering
            this.setInstance(this.formModel);

        }

    }

</script>

<style>
    body .con-vs-tabs .con-slot-tabs{
        overflow: visible;
    }
</style>