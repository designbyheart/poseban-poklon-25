<template>
    <div class="vx-row">

        <div class="vx-col w-full mb-6">

            <h3 class="mb-3">{{ $t('statistics.pageTitle') }}</h3>
            <!-- Dropdown menu -->
            <vs-dropdown>

                <a class="flex items-center" href="#">
                    {{ statisticType.label }}
                    <i class="material-icons"> expand_more </i>
                </a>

                <vs-dropdown-menu>

                    <vs-dropdown-item>
                        <li v-for="(statType, typeIndex) in statisticTypes" :key="typeIndex">
                            {{ statType }}
                        </li>
                        :key="index" @click="changeStatis`ticType(type)">
                        {{ type?.label }}
                    </vs-dropdown-item>

                </vs-dropdown-menu>
            </vs-dropdown>

        </div>

        <div class="vx-col w-full mb-6">

            <vx-card>

                <div class="vx-row">

                    <div class="vx-col flex items-center">
                        <!-- Datepicker component -->
                        <datepicker placeholder="Select date" v-model="filter.date.start"
                                    format="dd.MM.yyyy"></datepicker>
                    </div>

                    <div class="vx-col flex items-center px-1">
                        <i class="material-icons"> remove </i>
                    </div>

                    <div class="vx-col flex items-center">
                        <!-- Datepicker component -->
                        <datepicker placeholder="Select date" v-model="filter.date.end"
                                    format="dd.MM.yyyy"></datepicker>
                    </div>

                    <div class="vx-col flex flex-1 items-center" v-if="statisticType.slug === 'product'">

                        <v-select v-model="filter.productSearch" label="title" :options="products"
                                  :reduce="product => product.id" :placeholder="$t('statistics.searchPlaceholder')"
                                  class="w-full" @search="searchProducts"></v-select>

                    </div>

                    <div class="vx-col flex flex-1 items-center" v-if="statisticType.slug === 'producent'">

                        <v-select v-model="filter.producentSearch" label="title" :options="producents"
                                  :reduce="producent => producent.id" :placeholder="$t('statistics.searchPlaceholder')"
                                  class="w-full" @search="searchProducents"></v-select>

                    </div>

                    <div class="vx-col">

                        <vs-button class="mr-6" @click="fetchData">{{ $t('actions.filter') }}</vs-button>
                        <vs-button type="border" @click="downloadStatistics">{{ $t('actions.download') }}</vs-button>

                    </div>

                </div>

            </vx-card>

        </div>

        <!--Display statistic cards-->
        <div class="vx-col w-1/4 mb-6" :key="index" v-for="statistic,index in statisticData">
            <statistics-card-number
                :icon="statistic.icon"
                :statistic="statistic.value"
                :statisticTitle="getStatisticLabel(statistic.labelSlug)"
                v-if="!isHidden(statistic.onlyGeneral)"
            />
        </div>

        <!--Products sold table-->
        <div class="vx-col w-full mb-6" v-if="statisticType.slug === 'general'">

            <vx-card>

                <vs-table search :data="productsList" :noDataText="$t('messages.notFound')">

                    <template slot="header">
                        <div class="vx-row w-full pb-3 m-0">
                            <div class="vx-col flex items-center w-1/2 p-0">
                                <h3 class="mb-0 mr-3">
                                    Products sold in the period
                                </h3>
                            </div>
                        </div>
                    </template>

                    <template slot="thead">
                        <vs-th sort-key="title">Product</vs-th>
                        <vs-th>Producent</vs-th>
                        <vs-th sort-key="sold_quantity">Items sold</vs-th>
                        <vs-th sort-key="sold_total">Total</vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

                            <vs-td :data="data[indextr].title">
                                <a :href="API.product.show + data[indextr].slug">
                                    {{ data[indextr].title }}
                                </a>
                            </vs-td>

                            <vs-td :data="data[indextr].producent.title">
                                <router-link
                                    :to="{ name: 'producents_edit', params: {id: data[indextr].producent.id} }">
                                    {{ data[indextr].producent.title }}
                                </router-link>
                            </vs-td>

                            <vs-td :data="data[indextr].sold_quantity">
                                {{ data[indextr].sold_quantity }}
                            </vs-td>

                            <vs-td :data="data[indextr].sold_total">
                                {{ data[indextr].sold_total + ' ' + applicationParams.defaultCurrency }}
                            </vs-td>

                        </vs-tr>
                    </template>
                </vs-table>

            </vx-card>

        </div>

    </div>
</template>
<script>

//Library for working with requests
import axios from 'axios';

//Application routes
import {API} from "@/mixins/api/api";

//Import icons

//Import a card component
import VxCard from "../components/vx-card/VxCard";

//Vue select
import vSelect from 'vue-select';

//Datepicker component
import Datepicker from 'vuejs-datepicker';

import StatisticsCardNumber from '@/components/statistics-cards/StatisticsCardNumber.vue'

export default {
    props: {
        statisticTypes: {
            type: Array,
            default() {
                return [
                    {
                        label: this.$t('statistics.types.general'),
                        slug: 'general'
                    },
                    {
                        label: this.$t('statistics.types.product'),
                        slug: 'product'
                    },
                    {
                        label: this.$t('statistics.types.producent'),
                        slug: 'producent'
                    }
                ]
            }
        }
    },
    components: {
        VxCard,
        Datepicker,
        StatisticsCardNumber,
        vSelect
    },
    data() {
        return {
            statisticType: this.statisticTypes[0],
            statisticData: {
                grossSales: {
                    value: '0',
                    labelSlug: 'grossSales',
                    icon: 'DollarSignIcon',
                    onlyGeneral: false
                },
                grossSalesDaily: {
                    value: '0',
                    labelSlug: 'grossSalesDaily',
                    icon: 'DollarSignIcon',
                    onlyGeneral: false
                },
                netSales: {
                    value: '0',
                    labelSlug: 'netSales',
                    icon: 'DollarSignIcon',
                    onlyGeneral: false
                },
                netSalesDaily: {
                    value: '0',
                    labelSlug: 'netSalesDaily',
                    icon: 'DollarSignIcon',
                    onlyGeneral: false
                },
                ordersPlaced: {
                    value: '0',
                    labelSlug: 'ordersPlaced',
                    icon: 'ShoppingBagIcon',
                    onlyGeneral: false
                },
                itemsPurchased: {
                    value: '0',
                    labelSlug: 'itemsPurchased',
                    icon: 'ShoppingCartIcon',
                    onlyGeneral: false
                },
                couponsWorth: {
                    value: '0',
                    labelSlug: 'couponsWorth',
                    icon: 'PercentIcon',
                    onlyGeneral: true
                },
                giftCardsWorth: {
                    value: '0',
                    labelSlug: 'giftCardsWorth',
                    icon: 'GiftIcon',
                    onlyGeneral: true
                }
            },
            productsList: [],
            filter: {
                date: {
                    start: '',
                    end: ''
                },
                productSearch: '',
                producentSearch: ''
            },
            products: [],
            producents: [],
            API
        }
    },
    methods: {
        fetchData() {

            let component = this;
            let startDate = this.convertDate(this.filter.date.start);
            let endDate = this.convertDate(this.filter.date.end);
            let type = this.statisticType;


            let requestParams = {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    type: type?.slug
                }
            };

            if (type?.slug === 'product') {

                requestParams.params.product_id = this.filter.productSearch;

            }

            axios.get('/dashboard/statistic/get', requestParams).then(response => {

                if (response.data.statistic) {

                    component.setStatisticValues(response.data.statistic);

                }

            });

        },
        downloadStatistics() {

            let startDate = this.convertDate(this.filter.date.start);
            let endDate = this.convertDate(this.filter.date.end);
            let type = this.statisticType;

            let requestParams = {
                from: startDate,
                to: endDate
            };

            if (type?.slug === 'product') {

                requestParams.product_id = this.filter.productSearch;

            } else if (type?.slug === 'producent') {

                requestParams.producent_id = this.filter.producentSearch;

            }

            let requestUrl = '/dashboard/order-items/download';

            axios.post(requestUrl, requestParams).then(response => {

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                let filename = 'statistics_' + startDate + '_' + endDate + '.csv';
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();

            });

        },
        setStatisticValues(statistic) {

            let statisticData = this.statisticData;

            statisticData.grossSales.value = statistic.grossSales;
            statisticData.grossSalesDaily.value = statistic.grossSalesDaily;
            statisticData.netSales.value = statistic.netSales;
            statisticData.netSalesDaily.value = statistic.netSalesDaily;
            statisticData.ordersPlaced.value = statistic.ordersPlaced;
            statisticData.itemsPurchased.value = statistic.itemsPurchased;
            statisticData.couponsWorth.value = statistic.couponsWorth;
            statisticData.giftCardsWorth.value = statistic.giftcardWorth;

            this.productsList = statistic.productsList;

        },
        setDefaultDates() {

            let startDate = new Date();

            startDate.setMonth(startDate.getMonth() - 1);

            let endDate = new Date();

            this.filter.date.start = startDate;

            this.filter.date.end = endDate;

        },
        getStatisticLabel(slug) {

            return this.$t('statistics.' + slug + '.label');

        },
        changeStatisticType(type) {

            this.statisticType = type;

        },
        isHidden(value) {


            if (this.statisticType !== this.statisticTypes[0] && value) {

                return true;

            }

        },
        searchProducts(search, loading) {

            let requestParams = {

                params: {
                    search: search
                }

            };

            //Search products
            this.products = this.loadItems('product', requestParams);

        },
        searchProducents(search, loading) {

            let requestParams = {

                params: {
                    search: search
                }

            };

            //Search products
            this.producents = this.loadItems('producent', requestParams);

        }
    },
    created() {

        //Set default dates
        this.setDefaultDates();

    },
    mounted() {
        //Fetch statistics data
        this.fetchData();
    }
}
</script>
