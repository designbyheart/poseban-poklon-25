@extends("layouts.app") 
@section("content")

<section class="section">
    <div class="container" id="app">
        <v-posts role="admin">
            <h1 class="title">Show all categories</h1>
        </v-posts>
    </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
{{-- <script src="{{asset('/js/admin/manifest.js')}}"></script> --}}
{{-- <script src="{{asset('/js/admin/vendor.js')}}"></script> --}}
<script src="{{asset('/js/admin/app.js')}}"></script>
@endsection