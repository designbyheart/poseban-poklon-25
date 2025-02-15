@extends('layouts.app')

@section('seo_title', 'Poseban Poklon | Lični podaci')
@section('seo_description', 'Tvoji podaci koji su potrebni kako bi kupovina bila uspešno realizovana')

@section('content')

    <section class="profile-container container">
        <div class="row">
            <profile-sidebar></profile-sidebar>
            <profile-form :current-user="{{ $user }}"></profile-form>
        </div>
    </section>

@endsection