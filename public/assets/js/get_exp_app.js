var page = 1;
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        page++;
        loadMoreData(page);
    }
});

function loadMoreData(page) {
    $.ajax({
            url: window.location + "&page=" + page + "&ed=" + $('#exp_date').val() + "&em=" + $('#em').val(),
            type: "get",
            beforeSend: function() {
                $("#loader_modal").show();
            }
        })
        .done(function(data) {
            $("#loader_modal").hide();

            if (data.html.length == 0) {
                // custom_alert("No more records found");
                $("#data_end").html("No more records found");
                return;
            } else {
                $(".card_container").append(data.html);
            }
        })
        .fail(function(jqXHR, ajaxOptions, thrownError) {
            $("#loader_modal").hide();
            alert("server not responding...");
        });
}


$('.datepicker3').pickadate({
    min: new Date() + 1,
    clear: '',
    format: 'yyyy-mm-dd',
    container: 'body',
})

$(document).on('click', '.filter_ed', function() {
    $('.filter_ed_val').click()
        // console.log(this.val());
});

$(document).on('change', '.filter_ed_val', function() {
    $('#exp_date').val($('.filter_ed_val').val());
    $('.filter_ed').html($('.filter_ed_val').val());



    $(".card_container").html('');
    page = 1;
    loadMoreData(page)
});


$(document).on('change', '.filter_em_val', function() {
    $('#em').val($('.filter_em_val').val());
    // $('.filter_ed').html($('.filter_ed_val').val());

    // alert();

    $(".card_container").html('');
    page = 1;
    loadMoreData(page)
});