<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = new \App\Setting([
            'title' => 'Main Page',
            'slug' => 'main_page'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Default Order Status',
            'slug' => 'order_status'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Default Currency',
            'slug' => 'default_currency'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Logo',
            'slug' => 'site_logo'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Facebook Pixel',
            'slug' => 'pixel_code'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Google Analytics',
            'slug' => 'analytics_code'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Custom Scripts',
            'slug' => 'custom_js'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Custom Styles',
            'slug' => 'custom_css'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Facebook Profile',
            'slug' => 'fb_url'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Twitter Profile',
            'slug' => 'twitter_url'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Instagram Profile',
            'slug' => 'instagram_url'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Youtube Profile',
            'slug' => 'youtube_url'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Phone Number',
            'slug' => 'contact_phone'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Contact Email',
            'slug' => 'contact_email'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Categories page SEO Title',
            'slug' => 'categories_seo_title'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Categories page SEO Keywords',
            'slug' => 'categories_seo_keywords'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Categories page SEO Text',
            'slug' => 'categories_seo_text'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Categories page SEO Description',
            'slug' => 'categories_seo_description'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Home page SEO Title',
            'slug' => 'home_seo_title'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Home page SEO Description',
            'slug' => 'home_seo_description'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Home page SEO Keywords',
            'slug' => 'home_seo_keywords'
        ]);
        $setting->save();

        $setting = new \App\Setting([
            'title' => 'Home page SEO Text',
            'slug' => 'home_seo_text'
        ]);
        $setting->save();
    }

}
