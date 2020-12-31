var ts = 0; // total schedule

$(document).ready(function() {
    $("#exp_datepicker").datepicker("option", {
        beforeShowDay: function(date) {
            var dayOfWeek = date.getDay();
            // 0 : Sunday, 1 : Monday, ...
            if (dayOfWeek == 0 || dayOfWeek == 6) return [false];
            else return [true];
        },
    });

    $(document).on("change", "#exp_datepicker", function() {
        $('.trigger_booking_button').hide();
        load_schedule(++ts, $("#exp_datepicker").val());
    });

    if (new URLSearchParams(window.location.search).get('ed') != '') {
        load_schedule(++ts, new URLSearchParams(window.location.search).get('ed'));
    }
});
//ts : total schedule
function load_schedule(ts, target_ed) {
    $.ajax({
        url: "exp/get_booking",
        type: "GET",
        data: {
            exp_id: $("#exp_id").val(),
            date: target_ed,
        },
        cache: false,
        datatype: "JSON",
        success: function(response) {

            //create master container
            $("#master_schedule_container")
                .clone()
                .attr({
                    id: "schedule" + ts,
                })
                .appendTo(".exp_dyn_schedule_list");


            $("#schedule" + ts + " [name='ed']").val(target_ed);
            $("#schedule" + ts + " [name='id']").val($("#exp_id").val());



            //set data container date
            $("#schedule" + ts + " .date").prepend(target_ed);

            var total_data = 0;
            //set traveler photo if any
            for (i in response.data) {
                $("#img_user_onbook")
                    .clone()
                    .removeAttr("id")
                    .attr({
                        src: "public/assets/" + response.data[i].user.img_path,
                    })
                    .appendTo("#schedule" + ts + " .bookUser_container");
                total_data++;

                if (total_data == 2) break;
            }

            //add blank until max
            for (var x = 0; x < response.max; x++) {

                if (total_data < 2) {
                    // total_data
                    $("#img_user_onbook")
                        .clone()
                        .removeAttr("id")
                        .appendTo("#schedule" + ts + " .bookUser_container");
                    total_data++;
                } else {
                    $("#rest_total")
                        .clone()
                        // .removeAttr("id")
                        .html("+" + (response.max - total_data))
                        .appendTo("#schedule" + ts + " .bookUser_container");
                    break;
                }



            }

            //add msg if total blank
            if (response.status == "nodata") {
                $("#schedule" + ts).append(
                    '<br> <div class="sl_msg">Be the First one to Join !</div>'
                );
            }
        },
        error: function(response) {
            // console.log(response);
        },
    });
}

function confirmation_modal(eid, es, ed) {
    // eid : exp id
    // es : empty slot  
    // ed : exp date

    if (es > 0) {
        $("#confirmation_modal").addClass("slideInRight");
        $("#confirmation_modal").show();

        $("#conf_exp_id").val(eid);
        $("#conf_exp_booking_date").val(ed);


        var total = $("#c_pickup_fee").val() * 1 + $("#c_exp_price").val() * 1;
        $("#total_exp_price").html("<b>IDR " + total + "<b>");

    } else {
        custom_alert("Your selected schedule already full booked");
    }

}


$(document).on("click", "#confirmation_modal_close", function() {
    $("#confirmation_modal").addClass("slideOutRight");

    setTimeout(function() {
        //your code to be executed after 1 second
        //wait till animmation closed
        $("#confirmation_modal").hide();
        $("#confirmation_modal").delay(1000).removeClass("slideOutRight");
    }, 1000);
});

$(document).on("click", "#btn_submit_exp_confirmation_booking", function() {
    $("#exp_confirmation_booking").submit();
});

$("#exp_toggle_pickup").change(function() {
    if ($(this).prop("checked")) {
        var total = $("#c_pickup_fee").val() * 1 + $("#c_exp_price").val() * 1;

        $("#c_is_pickup").val("1");

        $("#pickup_conf").show();
        $("#c2_pickup_price").html($("#c_pickup_fee").val());
        $("#total_exp_price").html("<b>IDR " + total + "<b>");
    } else {
        $("#c_is_pickup").val("0");
        $("#pickup_conf").hide();
        $("#c2_pickup_price").html("-");
        $("#total_exp_price").html("<b>IDR " + $("#c_exp_price").val() + "<b>");
    }
});


$(document).on("click", "#close_confirmation", function() {

    $('#success_modal').addClass("fadeOut");

    setTimeout(function() {
        $('#success_modal').hide();
        $('#success_modal').delay(1000).removeClass("fadeOut");

    }, 1000);


});


$(document).on('click', '.trigger_booking_button', function() {
    $('#exp_datepicker').click();
    // $("#exp_datepicker").datepicker("show");
    // $(this).hide();
});