//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Model
export const model = {

    title: '',
    button_text: '',
    button_link: '',
    image_id: ''

};

//Shipping method validation params
export const validations = {

    model: {

        title: {
            required
        },
        button_text: {
            required
        },
        button_link: {
            required,
            url
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
                    model: 'button_text',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'button_link',
                    type: 'text',
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

