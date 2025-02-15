//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Model
export const model = {

    title: "",
    content: "",
    slug: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    status: false,
    show_in_menu: false

};

//Shipping method validation params
export const validations = {

    model: {

        title: {
            required
        },
        slug: {
            required
        }

    }

};
