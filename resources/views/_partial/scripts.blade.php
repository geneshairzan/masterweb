<script>
    var js_base_url = "{{url('')}}";
</script>

<script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('vendor/bootstrap/js/bootstrap.min.js') }}"></script>
<!-- <script src="{{ asset('vendor/jquery-ui/jquery-ui.min.js') }}"></script>
<script src="{{ asset('vendor/jq_ui/jquery.ui.touch-punch.min.js') }}"></script>
<script src="{{ asset('vendor/jq_readmore/readMoreJS.min.js') }}"></script>
<script src="{{ asset('vendor/jq_datepicker/picker.js') }}"></script>
<script src="{{ asset('vendor/jq_datepicker/picker.date.js') }}"></script> -->

<script src="{{ asset('js/js.js') }}"></script>

@stack('f_scripts')
