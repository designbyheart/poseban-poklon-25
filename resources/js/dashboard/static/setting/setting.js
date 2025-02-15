//The list of all settings
export const settingsList = [

    {
        slug: 'site_logo',
        type: 'image',
        value: ''
    },
    {
        slug: 'default_currency',
        type: 'select',
        options: 'currencies',
        labelKey: 'title',
        valueKey: 'code',
        value: ''
    },
    {
        slug: 'order_status',
        type: 'select',
        options: 'orderStatuses',
        labelKey: 'title',
        valueKey: 'id',
        value: ''
    },
    {
        slug: 'analytics_code',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'pixel_code',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'custom_js',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'custom_css',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'fb_url',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'twitter_url',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'instagram_url',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'youtube_url',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'contact_phone',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'contact_email',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'categories_seo_title',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'categories_seo_keywords',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'categories_seo_description',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'home_seo_title',
        type: 'textInput',
        value: ''
    },
    {
        slug: 'home_seo_keywords',
        type: 'textarea',
        value: ''
    },
    {
        slug: 'home_seo_description',
        type: 'textarea',
        value: ''
    }

];

export const options = [

    {
        name: 'currencies',
        instance: 'currency',
        data: []
    },
    {
        name: 'orderStatuses',
        instance: 'orderStatus',
        data: []
    }

];