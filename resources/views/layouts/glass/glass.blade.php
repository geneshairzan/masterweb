<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glass UI</title>

    <link rel="stylesheet" href="{{asset('css/alpha_menu.css') }}">
    <link rel="stylesheet" href="{{asset('css/bootstrap-icons.css') }}">
</head>

<body>
    <div class="glass_cover"> </div>
    <div class="glass_menu"> </div>

    <img src="{{asset('img/glassBg/1.jpg')}}" alt="" class="bg_img ">

    <div class=" " style="height: 300vh;">

        @yield('body_content')

    </div>
</body>

</html>
