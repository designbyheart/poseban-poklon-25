<template>

    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <div class="profile-sidebar">
            <div class="profile-sidebar-list">
                <div class="profile-sidebar-list-item" :key="index" v-for="link,index in links">
                    <div v-bind:class="itemClasses(link.path)">
                        <a :href="link.path">
                            <span class="parent-title">{{ link.title }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'ProfileSidebar',
        data(){

            return {

                links: [
                    {
                        title: 'Moj profil',
                        path: '/profile/edit'
                    },
                    {
                        title: 'Moj Newsletter',
                        path: '/profile/subscription'
                    },
                    {
                        title: 'Porudžbine',
                        path: '/profile/orders'
                    },
                    {
                        title: 'Adrese',
                        path: '/profile/shipping'
                    },
                    {
                        title: 'Lista želja',
                        path: '/profile/wishlist'
                    }
                ]

            }

        },
        methods: {

            itemClasses(path){

                let classList = 'sidebar-list-parent';

                if(window.location.pathname === path){

                    classList += ' ';
                    classList += 'profile-list-active'

                }

                return classList;

            }

        }
    }

</script>