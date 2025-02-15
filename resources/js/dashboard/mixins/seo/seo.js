const seoMixin = {
    watch:{
        $route (to, from){

            //Set the meta tags on route change
            this.setMeta();

        }
    },
    methods: {

        setMeta(){

            let title_code = this.$route.meta.title;

            let title = this.$t(title_code);

            let description_code = this.$route.meta.description;

            let description = this.$t(description_code);

            document.title = title;

            document.querySelector('meta[name="description"]').setAttribute("content", description);

        }

    },
    mounted(){

    }

};

export default {
    install (Vue, options){
        Vue.mixin(seoMixin)
    }
}