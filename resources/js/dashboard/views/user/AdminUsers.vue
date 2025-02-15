<template>

    <div>
        <vs-table :max-items="per_page" :sst="true" :data="items" :noDataText="$t('messages.notFound')" @sort="handleSort">

            <template slot="header">
                <div class="vx-row w-full pb-3 m-0">
                    <div class="vx-col flex items-center w-1/2 p-0">
                        <h3 class="mb-0 mr-3">
                            {{ getTableTitle() }}
                        </h3>
                        <vs-button @click="showDownloadPopup">{{ $t('actions.export') + ' ' + $tc('models.user.title', 2) }}</vs-button>
                    </div>
                    <div class="vx-col flex items-center justify-end w-1/2 p-0">
                        <vs-input icon="search" :placeholder="$t('actions.search')" v-model="search" class="w-full" />
                    </div>
                </div>
            </template>

            <template slot="thead">
                <vs-th sort-key="name">
                    {{ getPropertyTitle('name') }}
                </vs-th>
                <vs-th sort-key="email">
                    {{ getPropertyTitle('email') }}
                </vs-th>
                <vs-th sort-key="user_role_id">
                    {{ getPropertyTitle('role') }}
                </vs-th>
                <vs-th sort-key="status">
                    {{ getPropertyTitle('status') }}
                </vs-th>
                <vs-th>
                    {{ $t('actions.title') }}
                </vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="indexItem" v-for="(user, indexItem) in data" v-bind:class="[ isCurrentUser(user.id) ? 'font-bold' : '' ]">
                    <vs-td>
                        {{ user.name }}
                    </vs-td>
                    <vs-td>
                        {{ user.email }}
                    </vs-td>
                    <vs-td>
                        {{ user.role.name }}
                    </vs-td>
                    <vs-td>
                        <vs-icon icon="check" color="success" size="medium" v-if="user.status"></vs-icon>
                        <vs-icon icon="close" color="danger" size="medium" v-else></vs-icon>
                    </vs-td>
                    <vs-td>
                        <div class="flex" v-if="!isCurrentUser(user.id)">
                            <vs-button icon="edit" class="mr-2" @click="showUserPopup(user)"></vs-button>
                            <vs-button color="danger" icon="delete" @click="showDeleteAlert(user.id)"></vs-button>
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

        <!--Edit user popup-->
        <vs-popup :title="$t('actions.edit') + ' ' + $tc('models.user.title', 1)" :active.sync="userPopup.active">

            <div class="vx-row">

                <div class="vx-col w-1/2 mb-3">

                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('name') }}</p>
                    <p>{{ userPopup.data.name }}</p>

                </div>

                <div class="vx-col w-1/2 mb-3">

                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('email') }}</p>
                    <p>{{ userPopup.data.email }}</p>

                </div>

                <div class="vx-col w-1/2 mb-3" v-if="userPopup.active">

                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('role') }}</p>
                    <vs-select v-model="userPopup.data.user_role_id" :is-selected.sync="userPopup.data.user_role_id">
                        <vs-select-item :key="index" :value="item.id" :text="item.name" v-for="item,index in roles" />
                    </vs-select>

                </div>

                <div class="vx-col w-1/2 mb-3" v-if="userPopup.active">

                    <p class="font-bold text-sm mb-2">{{ getPropertyTitle('status') }}</p>
                    <vs-select v-model="userPopup.data.status" :is-selected.sync="userPopup.data.status">
                        <vs-select-item :key="index" :value="item.value" :text="getPropertyTitle('statuses.' + item.slug)" v-for="item,index in statuses" />
                    </vs-select>

                </div>

                <div class="vx-col w-full">
                    <vs-button @click="updateUser">{{ $t('actions.update') }}</vs-button>
                </div>

            </div>

        </vs-popup>

        <!--Download users popup-->
        <vs-popup :title="$t('modals.downloadUsers.title')" :active.sync="downloadUsersPopup.active">

            <div class="vx-row">

                <div class="vx-col w-1/2 mb-3 overflow-visible">

                    <p class="text-sm font-bold mb-2">{{ $t('modals.downloadUsers.properties.from') }}</p>
                    <datepicker v-model="downloadUsersPopup.from" format="dd.MM.yy"></datepicker>

                </div>

                <div class="vx-col w-1/2 mb-3 overflow-visible">

                    <p class="text-sm font-bold mb-2">{{ $t('modals.downloadUsers.properties.to') }}</p>
                    <datepicker v-model="downloadUsersPopup.to" format="dd.MM.yy"></datepicker>

                </div>

                <div class="vx-col w-full">

                    <vs-button @click="downloadUsers">{{ $t('actions.download') }}</vs-button>

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

    //Datepicker component
    import Datepicker from 'vuejs-datepicker';

    export default {
        components: {Datepicker},
        mixins: [tableHelper],
        data() {

            return {

                instance: 'user',
                instanceSlug: 'users',
                userPopup: {
                    active: false,
                    data: []
                },
                downloadUsersPopup: {
                    active: false,
                    from: new Date(),
                    to: new Date()
                },
                roles: [
                    {
                        id: 1,
                        name: "user"
                    },
                    {
                        id: 2,
                        name: "admin"
                    },
                    {
                        id: 3,
                        name: "editor"
                    }
                ],
                statuses: [
                    {
                        value: true,
                        slug: 'active'
                    },
                    {
                        value: false,
                        slug: 'suspended'
                    }
                ]

            }

        },
        methods: {
            showUserPopup(user){

                this.userPopup.data = Object.assign({}, user);
                this.userPopup.active = true;

            },
            changeUserRole(userId, roleId){

                let requestUrl = this.API.user.changeRole;

                let requestParams = {
                    user: userId,
                    role: roleId
                };

                axios.post(requestUrl, requestParams);

            },
            changeUserStatus(userId){

                let requestUrl = this.API.user.changeStatus;

                let requestParams = {
                    user: userId
                };

                axios.post(requestUrl, requestParams);

            },
            updateUser(){

                let user = this.userPopup.data;

                let roleId = user.user_role_id;

                let status = user.status;

                let initialData = this.items.find(function(item){

                    return item.id === user.id;

                });

                if(initialData !== undefined){

                    try{

                        if(roleId !== initialData.user_role_id){

                            this.changeUserRole(user.id, roleId);

                        }

                        if(status != initialData.status){

                            this.changeUserStatus(user.id);

                        }

                        this.showNotification('success', 'request.updatedSuccess', 'success');

                        //Refresh the list
                        this.getItems();

                    }
                    catch(e){

                        this.showNotification('error', 'request.error', 'danger');

                    }

                }

            },
            isCurrentUser(userId){

                return userId === this.applicationParams.user.id;

            },
            showDownloadPopup(){

                this.downloadUsersPopup.active = true;

            },
            downloadUsers(){

                let requestUrl = '/dashboard/users/download';

                let requestParams = {
                    from: this.convertDate(this.downloadUsersPopup.from),
                    to: this.convertDate(this.downloadUsersPopup.to)
                };

                axios({
                    method: 'post',
                    url: requestUrl,
                    responseType: 'blob'
                }, requestParams).then(response => {

                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'users.csv'); //or any other extension
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