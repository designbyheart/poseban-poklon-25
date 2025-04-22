<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')"
                  @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full"/>
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th sort-key="id">
                    {{ getColumnTitle('order') }}
                </vs-th>
                <vs-th>
                    {{ getColumnTitle('shipping') }}
                </vs-th>
                <vs-th sort-key="status">
                    {{ getColumnTitle('status') }}
                </vs-th>
                <vs-th sort-key="created_at">
                    {{ getColumnTitle('date') }}
                </vs-th>
                <vs-th sort-key="total">
                    {{ getColumnTitle('total') }}
                </vs-th>
                <vs-th>
                    {{ getColumnTitle('actions') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(order, indexItem) in data">
                    <vs-td>
                        <span class="text-primary">#{{ order.id }}</span> <span
                        class="text-sm">{{ (order?.customer_name ?? '') + ' ' + (order.customer_surname ?? '') }}</span>
                        <br/>
                        <span class="text-sm">{{ order.customer_email }}</span>
                    </vs-td>
                    <vs-td>
                        <span class="text-sm">
                            {{ buildAddress(order) }}
                        </span>
                        <br/>
                        <span class="text-sm text-primary">
                            {{ order.shipping_method.name }}
                        </span>
                    </vs-td>
                    <vs-td>
                        <span class="text-sm">
                            {{ {
                                1: 'Kreirana',
                                2: 'Plaćeno',
                                3: 'Završeno',
                                4: 'Neuspešno'
                            }[order.order_status_id] || order?.status?.title || '' }}
                        </span>
                    </vs-td>
                    <vs-td>
                        <span class="text-sm">
                            {{ convertDate(order?.created_at) }}
                        </span>
                    </vs-td>
                    <vs-td>
                        <span class="text-sm">
                            {{ order.total + ' RSD' }}
                        </span>
                        <br/>
                        <span class="text-sm text-primary">{{ order.payment_method.name }}</span>
                    </vs-td>
                    <vs-td>
                        <vs-button color="primary" class="text-sm"
                                   :to="{ name: instanceSlug + '_show', params: {id: order.id} }">{{
                                $t('actions.view')
                            }}
                        </vs-button>
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

//Banners table schema
import {tableSchema} from "@/static/order/table";

export default {
    mixins: [tableHelper],
    data() {

        return {

            tableSchema,
            instance: 'order',
            instanceSlug: 'orders'

        }

    },
    created() {

        //Set the instance
        this.setInstance(this.instance);

    },
    mounted() {

        //Load items
        this.getItems();

    }
}
</script>
