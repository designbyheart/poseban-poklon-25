@extends('layouts.app') 
@section("content")

<section class="section">
    <div class="container">
        <h1 class="title">Post edit</h1>
        <div id="app">
            <post-item :params="{{$post}}" :categories="{{ $post_categories }}" is-update></post-item>
        </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
<script src="{{asset('/js/admin.js')}}"></script>
@endsection