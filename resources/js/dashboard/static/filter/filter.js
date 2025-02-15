//Validation library
import { required, minLength, between } from 'vuelidate/lib/validators';

//Filter model
export const model = {

    name: '',
    description: '',
    attributes: []

};

//Filter validation params
export const validations = {

    model: {

        name: {
            required
        }

    }

};

//Filter form structure
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
                    model: 'attributes',
                    type: 'select',
                    labelKey: 'name',
                    valueKey: 'id',
                    options: 'attributes',
                    multiple: true
                }
            ]
        }

    ]

};

