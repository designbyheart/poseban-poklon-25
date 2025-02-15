@extends('layouts.app')

@section('seo_title', $category->seo_title)
@section('seo_description', $category->seo_description)
@section('seo_keywords', $category->seo_keywords)

@section('content')
    @if(!empty($category->banner))
        <categories-breadcrumb :banner="{{ $category->banner }}"></categories-breadcrumb>
    @else
        <categories-breadcrumb></categories-breadcrumb>
    @endif
    <section class="cat-container container">
        <div class="row">
            <category-sidebar :categories="{{ $categories }}" :current-category="{{ $category }}"></category-sidebar>
            <div class="col-lg-9 col-md-9 cat-content">
                <category-products :category-id="{{ $category->id }}"></category-products>
            </div>
        </div>
    </section>
    <recommended-products title="PREPORUČUJEMO"></recommended-products>
@endsection