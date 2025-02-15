<template>

    <div v-if="getOrderComplete">

        <vx-card noShadow cardBorder class="mb-3">

            <div class="vx-row w-full py-2 mb-3">
                <div class="vx-col w-1/2 flex items-center">

                    <h3 class="mr-3">
                        {{ $t('forms.order.titles.edit', {number: order.id}) }}
                    </h3>
                    <vs-button icon="edit" size="small" @click="editOrderDetails()" class="mr-3" v-if="!editDetails">{{ $t('actions.edit') }}</vs-button>
                    <vs-button icon="clear" size="small" color="danger" @click="editOrderDetails()" class="mr-3" v-if="editDetails">{{ $t('actions.cancel') }}</vs-button>
                    <vs-button type="border" size="small" color="danger" :to="{ name: 'orders' }">{{ $t('actions.back') }}</vs-button>

                </div>
                <div class="vx-col w-1/2 flex items-center justify-end">

                    <vs-button size="small" color="danger" icon="delete" @click="showDeleteAlert('order')">{{ $t('actions.delete') }}</vs-button>

                </div>
            </div>

            <div class="vx-row w-full">

                <div class="vx-col w-1/3">

                    <p class="font-bold mb-3">{{ $t('forms.order.sections.general') }}</p>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('date') }}</p>
                        <p v-if="!editDetails">
                            {{ convertDate(order.created_at, 'd/m/y', '.') }}
                        </p>
                        <!-- Datepicker component -->
                        <datepicker v-model="orderForm.created_at" format="dd.MM.yyyy" v-if="editDetails"></datepicker>
                    </div>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('status') }}</p>
                        <p v-if="!editDetails && order.status">
                            {{ order.status.title }}
                        </p>
                        <vs-select
                                class="w-full"
                                v-model="orderForm.order_status_id"
                                v-if="editDetails"
                        >
                            <vs-select-item :key="index" :value="item.id" :text="item.title" v-for="item,index in orderStatuses" />
                        </vs-select>
                    </div>

                    <div class="button-container mb-3" v-if="editDetails">

                        <vs-button @click="updateOrder" class="w-full">{{ $t('forms.order.actions.updateDetails') }}</vs-button>

                    </div>


                </div>

                <div class="vx-col w-1/3">

                    <p class="font-bold mb-3">
                        {{ $t('forms.order.sections.shipping') }}
                    </p>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('shippingMethod') }}</p>
                        <p v-if="!editDetails && order.shipping_method">
                            {{ order.shipping_method.name }}
                        </p>
                        <vs-select
                                class="w-full"
                                v-model="orderForm.shipping_method_id"
                                v-if="editDetails"
                        >
                            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="item,index in shippingMethods" />
                        </vs-select>
                    </div>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('addressLabel') }}</p>
                        <p v-if="!editDetails">
                            {{ buildAddress(order) }}
                        </p>
                        <!--Allow to edit the address -->
                        <div class="address-form" v-if="editDetails">

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('customerName')"
                                    v-model="orderForm.customer_name"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('customerSurname')"
                                    v-model="orderForm.customer_surname"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('addressOne')"
                                    v-model="orderForm.address_one"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('addressTwo')"
                                    v-model="orderForm.address_two"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('postCode')"
                                    v-model="orderForm.zip_code"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('city')"
                                    v-model="orderForm.city"
                                    class="w-full mb-2"
                            >
                            </vs-input>

                            <vs-input
                                    type="text"
                                    :label="getPropertyTitle('country')"
                                    v-model="orderForm.country"
                                    class="w-full"
                            >
                            </vs-input>

                        </div>
                    </div>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('email') }}</p>
                        <p v-if="!editDetails">
                            {{ order.rec_email }}
                        </p>
                        <vs-input
                                type="email"
                                :label="getPropertyTitle('email')"
                                v-model="orderForm.rec_email"
                                class="w-full mb-2"
                                v-if="editDetails"
                        >
                        </vs-input>
                    </div>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('phone') }}</p>
                        <p v-if="!editDetails">
                            {{ order.rec_phone }}
                        </p>
                        <vs-input
                                type="tel"
                                :label="getPropertyTitle('phone')"
                                v-model="orderForm.rec_phone"
                                class="w-full mb-2"
                                v-if="editDetails"
                        >
                        </vs-input>
                    </div>

                </div>

                <div class="vx-col w-1/3">

                    <p class="font-bold mb-3">
                        {{ $t('forms.order.sections.payment') }}
                    </p>

                    <div class="info-row mb-3">
                        <p class="mb-2">{{ getPropertyTitle('paymentMethod') }}</p>
                        <p v-if="!editDetails && order.payment_method">
                            {{ order.payment_method.name }}
                        </p>
                        <vs-select
                                class="w-full"
                                v-model="orderForm.payment_method_id"
                                v-if="editDetails"
                        >
                            <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="item,index in paymentMethods" />
                        </vs-select>
                    </div>

                    <div class="info-row mb-3" v-if="!editDetails">
                        <p class="mb-2">{{ getPropertyTitle('customer') }}</p>
                        <p>{{ billingDetails() }}</p>
                    </div>

                    <div class="info-row mb-3" v-if="editDetails">
                        <p class="mb-2">{{ getPropertyTitle('customerName') }}</p>
                        <vs-input
                                type="email"
                                :label="getPropertyTitle('customerName')"
                                v-model="orderForm.customer_name"
                                class="w-full mb-2"
                        >
                        </vs-input>
                    </div>

                    <div class="info-row mb-3" v-if="editDetails">
                        <p class="mb-2">{{ getPropertyTitle('customerSurname') }}</p>
                        <vs-input
                                type="email"
                                :label="getPropertyTitle('customerSurname')"
                                v-model="orderForm.customer_surname"
                                class="w-full mb-2"
                        >
                        </vs-input>
                    </div>

                    <div class="info-row mb-3" v-if="editDetails">
                        <p class="mb-2">{{ getPropertyTitle('phone') }}</p>
                        <vs-input
                                type="email"
                                :label="getPropertyTitle('phone')"
                                v-model="orderForm.customer_phone"
                                class="w-full mb-2"
                        >
                        </vs-input>
                    </div>

                    <div class="info-row mb-3" v-if="editDetails">
                        <p class="mb-2">{{ getPropertyTitle('email') }}</p>
                        <vs-input
                                type="email"
                                :label="getPropertyTitle('email')"
                                v-model="orderForm.customer_email"
                                class="w-full mb-2"
                        >
                        </vs-input>
                    </div>

                </div>

            </div>

            <div class="vx-row w-full">

                <div class="vx-col w-1/3"></div>
                <div class="vx-col w-2/3">
                    <p class="mb-2">{{ getPropertyTitle('comment') }}</p>
                    <p v-if="!editDetails">
                        {{ order.comment }}
                    </p>
                    <vs-textarea
                        v-model="orderForm.comment"
                        v-if="editDetails"
                    ></vs-textarea>
                </div>

            </div>

        </vx-card>

        <vx-card :title="$t('forms.order.sections.products')" noShadow cardBorder>
            <vs-table :data="orderItems">
                <template slot="thead">
                    <vs-th>
                        {{ getPropertyTitle('product.title') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('product.price') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('product_total') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('product.quantity') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('box_count') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('box_total') }}
                    </vs-th>
                    <vs-th>
                        {{ getPropertyTitle('product.total') }}
                    </vs-th>
                    <vs-th></vs-th>
                </template>

                <template slot-scope="{data}">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data" >

                        <vs-td :data="data[indextr].product.title">
                            {{ data[indextr].product.title }}
                        </vs-td>

                        <vs-td :data="data[indextr].product_price">
                            {{data[indextr].product_price + ' ' + defaultCurrency }}
                        </vs-td>

                        <vs-td>
                            {{(data[indextr].product_total - data[indextr].box_total) + ' ' + defaultCurrency }}
                        </vs-td>

                        <vs-td :data="data[indextr].product_quantity">
                            {{data[indextr].product_quantity}}
                        </vs-td>

                        <vs-td :data="data[indextr].box_count">
                            {{data[indextr].box_count}}
                        </vs-td>

                        <vs-td :data="data[indextr].box_total">
                            {{data[indextr].box_total + ' ' + defaultCurrency}}
                        </vs-td>

                        <vs-td :data="data[indextr].product_total">
                            {{data[indextr].product_total + ' ' + defaultCurrency}}
                        </vs-td>

                        <vs-td>
                            <div class="flex">
                                <vs-button size="small" icon="edit" type="border" class="mr-2" @click="editItem(indextr)"></vs-button>
                                <vs-button size="small" color="danger" icon="delete" type="border" @click="showDeleteAlert('orderItem', data[indextr].id)"></vs-button>
                            </div>
                        </vs-td>

                    </vs-tr>
                    <vs-tr>
                        <vs-td colspan="3" class="align-bottom">
                            <p class="text-sm font-bold mb-2">{{ getPropertyTitle('shippingLabel') }}</p>
                            {{ order.shipping_method.name }}
                        </vs-td>
                        <vs-td class="align-bottom" colspan="4">
                            {{ order.shipping_method.cost + ' ' + defaultCurrency }}
                        </vs-td>
                        <vs-td></vs-td>
                    </vs-tr>
                    <vs-tr v-if="order.coupon_code !== null">
                        <vs-td colspan="8" class="align-bottom">
                            <p class="text-sm font-bold mb-2">{{ getPropertyTitle('couponLabel') }}</p>
                            {{ order.coupon_code }}
                        </vs-td>
                    </vs-tr>
                    <vs-tr v-if="order.giftcard_code !== null">
                        <vs-td colspan="8" class="align-bottom">
                            <p class="text-sm font-bold mb-2">{{ getPropertyTitle('giftCardLabel') }}</p>
                            {{ order.giftcard_code }}
                        </vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td colspan="3" class="align-middle">
                            <p class="text-sm text-right font-bold">{{ getPropertyTitle('subtotal') }}</p>
                        </vs-td>
                        <vs-td class="align-middle" colspan="5">
                            {{ order.subtotal + ' ' + defaultCurrency }}
                        </vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td colspan="3" class="align-middle">
                            <p class="text-sm text-right font-bold">{{ getPropertyTitle('discount') }}</p>
                        </vs-td>
                        <vs-td class="align-middle" colspan="4">
                            {{ order.discount + ' ' + defaultCurrency }}
                        </vs-td>
                        <vs-td></vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-td colspan="3" class="align-middle">
                            <p class="text-sm text-right font-bold">{{ getPropertyTitle('total') }}</p>
                        </vs-td>
                        <vs-td class="align-middle" colspan="4">
                            {{ order.total + ' ' + defaultCurrency }}
                        </vs-td>
                        <vs-td></vs-td>
                    </vs-tr>
                </template>
            </vs-table>
            <div class="vx-row w-full m-0">
                <div class="vx-col w-1/2 pt-3 flex">
                    <vs-button class="mr-2" @click="showItemForm">{{ $t('forms.order.actions.addItems') }}</vs-button>
                    <vs-button type="border" @click="generateVouchers">{{ $t('forms.order.actions.generateVouchers') }}</vs-button>
                </div>
            </div>


            <!-- Order item edit form popup -->
            <vs-popup class="order-item-edit" title="Order item details" :active.sync="itemPopup.active" v-if="itemPopup.active">
                <div class="vx-row w-full mx-0 mb-3 flex-no-wrap">
                    <div class="vx-col w-2/6">
                        <p class="text-sm font-bold mb-2">{{ getPropertyTitle('product.label') }}</p>
                        <div class="h-10 flex items-center">
                            <p>{{ itemPopup.data.product.title }}</p>
                        </div>
                    </div>
                    <div class="vx-col w-1/6">
                        <p class="text-sm font-bold mb-2">{{ getPropertyTitle('product.price') }}</p>
                        <div class="h-10 flex items-center">
                            <p>{{ itemPopup.data.product_price + ' ' + defaultCurrency }}</p>
                        </div>
                    </div>
                    <div class="vx-col w-1/6">
                        <p class="text-sm font-bold mb-2">{{ getPropertyTitle('product.quantity') }}</p>
                        <div class="h-10 flex items-center">
                            <vs-input-number v-model="itemPopup.data.product_quantity" min="1" class="w-1/2"/>
                        </div>
                    </div>
                    <div class="vx-col w-1/6">
                        <p class="text-sm font-bold mb-2">{{ getPropertyTitle('product.total') }}</p>
                        <div class="h-10 flex items-center">
                            <p>{{ (itemPopup.data.product_quantity * itemPopup.data.product_price) + ' ' + defaultCurrency}}</p>
                        </div>
                    </div>
                    <div class="vx-col w-1/6">
                        <p class="text-sm font-bold mb-2">{{ $t('actions.title') }}</p>
                        <div class="h-10 flex items-center">
                            <vs-button icon="save" size="small" class="mr-2" @click="updateItem">{{ $t('actions.save') }}</vs-button>
                            <vs-button icon="delete" size="small" color="danger" @click="showDeleteAlert('orderItem', itemPopup.data.id)">{{ $t('actions.delete') }}</vs-button>
                        </div>
                    </div>
                </div>
                <div class="vx-row mx-0" v-if="itemPopup.data.vouchers.length">
                    <div class="vx-col w-full">
                        <p class="text-sm font-bold mb-2">{{ getPropertyTitle('voucher.label') }}</p>
                        <div class="table-container">
                            <vs-table :data="itemPopup.data.vouchers">
                                <template slot="thead">
                                    <vs-th>
                                        {{ getPropertyTitle('voucher.code') }}
                                    </vs-th>
                                    <vs-th>
                                        {{ getPropertyTitle('voucher.validTo') }}
                                    </vs-th>
                                    <vs-th>
                                        {{ $t('actions.title') }}
                                    </vs-th>
                                </template>

                                <template slot-scope="{data}">
                                    <vs-tr :key="index" v-for="(voucher, index) in data" >
                                        <vs-td :data="voucher.voucher_code">
                                            {{voucher.voucher_code}}
                                        </vs-td>

                                        <vs-td :data="voucher.end_date">
                                            {{ convertDate(voucher.end_date, 'd/m/y', '.') }}
                                        </vs-td>

                                        <vs-td>
                                            <div class="flex">
                                                <vs-button size="small" class="mr-2" color="success" icon="send" @click="showSendPopup(voucher.id)">{{ $t('actions.send') }}</vs-button>
                                                <vs-button size="small" color="primary" icon="print" class="mr-2" :href="printVoucherLink(voucher.id, 'a4')" target="_blank">A4</vs-button>
                                                <vs-button size="small" color="primary" icon="print" class="mr-2" :href="printVoucherLink(voucher.id, 'a5')" target="_blank">A5</vs-button>
                                                <vs-button size="small" class="mr-2" type="border" icon="edit" @click="showVoucherForm(voucher.id)">{{ $t('actions.edit') }}</vs-button>
                                                <vs-button size="small" color="danger" icon="delete" @click="showDeleteAlert('voucher', voucher.id)">{{ $t('actions.delete') }}</vs-button>
                                            </div>
                                        </vs-td>
                                    </vs-tr>
                                </template>
                            </vs-table>
                        </div>
                    </div>
                    <!-- Voucher edit form -->
                    <vs-popup :title="$t('actions.edit') + ' ' + $tc('models.voucher.title', 1) + ' #' + voucherPopup.data.voucher_code" :active.sync="voucherPopup.active">
                        <div class="vx-row w-full p-0 mx-0">
                            <div class="vx-col w-full mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.title')"
                                        v-model="voucherPopup.data.title"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-full mb-3">
                                <p class="text-sm mb-2">{{ $t('models.voucher.properties.description') }}</p>
                                <vs-textarea
                                        v-model="voucherPopup.data.description">
                                </vs-textarea>
                            </div>
                            <div class="vx-col w-full mb-3">
                                <p class="text-sm mb-2">{{ $t('models.voucher.properties.personalMessage') }}</p>
                                <vs-textarea
                                    v-model="voucherPopup.data.personal_message">
                                </vs-textarea>
                            </div>
                            <div class="vx-col w-full mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.additionalInformation')"
                                        v-model="voucherPopup.data.additional_info"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-full mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.location')"
                                        v-model="voucherPopup.data.location"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-1/2 mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.duration')"
                                        v-model="voucherPopup.data.duration"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-1/2 mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.visitors')"
                                        v-model="voucherPopup.data.visitors"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-1/2 mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.dressCode')"
                                        v-model="voucherPopup.data.dress_code"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-1/2 mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.weather')"
                                        v-model="voucherPopup.data.weather"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-1/2 mb-3">
                                <vs-input
                                        type="text"
                                        :label="$t('models.voucher.properties.zaGledaoce')"
                                        v-model="voucherPopup.data.za_gledaoce"
                                        class="w-full"
                                >
                                </vs-input>
                            </div>
                            <div class="vx-col w-full">
                                <vs-button @click="updateVoucher">{{ $t('actions.update') }}</vs-button>
                            </div>
                        </div>
                    </vs-popup>
                </div>
            </vs-popup>

            <!-- Order item create form popup -->
            <vs-popup class="order-item-create" :title="$t('actions.add') + '' + $tc('models.product.title', 1)" :active.sync="itemForm.active">
                <div class="vx-row w-full mx-0">

                    <div class="vx-col w-full mb-3 p-0">
                        <p class="mb-2">{{ getPropertyTitle('product.label') }}</p>
                        <v-select v-model="itemForm.data.product_id" label="title" :options="products" :reduce="title => title.id" @search="searchProducts"></v-select>
                    </div>

                    <div class="vx-col w-full mb-3 p-0">
                        <p class="mb-2">{{ getPropertyTitle('product.quantity') }}</p>
                        <div class="flex items-center">
                            <vs-input-number v-model="itemForm.data.product_quantity" min="1"/>
                        </div>
                    </div>

                    <div class="vx-col w-full p-0">
                        <vs-button @click="createItem">{{ $t('actions.add') }}</vs-button>
                    </div>

                </div>
            </vs-popup>

            <!--Send voucher popup-->
            <vs-popup :title="$t('forms.voucher.actions.send')" :active.sync="sendVoucherPopup.active">
                <div class="vx-row w-full px-0 mb-3">
                    <div class="vx-col w-2/3">
                        <p class="font-bold text-sm mb-2">{{ getPropertyTitle('email') }}</p>
                        <vs-input
                                type="text"
                                class="w-full"
                                v-model="sendVoucherPopup.data.customer_email"
                        />
                    </div>
                    <div class="vx-col w-1/3">
                        <p class="font-bold text-sm mb-2">{{ getPropertyTitle('voucher.paperSize') }}</p>
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

    </div>

</template>

<script>

    //Library for working with requests
    import axios from 'axios';

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Vue select
    import vSelect from 'vue-select';

    export default {
        mixins: [formHelper],
        components: { vSelect },
        props: {

            formModel: {
                type: String,
                default: 'order'
            },
            indexRoute: {

                type: String,
                default: 'orders'

            }

        },
        data() {

            return {

                order: {},
                getOrderComplete: false,
                orderForm: {},
                orderItems: [],
                orderStatuses: [],
                editDetails: false,
                shippingMethods: [],
                paymentMethods: [],
                itemPopup: {
                    active: false,
                    data: {}
                },
                itemForm: {
                    active: false,
                    data: {}
                },
                itemModel: {
                    order_id: '',
                    product_id: '',
                    product_quantity: 1,
                    personal_message: [
                        {
                            text: ''
                        }
                    ]
                },
                voucherPopup: {
                    active: false,
                    data: {

                        title: '',
                        description: '',
                        personal_message: '',
                        additional_info: '',
                        location: '',
                        duration: '',
                        visitors: '',
                        dress_code: '',
                        weather: '',
                        voucher_code: ''

                    }
                },
                sendVoucherPopup: {
                    active: false,
                    data: {
                        id: null,
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
                },
                defaultCurrency: applicationParams.defaultCurrency

            }

        },
        methods: {
            //Order functions
            //Load order data
            getOrder(){

                let id = this.$route.params.id;

                let requestParams = {

                    params: {

                        id: id

                    }

                };

                let requestUrl = this.API[this.instance].single;

                axios.get(requestUrl, requestParams).then(response => {

                    this.order = response.data;

                    //Setup the order form
                    this.setOrderForm();

                    this.orderItems = this.order.items;

                    //Update item popup data
                    if(this.itemPopup.active){

                        this.updateItemPopupData();

                    }

                });

            },
            //Update order
            updateOrder(){

                //Hide order form
                this.editDetails = false;

                //Convert the date
                this.orderForm.created_at = this.convertDate(this.orderForm.created_at);

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].update + '/' + id;

                let requestParams = this.orderForm;

                axios.put(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.updatedSuccess', 'success');

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Delete order
            deleteOrder(){

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].delete + '/' + id

                axios.delete(requestUrl).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.deletedSuccess', 'success');

                            //Return to orders index page
                            this.returnToIndex();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Set values for order details form
            setOrderForm(){

                let orderData = {
                    customer_name: this.order.customer_name,
                    customer_surname: this.order.customer_surname,
                    customer_email: this.order.customer_email,
                    customer_phone: this.order.customer_phone,
                    rec_email: this.order.rec_email,
                    rec_name: this.order.rec_name,
                    rec_surname: this.order.rec_surname,
                    rec_phone: this.order.rec_phone,
                    address_one: this.order.address_one,
                    address_two: this.order.address_two,
                    city: this.order.city,
                    zip_code: this.order.zip_code,
                    country: this.order.country,
                    comment: this.order.comment,
                    created_at: this.convertDate(this.order.created_at),
                    order_status_id: this.order.order_status_id,
                    shipping_method_id: this.order.shipping_method_id,
                    payment_method_id: this.order.payment_method_id
                };

                //Setup the order form
                this.orderForm = orderData;

                this.$nextTick(() => {
                    this.getOrderComplete = true;
                });

            },
            //Show order details form
            editOrderDetails(){

                //Show or hide the order form
                if(!this.editDetails){

                    this.editDetails = true;

                }
                else{

                    this.editDetails = false;

                }

            },
            billingDetails() {

                let address = '';

                const order = this.order;

                if (order.customer_name !== null) {
                    address += order.customer_name + ' ';
                }
                if (order.customer_surname !== null) {
                    address += order.customer_surname;
                }
                if (order.customer_phone !== null) {
                    address += ', ' + order.customer_phone;
                }
                if (order.customer_email !== null) {
                    address += ', ' + order.customer_email;
                }

                return address;
            },
            //Order items functions
            //Create order item
            createItem(){

                let requestUrl = this.API.orderItem.create;

                let requestParams = this.itemForm.data;

                if(requestParams.personal_message.length < requestParams.product_quantity){

                    for(let i = requestParams.personal_message.length; i < requestParams.product_quantity; i++){

                        requestParams.personal_message.push({text: ''});

                    }

                }

                requestParams.personal_message = JSON.stringify(requestParams.personal_message);

                axios.post(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.addedSuccess', 'success', 'orderItem');

                            //Hide the item form
                            this.itemForm.active = false;

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Show order item details form
            editItem(index){

                this.itemPopup.data = this.orderItems[index];

                this.itemPopup.data.personal_message = JSON.parse(this.itemPopup.data.personal_message);

                this.itemPopup.active = true;

            },
            //Update order item
            updateItem(){

                let item = Object.assign({}, this.itemPopup.data);

                let id = item.id;

                //Normalize personal messages quantity
                this.normalizeMessagesQuantity(item);

                item.personal_message = JSON.stringify(item.personal_message);

                let requestUrl = this.API.orderItem.update + '/' + id;

                let requestParams = item;

                axios.put(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.updatedSuccess', 'success', 'orderItem');

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Delete order item
            deleteItem(id){

                let requestUrl = this.API.orderItem.delete + '/' + id;

                axios.delete(requestUrl).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.deletedSuccess', 'success', 'orderItem');

                            //Hide order item popup if it's visible
                            if(this.itemPopup.active) {

                                this.itemPopup.active = false;

                            }

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Normalize personal messages quantity
            normalizeMessagesQuantity(item){

                if(item.personal_message.length > item.product_quantity) {

                    let difference = item.personal_message.length - item.product_quantity;

                    let startPosition = item.product_quantity - 1;

                    item.personal_message.splice(startPosition, difference);

                }
                else if(item.personal_message.length < item.product_quantity){

                    let difference = item.product_quantity - item.personal_message.length;

                    for(let i = 0; i < difference; i++){

                        item.personal_message.push({
                            text: ''
                        });

                    }

                }

            },
            //Show order item create form
            showItemForm(){

                //Set item form
                this.setItemForm();

                //Set order_id value
                this.itemForm.data.order_id = this.$route.params.id;

                //Load an initial list of products
                this.getProducts();

                //Show the popup
                this.itemForm.active = true;

            },
            //Set initial data for order item create form
            setItemForm(){

                this.itemForm.data = Object.assign({}, this.itemModel);

            },
            //Update order item details form data
            updateItemPopupData(){

                //Update item popup data
                let item_popup = this.itemPopup;

                let order_item = this.order.items.find(function(item){
                    return item.id === item_popup.data.id;
                });

                this.itemPopup.data = Object.assign({}, order_item);

                this.itemPopup.data.personal_message = JSON.parse(order_item.personal_message);

            },
            //Vouchers functions
            //Show voucher edit form
            showVoucherForm(voucher_id){

                let targetVoucher = this.itemPopup.data.vouchers.find(function(voucher){

                    return voucher.id === voucher_id;

                });

                //Set form data
                this.setVoucherForm(targetVoucher);

                //Show popup
                this.voucherPopup.active = true;

            },
            //Set voucher edit form data
            setVoucherForm(targetVoucher){

                this.voucherPopup.data.id = targetVoucher.id;
                this.voucherPopup.data.order_item_id = targetVoucher.order_item_id;
                this.voucherPopup.data.title = targetVoucher.title;
                this.voucherPopup.data.description = targetVoucher.description;
                this.voucherPopup.data.personal_message = targetVoucher.personal_message;
                this.voucherPopup.data.additional_info = targetVoucher.additional_info;
                this.voucherPopup.data.location = targetVoucher.location;
                this.voucherPopup.data.visitors = targetVoucher.visitors;
                this.voucherPopup.data.duration = targetVoucher.duration;
                this.voucherPopup.data.dress_code = targetVoucher.dress_code;
                this.voucherPopup.data.za_gledaoce = targetVoucher.za_gledaoce;
                this.voucherPopup.data.weather = targetVoucher.weather;
                this.voucherPopup.data.voucher_code = targetVoucher.voucher_code;

            },
            //Update voucher
            updateVoucher(){

                let voucher = this.voucherPopup.data;

                let id = voucher.id;

                let requestUrl = this.API.voucher.update + '/' + id;

                let requestParams = voucher;

                axios.put(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.updatedSuccess', 'success', 'voucher');

                            //Hide voucher form
                            this.voucherPopup.active = false;

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Generate vouchers for order
            generateVouchers(){

                let id = this.$route.params.id;

                let requestUrl = this.API.voucher.generate;

                let requestParams = {

                    order_id: id

                };

                axios.post(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.generatedSuccess', 'success', 'voucher');

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Delete voucher
            deleteVoucher(id){

                let requestUrl = this.API.voucher.delete + '/' + id;

                axios.delete(requestUrl).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.deletedSuccess', 'success', 'voucher');

                            //Remove voucher from the list
                            let voucher = this.itemPopup.data.vouchers.find(function(voucher){

                                return voucher.id === id;

                            });

                            let position = this.itemPopup.data.vouchers.indexOf(voucher);

                            this.itemPopup.data.vouchers.splice(position, 1);

                            //Load an updated order
                            this.getOrder();

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            //Get link of voucher pdf
            printVoucherLink(id, size){

                return this.API.voucher.print + '/' + id + '?paper_size=' + size

            },
            returnToIndex(){

                const component = this;

                setTimeout(function () {
                    component.redirectToIndex(component.indexRoute);
                    component.setModel();
                }, 500);

            },
            showDeleteAlert(instance, id){

                let methods = {

                    order: this.deleteOrder.bind(null),
                    orderItem: this.deleteItem.bind(null, id),
                    voucher: this.deleteVoucher.bind(null, id)

                };

                let instanceTitle = this.$tc('models.' + instance + '.title', 1);

                let text = this.$t('messages.confirmation.delete', { instance: instanceTitle });

                this.$vs.dialog({
                    color:'primary',
                    title: 'Confirm',
                    text: text,
                    accept: methods[instance]
                });

            },
            showSendPopup(id){

                this.sendVoucherPopup.data.voucher_id = id;

                this.sendVoucherPopup.data.customer_email = this.order.rec_email;

                this.sendVoucherPopup.data.paper = this.sendVoucherPopup.paperOptions[0].value;

                this.sendVoucherPopup.active = true;

            },
            sendVoucher(){

                let requestUrl = this.API.voucher.send;

                let requestParams = this.sendVoucherPopup.data;

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

            }

        },
        mounted() {

            //Load an order
            this.getOrder();

            //Load order statuses
            this.getOrderStatuses();

            //Load shipping methods
            this.getShippingMethods();

            //Laod payment methods
            this.getPaymentMethods();

        },
        created() {

            //Set an instance for the form rendering
            this.setInstance(this.formModel);

        }

    }

</script>

<style>

    body .con-vs-popup.order-item-edit .vs-popup{

        width: 100% !important;

    }

</style>