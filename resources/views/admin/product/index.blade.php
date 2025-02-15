@extends("layouts.app") 
@section("content")

<section class="section">
  <div class="container">
    <h1 class="title">Show all products</h1>
    <div id="app">
      <product-list></product-list>
    </div>
  </div>
</section>

<script>

</script>
@endsection
 
@section("vue")
<script src="{{asset('/js/admin.js')}}"></script>
@endsection