@extends('layouts.app') 
@section("content")

<section class="section">
    <div class="container">
        <h1 class="title">Post Category edit</h1>
        <div id="app">
            <post-category role="admin" :categories="{{ $categories }}" :params="{{$postCategory}}" is-update></post-category>
        </div>
    </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
<script src="{{asset('/js/admin/manifest.js')}}"></script>
<script src="{{asset('/js/admin/vendor.js')}}"></script>
<script src="{{asset('/js/admin/app.js')}}"></script>
@endsection