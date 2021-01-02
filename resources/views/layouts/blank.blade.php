<!DOCTYPE html>
<html>

@include('_partial.head')

<body>
    <div class="tbar_header">
        <div class="row">
            <div class="col">
                <div class="text-left m-3"><img id="nav_btn" src="{{ asset('img/user-burger-menu.svg') }}" alt="" class="pointer_unset"></div>
            </div>

        </div>
        <h4 class="text-light position-absolute" style="top: 16px; left: 56px;"> @yield('page_title')</h4>
    </div>

    <div class="bg_gr_dark px-5">
        @yield('body_content')
    </div>

    @include('_partial.footer')
    @include('_partial/scripts')

    @yield('modal')

</body>

</html>
