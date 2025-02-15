@extends('layouts.app')

@section('seo_title', 'Poseban poklon | Adresa za isporuku')
@section('seo_description', 'Adresa na koju saljemo vaučer')

@section('content')

    <section class="profile-container container">
        <div class="row">
            <profile-sidebar></profile-sidebar>
            <shipping-addresses :current-user="{{ Auth::User() }}" :user-addresses="{{ $addresses }}"></shipping-addresses>
        </div>
    </section>

@endsection