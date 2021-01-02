<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glass UI</title>

    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{asset('css/glass/style_glass.css') }}">
    <link rel="stylesheet" href="{{asset('css/glass/glass.css') }}">


</head>

<body>
    <div class="glass glass_cover1">
        <!-- NAV -->
    </div>
    <div class="glass glass_menu px-3 ">
        <!-- NAV -->
        <form action="" class="glass_form">
            <div style="padding-top: 96px;"></div>
            <img src="{{asset('img/glassBg/logo.svg')}}" alt="" class=" logo_img">
            <div class="pt-5"></div>

            <label for="in_username" class="">Username</label>
            <input type="text" id="in_username" name="username" placeholder="Enter username or email">

            <label for="in_password" class="">Password</label>
            <input type="text" id="in_password" name="password" placeholder="Enter password" class="InputPassword">

            <div class="flex_center_gap16 pt-4">
                <img src="{{asset('img/glassBg/facebook.svg')}}" alt="" class=" social_icon">
                <img src="{{asset('img/glassBg/google.svg')}}" alt="" class=" social_icon">
                <img src="{{asset('img/glassBg/instagram.svg')}}" alt="" class=" social_icon">
            </div>
            <div class="pt-4"></div>
            <a href="{{url('glass/home')}}"> <button type="button">Signin</button></a>

            <p class="fz12 text-center">or, <b>signup</b> for new account </p>
        </form>
        <div class="flex_center_gap16 w-100" style="position: absolute;bottom: 16px;left: 0;">
            <button type="button" class="change_bg ">change background</button>
        </div>
    </div>

    <img src="{{asset('img/glassBg/1.jpg')}}" alt="" class="bg_img glass_bg ">

    <div class=" " style="height: 300vh;">

        <!-- BODY -->
    </div>


    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.min.js') }}"></script>

    <script src="{{ asset('js/js.js') }}"></script>
</body>

</html>
