<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                        <vs-button color="primary" type="filled" :to="{ name: 'categories_create' }">{{ $t('actions.create') }}</vs-button>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th :sort-key="column.sortKey" :key="index" v-for="column, index in tableSchema.columns">
                    {{ getColumnTitle(column.model) }}
                </vs-th>
                <vs-th></vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(item, indexItem) in data" >
                    <vs-td :data="item[column.model]" :key="index" v-for="(column, index) in tableSchema.columns">
                        {{ item[column.model] }}
                    </vs-td>

                    <vs-td>
                        <div class="w-full flex">
                            <vs-button color="primary" class="mr-2" type="filled" :to="{ name: 'categories_edit', params: {categoryId: item.id} }">{{ $t('actions.edit') }}</vs-button>
                            <vs-button color="danger" type="filled" @click="showDeleteAlert(item.id)">{{ $t('actions.delete') }}</vs-button>
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

    //Categories table schema
    import { tableSchema } from "@/static/category/table";

    export default {
        mixins: [tableHelper],
        data() {

            return {

                tableSchema,
                instance: 'category'

            }

        },
        methods: {

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