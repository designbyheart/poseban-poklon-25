//Validation library
import { required, minLength, between } from "vuelidate/lib/validators";

//Category model
export const model = {
    title: "",
    description: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_text: "",
    slug: "",
    parent_id: "",
    banner_id: "",
    filters: [],
    properties: {
        priority: 0,
        visibility: true
    },
    status: false
};

//Category validation params
export const validations = {
    model: {
        title: {
            required
        },
        description: {
            required
        },
        slug: {
            required
        }
    }
};

// Properties visibility params
export const visibility = [
    {
        value: true,
        slug: "Visible"
    },
    {
        value: false,
        slug: "Hidden"
    }
];

//Category form structure
export const formStructure = {
    sections: [
        {
            slug: "general",
            fields: [
                {
                    label: "Title",
                    model: "title",
                    type: "text",
                    validates: true
                },
                {
                    label: "Description",
                    model: "description",
                    type: "textarea"
                },
                {
                    label: "Slug",
                    model: "slug",
                    type: "text"
                }
            ]
        },
        {
            slug: "connections",
            fields: [
                {
                    label: "Parent category",
                    model: "parent_id",
                    type: "advancedSelect",
                    labelKey: "title",
                    valueKey: "id",
                    options: "categories",
                    multiple: false
                },
                {
                    label: "Banner",
                    model: "banner_id",
                    type: "advancedSelect",
                    labelKey: "title",
                    valueKey: "id",
                    options: "banners",
                    multiple: false
                },
                {
                    label: "Filters",
                    model: "filters",
                    type: "advancedSelect",
                    labelKey: "name",
                    valueKey: "id",
                    options: "filters",
                    multiple: true
                },
                {
                    label: "Visibility",
                    model: "properties.visibility",
                    type: "select",
                    labelKey: "slug",
                    valueKey: "value",
                    options: visibility,
                    multiple: false
                },
                {
                    label: "Priority",
                    model: "properties.priority",
                    type: "numberInput"
                }
            ]
        },
        {
            slug: "seo",
            fields: [
                {
                    label: "SEO title",
                    model: "seo_title",
                    type: "text"
                },
                {
                    label: "SEO description",
                    model: "seo_description",
                    type: "textarea"
                },
                {
                    label: "SEO keywords",
                    model: "seo_keywords",
                    type: "textarea"
                },
                {
                    label: "SEO text",
                    model: "seo_text",
                    type: "textarea"
                }
            ]
        }
    ]
};
