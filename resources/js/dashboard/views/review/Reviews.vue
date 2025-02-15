<template>

    <div>
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
                <vs-th sort-key="product_id">
                    {{ getPropertyTitle('product') }}
                </vs-th>
                <vs-th sort-key="user_id">
                    {{ getPropertyTitle('user') }}
                </vs-th>
                <vs-th sort-key="rating">
                    {{ getPropertyTitle('rating') }}
                </vs-th>
                <vs-th sort-key="status">
                    {{ getPropertyTitle('status') }}
                </vs-th>
                <vs-th sort-key="created_at">
                    {{ getPropertyTitle('createdAt') }}
                </vs-th>
                <vs-th>
                    {{ $t('actions.title') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(review, indexItem) in data" >
                    <vs-td>
                        <p class="text-sm">{{ review.product.title }}</p>
                    </vs-td>
                    <vs-td>
                        <p class="text-sm">{{ review.user.email }}</p>
                    </vs-td>
                    <vs-td>
                        <star-rating :rating="review.rating" :read-only="true" :increment="0.5" :star-size="15"></star-rating>
                    </vs-td>
                    <vs-td>
                        <vs-icon icon="check" color="success" size="small" v-if="review.status"></vs-icon>
                        <vs-icon icon="close" color="danger" size="small" v-if="!review.status"></vs-icon>
                    </vs-td>
                    <vs-td>
                        <p class="text-sm">{{ convertDate(review.created_at) }}</p>
                    </vs-td>
                    <vs-td>
                        <div class="flex">
                            <vs-button color="primary" icon="remove_red_eye" class="text-sm mr-2" type="border" @click="openReviewPopup(review.id)"></vs-button>
                            <vs-button color="danger" icon="delete" @click="showDeleteAlert(review.id)"></vs-button>
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

        <!--Comment popup-->
        <vs-popup :title="$t('actions.view') + ' ' + $tc('models.review.title', 1)" :active.sync="reviewPopup.active" v-if="reviewPopup.active">
            <div class="vx-row w-full px-0 mb-6">
                <div class="vx-col w-full">
                    <p class="font-bold">{{ getPropertyTitle('user') }}</p>
                </div>
                <div class="vx-col w-1/2">
                    <p>{{ reviewPopup.data.user.name }}</p>
                </div>
                <div class="vx-col w-1/2">
                    <p>{{ reviewPopup.data.user.email }}</p>
                </div>
            </div>
            <div class="vx-row w-full px-0 mb-6">
                <div class="vx-col w-full">
                    <p class="font-bold">{{ getPropertyTitle('createdAt') }}</p>
                </div>
                <div class="vx-col w-full">
                    <p>{{ convertDate(reviewPopup.data.created_at) }}</p>
                </div>
            </div>
            <div class="vx-row w-full px-0 mb-6">
                <div class="vx-col w-full">
                    <p class="font-bold">{{ getPropertyTitle('content') }}</p>
                </div>
                <div class="vx-col w-full">
                    <p>{{ reviewPopup.data.content }}</p>
                </div>
            </div>
            <div class="vx-row w-full px-0">
                <div class="vx-col w-full">
                    <vs-button @click="approveReview(reviewPopup.data.id)">{{ $t('actions.approve') }}</vs-button>
                    <vs-button color="danger" @click="showDeleteAlert(reviewPopup.data.id)">{{ $t('actions.delete') }}</vs-button>
                </div>
            </div>
        </vs-popup>

    </div>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Table helper functions
    import tableHelper from "@/mixins/tables/helper";

    //Star rating component
    import StarRating from 'vue-star-rating'

    export default {
        mixins: [tableHelper],
        components: {StarRating},
        data() {

            return {

                instance: 'review',
                instanceSlug: 'reviews',
                reviewPopup: {
                    active: false,
                    data: {}
                }

            }

        },
        methods: {
            approveReview(id) {

                let requestUrl = this.API.review.approve;

                let requestParams = {
                    id: id
                };

                axios.post(requestUrl, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.approvedSuccess', 'success');

                                //Refresh the list
                                this.getItems(this.per_page);

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            openReviewPopup(id){

                let review = this.items.find(function(item){

                    return item.id = id;

                });

                this.reviewPopup.data = review;

                this.reviewPopup.active = true;

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