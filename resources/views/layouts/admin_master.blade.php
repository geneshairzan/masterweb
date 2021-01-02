<!DOCTYPE html>
<html>

<head>
    @include('_partial.head')
    <link rel="stylesheet" href="{{asset('css/alpha_menu.css') }}">
    <link rel="stylesheet" href="{{asset('css/bootstrap-icons.css') }}">
</head>

<body>
    @include('_partial.nav.alpha_nav')

    <div class="bg_gr_dark" style="height: 300vh;">
        @yield('body_content')
    </div>

    @include('_partial.footer')
    @include('_partial/scripts')

    @yield('modal')

    <script src="{{asset('js/alpha_menu.js') }}"></script>

</body>

</html>
