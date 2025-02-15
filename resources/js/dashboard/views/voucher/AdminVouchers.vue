<template>

    <div class="abr-vouchers-container">
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th sort-key="title">
                    {{ getColumnTitle('title') }}
                </vs-th>
                <vs-th sort-key="title">
                    {{ getColumnTitle('order') }}
                </vs-th>
                <vs-th sort-key="voucher_code">
                    {{ getColumnTitle('voucherCode') }}
                </vs-th>
                <vs-th sort-key="activation_code">
                    {{ getColumnTitle('activationCode') }}
                </vs-th>
                <vs-th sort-key="end_date">
                    {{ getColumnTitle('endDate') }}
                </vs-th>
                <vs-th sort-key="activated">
                    {{ getColumnTitle('activated') }}
                </vs-th>
                <vs-th>
                    {{ $t('actions.title') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(voucher, indexItem) in data" >
                    <vs-td>
                        {{ voucher.title }}
                    </vs-td>
                    <vs-td>
                        <span v-if="voucher.order !== undefined && voucher.order !== null">
                        {{ voucher.order.id }}
                        </span>
                    </vs-td>
                    <vs-td>
                        {{ voucher.voucher_code }}
                    </vs-td>
                    <vs-td>
                        {{ voucher.activation_code }}
                    </vs-td>
                    <vs-td>
                        {{ convertDate(voucher.end_date) }}
                    </vs-td>
                    <vs-td>
                        <vs-icon icon="check" color="success" size="medium" v-if="voucher.activated"></vs-icon>
                        <vs-icon icon="close" color="danger" size="medium" v-if="!voucher.activated"></vs-icon>
                    </vs-td>
                    <vs-td>
                        <div class="flex">
                            <vs-button color="primary" icon="edit" class="text-sm mr-2" type="border" :to="{ name: instanceSlug + '_edit', params: {id: voucher.id} }"></vs-button>
                            <vs-button color="primary" icon="print" class="mr-2" :href="getPrintUrl(voucher.id, 'a4')" target="_blank">A4</vs-button>
                            <vs-button color="primary" icon="print" class="mr-2" :href="getPrintUrl(voucher.id, 'a5')" target="_blank">A5</vs-button>
                            <vs-button color="danger" icon="delete" @click="showDeleteAlert(voucher.id)"></vs-button>
                        </div>
                    </vs-td>
                </vs-tr>
            </template>

        </vs-table>
        <div class="vx-row">
            <div class="vx-col flex justify-end items-center w-full p-3">
                <vs-pagination :total="pagination.totalPages" v-model="pagination.currentPage"></vs-pagination>
            </div>
        </div>
    </div>

</template>
<script>

    //Table helper functions
    import tableHelper from "@/mixins/tables/helper";

    export default {
        mixins: [tableHelper],
        data() {

            return {

                instance: 'voucher',
                instanceSlug: 'vouchers'

            }

        },
        methods: {

            getPrintUrl(voucherId, paperSize){

                return this.API.voucher.print + '/' + voucherId + '?paper_size=' + paperSize

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