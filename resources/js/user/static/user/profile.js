//Validation library
import { required, minLength, between, url, sameAs } from 'vuelidate/lib/validators';

//Profile validation params
export const profileValidations = {

    user: {

        name: {
            required
        },
        email: {
            required
        }

    },
    passwordForm: {
        confirmPassword: {
            sameAsNewPassword: sameAs('newPassword')
        }
    }

};