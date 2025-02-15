@extends("layouts.app") 
@section("content")

<div class="container">
    <div class="panel-content">
        <div class="row row-rev">
            @include('partials.user-sidebar', compact('user'))
            <div class="ph-user_p ph-user_p-cont col-lg-9">
                <div class="ph-user_p--cont-nav">
                    <div class="links">
                        <ul>
                            <li><a href="#">Produkty</a></li>
                            <li><a href="#">Inspiracje</a></li>
                            <li><a href="#">Użytkownicy</a></li>
                            <li>
                                <button><span>IdeaBook</span></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row ph-user_p--cont-table">
                    <div id="app">
                        <the-profile
                            :params="{{ $user }}"
                            is-update
                        ></the-profile>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection 
@section("vue")
<script src="{{asset('/js/user/app.js')}}"></script>
@endsection
