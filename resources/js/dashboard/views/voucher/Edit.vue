<template>

    <vx-card :title="getFormTitle(true)" noShadow cardBorder>

        <div class="vx-row mb-6">

            <div class="vx-col w-1/2 flex">
                <vs-button class="mr-3" icon="print" size="small" :href="getPrintUrl(model.id, 'a4')" target="_blank">A4</vs-button>
                <vs-button class="mr-3" icon="print" size="small" :href="getPrintUrl(model.id, 'a5')" target="_blank">A5</vs-button>
                <vs-button class="mr-3" icon="send" size="small" @click="showSendPopup">{{ $t('actions.send') }}</vs-button>
            </div>

            <div class="vx-col w-1/2 flex justify-end">
                <vs-button color="danger" icon="delete" size="small" @click="showDeleteAlert">{{ $t('actions.delete') }}</vs-button>
            </div>

        </div>

        <div class="vx-row mb-6">

            <div class="vx-col w-1/4">
                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('voucherCode') }}</p>
                <div class="flex items-center flex-grow-1">
                    <p>{{ model.voucher_code }}</p>
                </div>
            </div>

            <div class="vx-col w-1/4">
                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('activationCode') }}</p>
                <div class="flex items-center flex-grow-1">
                    <p>{{ model.activation_code }}</p>
                </div>
            </div>

            <div class="vx-col w-1/4">
                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('endDate') }}</p>
                <!-- Datepicker component -->
                <datepicker v-model="model.end_date" format="dd.MM.yyyy"></datepicker>
            </div>

            <div class="vx-col w-1/4">
                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('activated') }}</p>
                <div class="flex items-center flex-grow-1">
                    <vs-icon icon="check" class="mr-3" color="success" size="small" v-if="model.activated"></vs-icon>
                    <vs-icon icon="close" class="mr-3" color="danger" size="small" v-if="!model.activated"></vs-icon>
                    <vs-button size="small" v-if="!model.activated" @click="activateVoucher">{{ $t('actions.activate') }}</vs-button>
                    <vs-button size="small" v-if="model.activated" @click="deactivateVoucher">{{ $t('actions.deactivate') }}</vs-button>
                </div>
            </div>

        </div>

        <div class="vx-row mb-6">

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('title') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.title"
                        :danger="validateField('title')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('title')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('description') }}</p>
                <vs-textarea
                        v-model="model.description">
                </vs-textarea>

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('description')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('personalMessage') }}</p>
                <vs-textarea
                        v-model="model.personal_message">
                </vs-textarea>

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('personal_message')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('location') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.location"
                        :danger="validateField('location')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('location')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('weather') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.weather"
                        :danger="validateField('weather')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('weather')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('duration') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.duration"
                        :danger="validateField('duration')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('duration')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('visitors') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.visitors"
                        :danger="validateField('visitors')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('visitors')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('dressCode') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.dress_code"
                        :danger="validateField('dress_code')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('dress_code')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full mb-3">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('zaGledaoce') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.za_gledaoce"
                        :danger="validateField('zaGledaoce')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('za_gledaoce')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

            <div class="vx-col w-full">

                <p class="font-bold text-sm mb-2">{{ getPropertyTitle('additionalInformation') }}</p>
                <vs-input
                        type="text"
                        class="w-full"
                        v-model="model.additional_info"
                        :danger="validateField('additional_info')"
                        val-icon-danger="close"
                />

                <!-- Validation text -->
                <span class="text-danger text-xs" v-show="validateField('additional_info')">{{ $t('messages.validation.invalidField') }}</span>

            </div>

        </div>

        <!-- Actions -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm">{{ $t('actions.update') }}</vs-button>
                <vs-button color="danger" type="border" class="mb-2" :to="{ name: indexRoute }">{{ $t('actions.cancel') }}</vs-button>
            </div>
        </div>

        <!--Send voucher popup-->
        <vs-popup :title="this.$t('forms.voucher.actions.send')" :active.sync="sendVoucherPopup.active">
            <div class="vx-row w-full px-0 mb-3">
                <div class="vx-col w-2/3">
                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('customerEmail') }}</p>
                    <vs-input
                            type="text"
                            class="w-full"
                            v-model="sendVoucherPopup.data.customer_email"
                    />
                </div>
                <div class="vx-col w-1/3">
                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('paperSize') }}</p>
                    <vs-select
                            class="w-full"
                            v-model="sendVoucherPopup.data.paper"
                    >
                        <vs-select-item :key="index" :value="item.value" :text="item.name" v-for="item,index in sendVoucherPopup.paperOptions" />
                    </vs-select>
                </div>
            </div>
            <div class="vx-row w-full px-0">
                <div class="vx-col w-full">
                    <vs-button @click="sendVoucher">{{ $t('actions.send') }}</vs-button>
                </div>
            </div>
        </vs-popup>

    </vx-card>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Validations
    import { validations } from "@/static/voucher/voucher";

    export default {
        mixins: [ formHelper ],
        props: {
            formModel: {

                type: String,
                default: 'voucher'

            },
            indexRoute: {

                type: String,
                default: 'vouchers'

            }
        },
        data() {

            return {
                defaultDate: new Date(),
                sendVoucherPopup: {
                    active: false,
                    data: {
                        customer_email: '',
                        paper: ''
                    },
                    paperOptions: [
                        {
                            name: 'A4',
                            value: 'a4'
                        },
                        {
                            name: 'A5',
                            value: 'a5'
                        }
                    ]
                }
            }

        },
        validations: validations,
        methods: {
            update(){

                let requestParams = this.model;

                //Convert the expiration date of voucher
                requestParams.end_date = this.convertDate(this.model.end_date);

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
            delete(){

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].delete + '/' + id;

                axios.delete(requestUrl)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.deletedSuccess', 'success');

                                //Return to vouchers index page
                                this.returnToIndex();

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            showDeleteAlert(){

                let methodToExecute =  this.delete.bind(null);

                let instanceTitle = this.$tc('models.' + this.instance + '.title', 1);

                let title = this.$t('actions.confirm');

                let text = this.$t('messages.confirmation.delete', { instance: instanceTitle });

                let acceptText = this.$t('actions.accept');

                this.$vs.dialog({
                    color:'primary',
                    title: title,
                    text: text,
                    accept: methodToExecute,
                    acceptText: acceptText
                });

            },
            showSendPopup(){

                this.sendVoucherPopup.data.customer_email = this.model.order_item.order.rec_email;

                this.sendVoucherPopup.data.paper = this.sendVoucherPopup.paperOptions[0].value;

                this.sendVoucherPopup.active = true;

            },
            sendVoucher(){

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].send;

                let requestParams = this.sendVoucherPopup.data;

                requestParams.voucher_id = id;

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.sentSuccess', 'success');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            activateVoucher(){

                let activation_code = this.model.activation_code;

                let requestUrl = this.API[this.instance].activate;

                let requestParams = {
                    activation_code: activation_code
                };

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.activatedSuccess', 'success');

                                this.model.activated = true;

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            deactivateVoucher(){

                let requestUrl = this.API[this.instance].deactivate;

                let requestParams = {
                    id: this.model.id
                };

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.deactivatedSuccess', 'success');

                                this.model.activated = false;

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

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

                });

            },
            getPrintUrl(voucherId, paperSize){

                return this.API.voucher.print + '/' + voucherId + '?paper_size=' + paperSize

            },
            loadData(){

                //Get a voucher for editing
                this.getSingleItem();

            },
            submitForm() {

                if(!this.$v.$invalid){

                    this.update();

                }
                else{

                    this.showNotification('error', 'validation.invalidForm', 'danger');

                }

            },
            returnToIndex(){

                const component = this;

                setTimeout(function () {
                    component.redirectToIndex(component.indexRoute);
                    component.setModel();
                }, 500);

            }
        },
        mounted() {

            //Load the necessary data
            this.loadData();

        },
        created: function () {

            //Set an instance for the form rendering
            this.setInstance(this.formModel);

        }

    }

</script>