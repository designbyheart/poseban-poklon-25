<template>

</template>
<script>

    //Import necessary libraries
    import axios from 'axios';

    export default {

        //Component name
        name: 'Categories',
        props: {
            //Component props, can be set when using component in blade (:page-title="Custom title")
            pageTitle: {
                type: String,
                default: "Categories"
            }
        },
        data() {
            return {
                //Data to use and operate in component
                categories: []
            }
        },
        methods: {
            //Functions list
            getCategories(){}
        },
        mounted: {
            //Execute functions form a list above when component is rendered
        }

    }
</script>