export const addressModel = {
    user_id: '',
    first_name: '',
    last_name: '',
    company: '',
    address_one: '',
    address_two: '',
    city: '',
    post_code: '',
    country: '',
    region: ''
};

export const virtualAddressModel = {
    user_id: '',
    first_name: '',
    last_name: '',
    number: '',
    email: ''
};

export const phoneValidationRule = { regex: /\+?\d/, required: true, min: 5 };

export const countries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Luxembourg', 'Lithuania',
    'Malta', 'Montenegro', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Serbia', 'Slovak Republic', 'Slovenia', 'Spain', 'Sweden', 'United Kingdom', 'Ukraine'];