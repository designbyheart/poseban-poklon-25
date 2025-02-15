<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                        <vs-button color="primary" type="filled" :to="{ name: 'products_create' }">{{ $t('actions.create') }}</vs-button>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th>{{ getPropertyTitle('image') }}</vs-th>
                <vs-th sort-key="title">{{ getPropertyTitle('title') }}</vs-th>
                <vs-th sort-key="price">{{ getPropertyTitle('price') }}</vs-th>
                <vs-th></vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(item, indexItem) in data" >
                    <vs-td>
                        <img v-bind:src="[item.images.length > 0 ? item.images[0].url : defaultImage]" class="w-32 h-32 object-cover rounded"/>
                    </vs-td>
                    <vs-td class="font-bold">
                        {{ item.title }}
                    </vs-td>
                    <vs-td class="font-bold">
                        {{ getPrice(item.price) }}
                    </vs-td>
                    <vs-td>
                        <div class="w-full flex">
                            <vs-button color="primary" class="mr-2" type="filled" icon="edit" :to="{ name: 'products_edit', params: {productId: item.id} }"></vs-button>
                            <vs-button color="danger" icon="delete" @click="showDeleteAlert(item.id)"></vs-button>
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

    //Products table schema
    import { tableSchema } from "@/static/product/table";

    export default {
        mixins: [tableHelper],
        data() {

            return {

                tableSchema,
                instance: 'product',
                currency: '',
                defaultImage: '/images/default/product/posebanpoklon_product.jpg'

            }

        },
        methods: {
            setCurrency(){

                this.currency = this.applicationParams.defaultCurrency;

            },
            getPrice(price){

                return price + ' ' + this.currency;

            }
        },
        created(){

            //Set the instance
            this.setInstance(this.instance);

        },
        mounted() {

            //Load items
            this.getItems();

            //Set a currency for displaying price
            this.setCurrency();

        }
    }
</script>