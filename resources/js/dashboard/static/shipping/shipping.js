//Validation library
import { required, minLength, between } from 'vuelidate/lib/validators';

//Shipping method model
export const model = {

    name: '',
    description: '',
    cost: '',
    image_id: ''

};

//Shipping method validation params
export const validations = {

    model: {

        name: {
            required
        },
        cost: {
            required
        }

    }

};

//Shipping method form structure
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
            slug: 'price',
            fields: [
                {
                    model: 'cost',
                    type: 'number',
                    validates: true
                }
            ]
        },
        {
            slug: 'images',
            fields: [
                {
                    model: 'image_id',
                    type: 'imageUpload',
                    multiple: false
                }
            ]
        }

    ]

};

