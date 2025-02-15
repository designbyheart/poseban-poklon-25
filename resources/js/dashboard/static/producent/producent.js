//Validation library
import { required, minLength, between } from 'vuelidate/lib/validators';

//Producent model
export const model = {

    title: '',
    description: '',
    slug: '',
    phone_number: '',
    email: '',
    location: ''

};

//Producent validation params
export const validations = {

    model: {

        title: {
            required
        },
        phone_number: {
            required
        },
        email: {
            required
        },
        location: {
            required
        }

    }

};

//Producent form structure
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
                    model: 'description',
                    type: 'textarea'
                }

            ]
        },
        {
            slug: 'contact',
            fields: [
                {
                    model: 'phone_number',
                    type: 'text'
                },
                {
                    model: 'email',
                    type: 'text'
                },
                {
                    model: 'location',
                    type: 'text'
                }
            ]
        }

    ]

};

