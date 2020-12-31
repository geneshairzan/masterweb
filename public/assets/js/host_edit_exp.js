// const { isNull } = require("lodash");

$(document).ready(function() {
    if ($(routine).val() == 1) {
        $("#exp_date").show();
        $("#exp_day").hide();
    } else {
        $("#exp_day").show();
        $("#exp_date").hide();
    }

    price_check();
    set_simulation_price();

    // $("#distance_slider").slider({
    //     animate: "fast",
    //     max: 50,
    //     min: 1,
    //     step: 1,
    //     value: $("#pickup_max_distance").val(),

    //     create: function() {
    //         $("#distance_slider-handle").text($(this).slider("value"));
    //     },
    //     slide: function(event, ui) {
    //         $("#distance_slider-handle").text(ui.value);
    //         $("#pickup_max_distance").val(ui.value);
    //     },
    // });
});

// function set_pickup_toggle2() {
//     if ($("[name = 'is_pickup']").val() == 0) {
//         $("#exp_pickup_info").html(
//             "If you provide pick up & drop off service, please swipe right to activate."
//         );
//         $("#exp_pickup_detail").hide();
//     } else {
//         $("#exp_pickup_info").html(
//             "Pick up & drop off service is active.Set the pick up range under 50 km from meeting point and set an additional pick up cost below."
//         );
//         $("#exp_pickup_detail").show();
//     }
// }

$("#nextBtn, .nextBtn, .is_valid").click(function() {
    if ($("#edit_experience_form").valid()) {
        if (currentTab == 2) {
            $("#create_experience_form").submit();
        } else {
            nextPrev(1);
        }
    }
});

$("#edit_experience_form").validate({
    ignore: ":hidden:not(.valid_include)",

    rules: {
        exp_schedule_type: {
            required: true,
            min: 1,
            max: 3,
        },

        map_is_selected: {
            required: true,
            min: 1,
        },

        exp_date: {
            required: true,
        },

        "exp_day[]": {
            required: true,
            minlength: 1,
        },

        exp_desc: {
            required: true,
            minlength: 50,
        },

        exp_start_time: {
            Starting_time_set: true,
        },
        total_img: {
            cek_total_img: true,
        },

        exp_max_person: {
            required: true,
            min: 1,
            max: 10,
        },

        exp_name: {
            required: true,
        },

        exp_desc: {
            required: true,
        },

        exp_duration_length: {
            required: true,
        },

        exp_price: {
            required: true,
        },

        exp_pickup_fee: {
            required: true,
        },
    },

    messages: {
        map_is_selected: "Please set meeting point",
        exp_max_person: "Please select max number of travelers",
        "exp_day[]": "please select at least 1 day selected",
    },

    errorPlacement: function(error, element) {
        if (element.attr("name") == "exp_day[]") {
            $("#exp_day_err").html(error);
        } else {
            error.insertAfter(element);
        }
    },
});

$(document).on("click", ".del", function(event) {
    // console.log($(this).attr("val"));

    $("<input>")
        .attr({
            type: "hidden",
            name: "to_delete[]",
            value: $(this).attr("val"),
        })
        .appendTo(".todelete");
});

$(document).on("change", "#exp_max_person_id", function() {
    price_check();
});

function price_check() {
    $(".gen_tier select").each(function() {
        if (
            $(this).val() == null ||
            $(this).val() > $("#exp_max_person_id").val()
        ) {
            $(this).closest(".gen_tier").remove();
        }
    });
}