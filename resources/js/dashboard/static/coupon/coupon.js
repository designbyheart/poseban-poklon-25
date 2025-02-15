//Validation library
import { required, minLength, between, url } from 'vuelidate/lib/validators';

//Model
export const model = {

    title: '',
    coupon_code: '',
    is_percentage: false,
    value: '',
    product_id: '',
    category_id: '',
    start_date: '',
    end_date: '',
    limit: '',
    status: false

};

//Coupon validation params
export const validations = {

    model: {

        title: {
            required
        },
        coupon_code: {
            required
        },
        value: {
            required
        },
        start_date: {
            required
        },
        end_date: {
            required
        },
        limit: {
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
                    model: 'title',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'coupon_code',
                    type: 'text',
                    validates: true
                },
                {
                    model: 'value',
                    type: 'number',
                    validates: true
                },
                {
                    model: 'is_percentage',
                    type: 'checkbox',
                },
                {
                    model: 'start_date',
                    type: 'date',
                    validates: true
                },
                {
                    model: 'end_date',
                    type: 'date',
                    validates: true
                },
                {
                    model: 'limit',
                    type: 'number',
                    validates: true
                },
                {
                    model: 'status',
                    type: 'select',
                    validates: true,
                    labelKey: 'title',
                    valueKey: 'value',
                    options: 'statuses',
                    multiple: false
                },

            ]
        }

    ]

};

