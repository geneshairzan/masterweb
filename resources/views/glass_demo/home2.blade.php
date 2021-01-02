<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glass UI</title>
    <link rel="icon" href="{{url('public/fav.ico')}}" type="image/gif" sizes="16x16">

    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{asset('css/glass/style_glass.css') }}">
    <!-- <link rel="stylesheet" href="{{asset('css/glass/glass.css') }}"> -->
    <link rel="stylesheet" href="{{asset('css/glass/glass2.css') }}">


</head>

<body>
    <img src="{{asset('img/glassBg/1.jpg')}}" alt="" class="bg_img glass_bg ">

    <div class="main_container">
        <div class="glass glass_cover1">
            <div class=" glass_menu px-3 ">
                @include('_demo.nav')
            </div>

            <div class="glass glass_content p-3 ">
                <div class="flex_card">
                    @include('_demo.cards')
                </div>

                <div class="flex_center_gap16 w-100" style="position: absolute;bottom: 16px;left: 0;">
                    <button type="button" class="change_bg ">change background</button>
                    <button type="button" class="change_variation ">change variation</button>
                </div>
            </div>
        </div>

    </div>


    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.min.js') }}"></script>

    <script src="{{ asset('js/js.js') }}"></script>
</body>

</html>
