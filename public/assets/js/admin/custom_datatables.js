$(document).on('change', '#filter_user', function() {
    table.column('role:name').
    search(parseInt($(this).val())).
    draw();
});

$(document).on('change', '#filter_status_user', function() {
    table.column('verified:name').
    search(parseInt($(this).val())).
    draw();
});


$(document).on('change', '#filter_exp_status', function() {
    if ($(this).val() < 0) {
        table_exp.column('is_actived:name').
        search('').
        draw();
    } else {
        table_exp.column('is_actived:name').
        search(parseInt($(this).val())).
        draw();
    }

});



$(document).on('change', '#gen_page_len', function() {
    table.page.len($(this).val()).draw();
});


$(document).on('change', '#gen_page_len_exp', function() {
    table_exp.page.len($(this).val()).draw();
});


$(document).on('change', '#filter_booking_schedule', function() {

    if ($(this).val() < 0) {
        table_booking.column('schedule_type:name').
        search('').
        draw();
    } else {
        console.log($(this).val());
        table_booking.column('schedule_type:name').
        search($(this).val()).
        draw();
    }

});