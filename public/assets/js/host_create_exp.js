$("#prevBtn").click(function() {
    nextPrev(-1);
});

$("#nextBtn, .nextBtn, .is_valid").click(function() {
    if ($("#create_experience_form").valid()) {
        if (currentTab == 2) {
            $("#create_experience_form").submit();
        } else {
            nextPrev(1);
        }
    }
});

// END PAGINATE FORM

$("#create_experience_form").on("submit", function(event) {
    // event.preventDefault();

    if ($("#create_experience_form").valid() && currentTab == 2) {
        $("#create_experience_form").hide();
        $("#loader_modal").show();
    } else {
        custom_alert('Please all fill required field');
        event.preventDefault();
    }

});

$("#create_experience_form").validate({
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

// END ROUTINE SELECTION

// function readURL(input, dest) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             $(dest).attr("src", e.target.result);
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
// }

function hidden_check() {
    // if ($("#map_isset").val()) {
    //     $(".map_error").html("Please set meeting point");
    //     return 0;
    // } else return 1;
}

function set_img_groups() {
    // ADDS BUTTONS
    // $("#exp_img_container" + total_upload).append(
    //     "<div class='row text-center'><button id='del" +
    //     total_upload +
    //     "' class='del col btn_blue' value=" +
    //     total_upload +
    //     ">Del</button><button id='set_primary" +
    //     total_upload +
    //     "' class='set_primary col  btn_blue' value=" +
    //     total_upload +
    //     ">Set Primary</button></div>"
    // );
}