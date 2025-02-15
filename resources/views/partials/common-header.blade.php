<header id="header" class="header">
    <div class="container">
        <div class="row">
            <div class="navbar d-md-none">
                <div class="logo">
                    <a href="#"
                        ><img src="images/logo.png" alt="PoliszHome"
                    /></a>
                </div>
                <button
                    id="navHamburger"
                    class="hamburger hamburger--spin"
                    type="button"
                >
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div class="logo col-auto d-none d-md-flex">
                <a href="#"><img src="images/logo.png" alt="PoliszHome"/></a>
            </div>
            <div class="nav col">
                @if (Route::has('login'))
                <ul class="menu nav-auth">
                    @auth
                    <li class="menu-item">
                        <a class="menu-link" href="{{ url('/home') }}">Home</a>
                    </li>
                    @else
                    <li class="menu-item">
                        <a class="menu-link" href="{{ route('login') }}"
                            >Login</a
                        >
                    </li>
                    @if (Route::has('register'))
                    <li class="menu-item">
                        <a class="menu-link" href="{{ route('register') }}"
                            >Register</a
                        >
                    </li>
                    @endif @endauth
                </ul>
                @endif
            </div>
        </div>
    </div>
</header>
