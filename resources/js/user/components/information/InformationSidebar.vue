<template>

    <div class="information-sidebar">
        <div class="information-sidebar-list">
            <div class="information-sidebar-list-item" :key="index" v-for="page, index in pages">
                <div class="sidebar-list-parent" v-bind:class="[ isActive(page.slug) ? 'information-list-active' : '' ]">
                    <a :href="getPageLink(page.slug)" class="parent-title">{{ page.title }}</a>
                </div>
            </div>
            <div class="information-sidebar-list-item">
                <div class="sidebar-list-parent" v-bind:class="[ isActive('kontaktiraj-nas') ? 'information-list-active' : '' ]">
                    <a href="/kontaktiraj-nas" class="parent-title">Kontaktiraj nas</a>
                </div>
            </div>
            <div class="information-sidebar-list-item">
                <div class="sidebar-list-parent" v-bind:class="[ isActive('postani-nas-partner') ? 'information-list-active' : '' ]">
                    <a href="/postani-nas-partner" class="parent-title">Postani naš partner</a>
                </div>
            </div>
            <!--<div class="information-sidebar-list-item">
                <div class="sidebar-list-parent information-list-active">
                    <span class="parent-title">Shipping Address</span>
                </div>
                <div class="information-sidebar-dropdown-list is-open">
                    <div class="information-sidebar-list-child">
                        <span>Sub Category</span>
                    </div>
                    <div class="information-sidebar-list-child">
                        <span>Sub Category</span>
                    </div>
                    <div class="information-sidebar-list-child">
                        <span>Sub Category</span>
                    </div>
                    <div class="information-sidebar-list-child">
                        <span>Sub Category</span>
                    </div>
                </div>
            </div>-->
        </div>
    </div>

</template>

<script>

    //Library for sending requests
    import axios from 'axios';

    export default {

        name: 'InformationSidebar',
        data() {

            return {

                pages: []

            }

        },
        methods: {

            getPages(){

                let requestUrl = this.API.page.list;

                axios.get(requestUrl).then(response => {

                    this.pages = response.data;

                });

            },
            getPageLink(slug){

                let link = '/' + slug;

                return link;

            },
            isActive(slug){

                let pathName = window.location.pathname.replace(/\//g, '');

                if(slug === pathName){

                    return true;

                }

            }

        },
        mounted(){

            this.getPages();

        }

    }

</script>