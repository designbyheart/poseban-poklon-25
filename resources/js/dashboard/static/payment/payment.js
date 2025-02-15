//Validation library
import { required, minLength, between } from 'vuelidate/lib/validators';

//Shipping method model
export const model = {

    name: '',
    description: '',
    image_id: ''

};

//Shipping method validation params
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
            slug: 'images',
            fields: [
                {
                    model: 'image_id',
                    type: 'imageUpload',
                    options: 'images',
                    multiple: false
                }
            ]
        }

    ]

};

