//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Shipping method validation params
export const validations = {

    model: {

        title: {
            required
        },
        description: {
            required
        },
        additional_info: {
            required
        },
        location: {
            required
        },
        weather: {
            required
        },
        visitors: {
            required
        },
        duration: {
            required
        },
        dress_code: {
            required
        },
        za_gledaoce: {
            required
        },
        voucher_code: {
            required
        },
        activation_code: {
            required
        },
        end_date: {
            required
        }

    }

};
