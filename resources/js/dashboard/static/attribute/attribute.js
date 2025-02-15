//Validation library
import { required, minLength, between } from 'vuelidate/lib/validators';

//Attribute model
export const model = {

    name: '',
    description: '',
    filter_id: ''

};

//Attribute validation params
export const validations = {

    model: {

        name: {
            required
        },
        filter_id: {
            required
        }

    }

};

//Attribute form structure
export const formStructure = {

    sections: [

        {
            slug: 'general',
            fields: [

                {
                    model: 'name',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'description',
                    type: 'textarea'
                }

            ]
        },
        {
            slug: 'connections',
            fields: [
                {
                    model: 'filter_id',
                    type: 'select',
                    labelKey: 'name',
                    valueKey: 'id',
                    options: 'filters',
                    multiple: false
                }
            ]
        }

    ]

};

