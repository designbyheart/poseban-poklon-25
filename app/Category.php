<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['title', 'description', 'banner_id', 'seo_title', 'seo_description', 'seo_keywords', 'seo_text', 'properties'];

    public function parent()
    {
        return $this->belongsTo('App\Category', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany('App\Category', 'parent_id');
    }

    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    public function getCategoriesList($categories = null)
    {
        if (!$categories) {
            $categories = collect($this->id);
        } else {
            $categories = $categories->prepend($this->id);
        }
        if ($this->children) {
            foreach ($this->children as $child) {
                $child->getCategoriesList($categories);
            }
        }
        return $categories;
    }

    public function products()
    {
        return $this->belongsToMany('App\Product', 'products_categories')->withTimestamps();
    }

    public function filters()
    {
        return $this->belongsToMany('App\Filter', 'categories_filters')->withTimestamps();
    }

    public function fitersWithAttributes()
    {
        return $this->filters()->with('attributes');
    }

    public function banner()
    {
        return $this->belongsTo('App\Banner', 'banner_id');
    }

    public function promotion()
    {
        return $this->hasOne('App\Promotion', 'category_id');
    }

    public function bundles()
    {
        return $this->belongsToMany('App\Bundle', 'bundles_categories')->withTimestamps();
    }

    public function getBreadcrumbs($breadcrumbs = [])
    {
        $item = ['url' => route('categories.show', ['slug' => $this->slug]), 'title' => $this->title];
        $breadcrumbs = array_prepend($breadcrumbs, $item);
        if ($this->parent) {
            $breadcrumbs = $this->parent->getBreadcrumbs($breadcrumbs);
        }
        $breadcrumbs = array_prepend($breadcrumbs, ['url' => route('categories.index'), 'title' => 'Prodavnica']);
        if (!in_array(['url' => route('home'), 'title' => 'Naslovna'], $breadcrumbs)) {
            $breadcrumbs = array_prepend($breadcrumbs, ['url' => route('home'), 'title' => 'Naslovna']);
        }

        return $breadcrumbs;
    }
}
