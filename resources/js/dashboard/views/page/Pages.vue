<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                        <vs-button color="primary" type="filled" :to="{ name: instanceSlug + '_create' }">{{ $t('actions.create') }}</vs-button>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th sort-key="title">
                    {{ getPropertyTitle('title') }}
                </vs-th>
                <vs-th sort-key="status">
                    {{ getPropertyTitle('status') }}
                </vs-th>
                <vs-th>
                    {{ $t('actions.title') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(page, indexItem) in data" >
                    <vs-td>
                        {{ page.title }}
                    </vs-td>
                    <vs-td>
                        <vs-icon icon="check" color="success" size="medium" v-if="page.status"></vs-icon>
                        <vs-icon icon="close" color="danger" size="medium" v-if="!page.status"></vs-icon>
                    </vs-td>
                    <vs-td>
                        <div class="flex">
                            <vs-button icon="visibility" class="mr-2" :href="API.page.show + page.slug" target="_blank"></vs-button>
                            <vs-button color="primary" icon="edit" class="text-sm mr-2" type="border" :to="{ name: instanceSlug + '_edit', params: {id: page.id} }"></vs-button>
                            <vs-button color="danger" icon="delete" @click="showDeleteAlert(page.id)"></vs-button>
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

                instance: 'page',
                instanceSlug: 'pages'

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