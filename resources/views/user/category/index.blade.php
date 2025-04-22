@extends('layouts.app')

@section('seo_title', $seo_title)
@section('seo_description', $seo_description)
@section('seo_keywords', $seo_keywords)

@section('content')
    <categories-breadcrumb></categories-breadcrumb>
    <section class="cat-container container">
        <div class="row">
            <category-sidebar :categories="{{ $categories }}"></category-sidebar>
            <div class="col-lg-9 col-md-9 cat-content">
                <category-products></category-products>
            </div>
        </div>
    </section>
    <recommended-products title="PREPORUČUJEMO1"></recommended-products>
@endsection
