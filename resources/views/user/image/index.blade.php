@extends("layouts.app") 
@section("content")

<section class="section">
    <div class="container">
        <div class="box" id="app">
            <h1>User images</h1>
            <the-images></the-images>
        </div>
    </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
<script src="{{asset('/js/user/app.js')}}"></script>
@endsection