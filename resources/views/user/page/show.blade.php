@extends('layouts.app')

@section('seo_title', $page->seo_title)
@section('seo_description', $page->seo_description)
@section('seo_keywords', $page->seo_keywords)

@section('styles')

    .ql-size-small{
    font-size: 0.8em;
    }
    .ql-size-large{
    font-size: 1.5em;
    }
    .ql-size-huge{
    font-size: 2.5em;
    }

@endsection

@section('content')

    <section class="information-container container">
        <div class="row">
            <h2 class="information-title col-lg-12">
                {{ $page->title }}
            </h2>
            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <information-sidebar></information-sidebar>
            </div>
            <div class="col-lg-9 col-md-9 information-content-text">
                <div class="information-text-container">
                    {!! $page->content !!}
                </div>
            </div>
        </div>
    </section>

@endsection