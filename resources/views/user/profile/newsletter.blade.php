@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Newsletter podaci')
@section('seo_description', 'Budi u toku s ponudama i posebnim pogodnostima putem –emaila')

@section('content')

    <section class="profile-container container">
        <div class="row">
            <profile-sidebar></profile-sidebar>
            <newsletter-form :current-user="{{ $user }}" :current-status="{{ $subscription_status }}"></newsletter-form>
        </div>
    </section>

@endsection