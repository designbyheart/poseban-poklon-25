import { dictionary } from "./dictionary";

const messagesMixin = {
    props: {

        locale: {

            type: String,
            default: 'en'

        }

    },
    data() {

        return {

            messages: {}

        }

    },
    methods: {

        setLocale(){

        },
        getDictionary(){

            let locale = this.locale;

            this.messages = dictionary[locale];

        }

    },
    created: function(){

        this.getDictionary();

    }

};

export default messagesMixin;