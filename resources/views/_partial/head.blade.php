<head>
    <title>Helloha - @yield('page_title')</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0, shrink-to-fit=yes, autoRotate:disabled">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="p:domain_verify" content="4b0d6e7ddf38dbf3faccd0f487d987b17" />

    <link rel="shortcut icon" href="{{ url('public/fav.ico') }}">

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- <link rel="stylesheet" href="{{asset('vendor/jquery-ui/jquery-ui.min.css') }}"> -->
    <!-- <link rel="stylesheet" href="{{asset('vendor/jq_datepicker/themes/default.css') }}"> -->
    <!-- <link rel="stylesheet" href="{{asset('vendor/jq_datepicker/themes/default.date.css') }}"> -->

    @stack('head_scripts')
    @include('_partial.scripts_head')
    <link href="{{ asset('css/margin.css') }}" rel="stylesheet">

    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate_compact.css') }}" rel="stylesheet">


</head>
