//Validation library
import { required, minLength, between, url, sameAs } from 'vuelidate/lib/validators';

export const validationSchema = {

    products: {
        required
    }

};