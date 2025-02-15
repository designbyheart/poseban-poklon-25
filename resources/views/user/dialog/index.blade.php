@extends("layouts.app") 
@section("content")

<section class="section">
    <div class="container">
        <div class="box" id="app">
            <h1>User dialogs</h1>
            <the-dialogs role="admin"></the-dialogs>
        </div>
    </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
<script src="{{asset('/js/user/app.js')}}"></script>
@endsection