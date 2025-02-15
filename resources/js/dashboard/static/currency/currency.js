//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Model
export const model = {

    title: "",
    code: "",
    rates: []

};

//Shipping method validation params
export const validations = {

    model: {

        title: {
            required
        },
        code: {
            required
        }

    }

};

//Form structure
export const formStructure = {

    sections: [

        {
            slug: 'general',
            fields: [

                {
                    model: 'title',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'code',
                    type: 'text',
                    validates: true
                }

            ]
        },

    ]

};

