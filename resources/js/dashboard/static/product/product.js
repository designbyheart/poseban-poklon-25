//Validation library
import { required, minLength, between } from "vuelidate/lib/validators";

//Product types list
export const productTypes = [
    {
        title: "Product",
        slug: "product"
    },
    {
        title: "Gift Card",
        slug: "gift_card"
    }
];

//Product properties model
export const productProperties = {
    additional_info: "",
    za_gledaoce: "",
    weather: "",
    visitors: "",
    duration: "",
    dress_code: ""
};

//Product model
export const model = {
    title: "",
    description: "",
    short_description: "",
    voucher_description: "",
    za_koga: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    price: "",
    company_price: "",
    slug: "",
    view_count: "0",
    like_count: "0",
    status: false,
    product_id: "",
    producent_id: "",
    type: productTypes[0].slug,
    attributes: [],
    categories: [],
    images: [],
    properties: productProperties
};

//Product validation params
export const validations = {
    product: {
        title: {
            required
        },
        description: {
            required
        },
        short_description: {
            required
        },
        voucher_description: {
            required
        },
        price: {
            required
        },
        company_price: {
            required
        },
        view_count: {
            required
        },
        like_count: {
            required
        },
        producent_id: {
            required
        },
        slug: {
            required
        }
    },
    selectedCategories: {
        required
    }
};
