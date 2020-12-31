<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>


    <div class="">
        <a href="{{ url('/auth/facebook') }}"><img src="{{ url('public/assets/img/facebook.svg') }}" alt=""></a>
        <a href="{{ url('/auth/google') }}"><img class="mx-2" src="{{ url('public/assets/img/google.svg') }}" alt=""></a>
        <a href="{{ url('/mail_login') }}"><img src="{{ url('public/assets/img/email.svg') }}" alt=""></a>
    </div>

    <div>
        @if(Auth::check())
        <a href="{{url('logout')}}">
            <button>loggout</button></a>
        @endif
    </div>

</body>

</html>
