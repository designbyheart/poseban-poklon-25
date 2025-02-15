<template>

    <section class="breadcrumb-container container">
        <div class="row">
            <div class="col-lg-12 breadcrumb-row">
                <div class="breadcrumb-row-item" :key="index" v-for="link, index in links">

                    <a :href="link.url">
                        <div class="breadcrumb-item-text">{{ link.title }}</div>
                    </a>
                    <div class="breadcrumb-arrow" v-if="++index < links.length">></div>

                </div>
            </div>
            <category-banner :banner="banner"></category-banner>
            <div class="cat-sidebar-title-row">
                <h3 class="cat-sidebar-title">{{ title }}</h3>
            </div>
        </div>
    </section>

</template>

<script>

    export default {
        name: 'CategoriesBreadcrumb',
        props: {
            banner: {
                type: Object
            }
        },
        data(){

            return {

                title: '',
                defaultTitle: 'Kategorije',
                links: [
                    {
                        url: '/',
                        title: 'Naslovna'
                    },
                    {
                        url: '/kategorije',
                        title: 'Prodavnica'
                    }
                ]

            }

        },
        methods: {

            setPageTitle(title){

                if(title === undefined){

                    title = this.defaultTitle;

                }

                this.title = title;

            },
            updateBreadcrumb(breadcrumb){

                let links = this.links;

                if(links.length > 2){

                    if(links.length === 5){

                        links.splice(2, 3);

                    }
                    else{

                        links.splice(2, 2);

                    }

                }

                breadcrumb.forEach(function (item) {

                    links.push(item);

                });

            },
            listenEvents(){

                this.EventBus.$on('breadcrumb-changed', (breadcrumb) => {

                    this.updateBreadcrumb(breadcrumb);

                });

                this.EventBus.$on('category-changed', (title) => {

                    this.setPageTitle(title);

                });

            }

        },
        mounted(){

            //Listen to events
            this.listenEvents();

        }

    }

</script>