<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Laravel</title>

    <!-- Fonts -->
    <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,600"
            rel="stylesheet"
            type="text/css"
    />
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" />

</head>
<body>
@include('partials.common-header')

@include('partials.common-content-login')
{{--  @include('partials.login-modal')  --}}

<script src="{{ asset('/js/common/common.js') }}"></script>
</body>
</html>