//Get and set the global parameters of application
const applicationData = {
    data() {
        return {
           applicationParams: {
               siteLogo: "/images/header/posebanpoklon_logo.png"
           }
        }
    },
    methods: {
        setApplicationParams() {

            let params = window.applicationParams;

            if(params !== undefined){

                this.applicationParams = params;
                this.setUser();

            }

        },
        setUser(){

            if(this.applicationParams.user !== undefined){

                if(this.$store !== undefined){

                    this.$store.dispatch('setAppActiveUser', this.applicationParams.user);

                }

            }

        }
    },
    mounted(){
        this.setApplicationParams();
    }
};

export default {
    install (Vue, options){
        Vue.mixin(applicationData)
    }
}
