<div class="ph-modal-login">
    <div class="container">
        <div class="row">
            <div class="col-12 ph-login">
                <div class="ph-login-box">
                    <div class="ph-login-x-btn">
                        <button><img src="images/x-btn.png" alt="" /></button>
                    </div>
                    <div class="ph-facebook-login">
                        <button class="ph-facebook-btn">
                            <img
                                src="images/facebook-login-btn.png"
                                alt=""
                            /><span>Zaloguj się przez Facebook</span>
                        </button>
                    </div>
                    <div class="ph-login-text">
                        <p>lub</p>
                    </div>
                    <div class="ph-login-form">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="ph-input">
                                <input
                                    id="email"
                                    class="ph-field"
                                    type="text"
                                    name="email"
                                    value="{{ old('email') }}"
                                    placeholder="Login"
                                    required
                                />
                            </div>
                            <div class="ph-input">
                                <input
                                    id=""
                                    class="ph-field"
                                    type="password"
                                    name="password"
                                    placeholder="Hasło"
                                    required
                                />
                            </div>
                            <div class="ph-checkbox">
                                <input class="btn-checkbox" type="checkbox"
                                name="remember" id="remember"
                                {{ old("remember") ? "checked" : "" }}>
                                <span class="btn-checkbox-login-text"
                                    >Zapamiętaj mnie</span
                                >
                            </div>
                            <div class="ph-checkbox">
                                <input
                                    class="btn-checkbox"
                                    type="checkbox"
                                    name=""
                                    required
                                />
                                <span class="btn-checkbox-login-text"
                                    >Regulamin</span
                                >
                            </div>
                            <div class="ph-login-btn">
                                <button type="submit">
                                    <span>Zaloguj się</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="ph-login-links">
                        <div class="ph-login-reset">
                            <p>
                                <a href="{{ route('password.request') }}"
                                    >Przypomniej hasło</a
                                ><span>|</span
                                ><a href="{{ route('password.request') }}"
                                    >Zmień hasło</a
                                >
                            </p>
                            <p>
                                Nie masz jeszcze konta?
                                <a href="{{ route('register') }}"
                                    >Załóż Strefę Architekta</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
