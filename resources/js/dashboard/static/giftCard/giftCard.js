//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Model
export const model = {

    value: "",
    code: "",
    status: false

};

//Shipping method validation params
export const validations = {

    model: {

        value: {
            required
        },
        code: {
            required
        },
        status: {
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
                    model: 'value',
                    type: 'number',
                    validates: true
                },
                {
                    model: 'code',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'status',
                    type: 'select',
                    validates: true,
                    labelKey: 'title',
                    valueKey: 'value',
                    options: 'giftCardStatuses',
                    multiple: false
                },

            ]
        }

    ]

};

