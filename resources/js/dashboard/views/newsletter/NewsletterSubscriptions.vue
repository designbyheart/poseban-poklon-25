<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                        <vs-button @click="showSubscriptionsPopup">{{ $t('actions.export') }}</vs-button>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th sort-key="email">
                    {{ getColumnTitle('email') }}
                </vs-th>
                <vs-th>
                    {{ getColumnTitle('actions') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(subscription, indexItem) in data" >
                    <vs-td>
                        <span class="text-sm">{{subscription.email}}</span>
                    </vs-td>
                    <vs-td>
                        <vs-button color="danger" icon="delete" @click="showDeleteAlert(subscription.id)"></vs-button>
                    </vs-td>
                </vs-tr>
            </template>

        </vs-table>
        <div class="vx-row">
            <div class="vx-col flex justify-end items-center w-full p-3">
                <vs-pagination :total="pagination.totalPages" v-model="pagination.currentPage"></vs-pagination>
            </div>
        </div>

        <!--Download subscriptions popup-->
        <vs-popup :title="$t('modals.downloadSubscriptions.title')" :active.sync="downloadSubscriptionsPopup.active">

            <div class="vx-row">

                <div class="vx-col w-1/2 mb-3 overflow-visible">

                    <p class="text-sm font-bold mb-2">{{ $t('modals.downloadSubscriptions.properties.from') }}</p>
                    <datepicker v-model="downloadSubscriptionsPopup.from" format="dd.MM.yy"></datepicker>

                </div>

                <div class="vx-col w-1/2 mb-3 overflow-visible">

                    <p class="text-sm font-bold mb-2">{{ $t('modals.downloadSubscriptions.properties.to') }}</p>
                    <datepicker v-model="downloadSubscriptionsPopup.to" format="dd.MM.yy"></datepicker>

                </div>

                <div class="vx-col w-full">

                    <vs-button @click="downloadSubscriptions">{{ $t('actions.download') }}</vs-button>

                </div>

            </div>

        </vs-popup>

    </div>

</template>
<script>

    //Library for sending requests
    import axios from 'axios';

    //Table helper functions
    import tableHelper from "@/mixins/tables/helper";

    //Datepicker component
    import Datepicker from 'vuejs-datepicker';

    export default {
        components: {Datepicker},
        mixins: [tableHelper],
        data() {

            return {

                instance: 'newsletterSubscription',
                instanceSlug: 'subscriptions',
                downloadSubscriptionsPopup: {
                    active: false,
                    from: new Date(),
                    to: new Date()
                }

            }

        },
        methods: {

            showSubscriptionsPopup(){

                this.downloadSubscriptionsPopup.active = true;

            },
            downloadSubscriptions(){

                let requestUrl = '/dashboard/subscriptions/download';

                let requestParams = {
                    from: this.convertDate(this.downloadSubscriptionsPopup.from),
                    to: this.convertDate(this.downloadSubscriptionsPopup.to)
                };

                axios({
                    method: 'post',
                    url: requestUrl,
                    responseType: 'blob'
                }, requestParams).then(response => {

                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'newsletter_subscriptions.csv'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                });

            }

        },
        created(){

            //Set the instance
            this.setInstance(this.instance);

        },
        mounted() {

            //Load items
            this.getItems();

        }
    }
</script>

<style>

    .vs-popup--content{

        overflow: visible;

    }

</style>