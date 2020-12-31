var a = [true];
if ($("input[name='schedule_type']").val() == 1) {
    a.push(new Date($("input[name='experice_date']").val()));
} else {
    $("input[name='days2[]']")
        .map(function() {
            if ($(this).val() != "") a.push($(this).val() * 1);
        })
        .get();
}

var exp_date_datepicker = $(".datepicker3").pickadate({
    min: get_next_schedule(),
    clear: "",
    format: "yyyy-mm-dd",
    disable: a,
});

function get_next_schedule() {
    var date = new Date();

    // add a day
    if ($("#next_available").val() == "tomorrow") {
        date.setDate(date.getDate() + 1);
        return date;
    } else {
        return date;
    }
}

$(document).on("click", ".experience_booking_submit", function() {
    if ($("#exp_datepicker").val() == "Check availability") {
        $(".date_error").html("Required");
        $(".date_error").addClass("text-danger");
        $("#exp_date_input_img").attr("src", "public/assets/img/error.svg");
        // $(window).scrollTop(0);

        $("html, body").animate({
                scrollTop: $("#scroll_date_err").offset().top - 200,
            },
            200
        );
    } else {
        if ($("#is_login").val() != 1) {
            // var _href = $("#btn_user_login").attr("href");
            // $("#btn_user_login").attr(
            //     "href",
            //     _href +
            //     "&f=experience_booking_form&tq=" +
            //     $("#exp_max_person_id").val()
            // );

            // $.ajax({
            //     type: "post",
            //     url: "url",
            //     data: "data",
            //     dataType: "dataType",
            //     success: function(response) {},
            // });

            // $("#popup_guest_register").show();
            if ($("#experience_booking_form").valid()) {
                $("#experience_booking_form").submit();
            }
        } else {
            if ($("#experience_booking_form").valid()) {
                $("#experience_booking_form").submit();
            }
        }
    }
});

$(document).on("change", "#exp_datepicker", function() {
    $(".date_error").html("Duration");
    $(".date_error").removeClass("text-danger");
    $("#exp_date_input_img").attr("src", "public/assets/img/calendar.svg");

    set_session("ses_date", $("#exp_datepicker").val());
});

$readMoreJS.init({
    target: ".trunc_exp_desc", // Selector of the element the plugin applies to (any CSS selector, eg: '#', '.'). Default: ''
    numOfWords: 25, // Number of words to initially display (any number). Default: 50
    toggle: true, // If true, user can toggle between 'read more' and 'read less'. Default: true
    moreLink: '<p class="footnote1">read more</p>',
    lessLink: '<p class="footnote1">read less</p>',
    linkClass: "rm-link text-center font-weight-bold",
});

$("#experience_booking_form").validate({
    rules: {
        ed: {
            date_check: true,
        },
    },
});

$.validator.addMethod(
    "date_check",
    function(value, element) {
        if ($("#exp_datepicker").val() == "Check availability") return false;
        else return true;
    },
    ""
);

$(document).on("change", "#exp_max_person_id", function() {
    //
    if ($(".tier_pax").length) {
        var price = get_price($(this).val());
        $(".display_price").html(IDR_formatter(price));
        $("#input_price").val(price);
    }
});

function get_price(a) {
    let max;
    $(".tier_pax").each(function() {
        if (a * 1 >= $(this).val()) max = $(this).val();
    });
    return $("#tier_price" + max).val();
}