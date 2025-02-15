@extends('layouts.app')

@section('seo_title', 'Poseban poklon | Lista želja')
@section('seo_description', 'Spisak ponuda koje želiš da kupiš')

@section('content')

    <user-wishlist :products="{{ $wishlist->products }}"></user-wishlist>

@endsection