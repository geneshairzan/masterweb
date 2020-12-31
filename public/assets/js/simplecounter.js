var count = 30;
// var counter = setInterval(timer, 1000); //1000 will  run it every 1 second
// setInterval(timer, 1000); //1000 will  run it every 1 second
function resend_count_init(params) {
    count = 30;
}

function timer() {
    count = count - 1;
    if (count <= 0) {
        clearInterval(timer);
        resend_count_init();
        //counter ended, do something here
        $('.gen_counter_container').html('RESEND CODE');
        $('.gen_counter_container').addClass('resend_code');
        return;
    }
    //Do code for showing the number of seconds here
    $('gen_counter').html(count);
}


$(document).on('click', '.resend_code', function() {
    $("#loader_modal").show();
    phone_regis();

    $('.gen_counter_container').html(' resend in <gen_counter></gen_counter>s');
    setInterval(timer(), 1000); //1000 will  run it every 1 second

});