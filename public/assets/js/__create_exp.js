var total_upload = $("#total_img").val(); //max image number
total_upload *= 1;

$(document).ready(function() {
    // load_default();
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
    $("#success").hide();
    $(".spinner").hide();
    $("#custom_alert").hide();

    // ROUTINE SELECTION
    // $("#exp_day").hide();

    if ($(routine).val() == 1) {
        $("#exp_date").show();
        $("#exp_day").hide();
    } else {
        $("#exp_day").show();
        $("#exp_date").hide();
    }

    $("#distance_slider").slider({
        animate: "fast",
        max: 50,
        min: 1,
        step: 1,
        value: $("#pickup_max_distance").val(),

        create: function() {
            $("#distance_slider-handle").text($(this).slider("value"));
        },
        slide: function(event, ui) {
            $("#distance_slider-handle").text(ui.value);
            $("#pickup_max_distance").val(ui.value);
        },
    });
});

$(".clockpicker").clockpicker({
    align: "left",
    donetext: "Done",
});

$("#edit_experience_form").on("submit", function(event) {
    $("#edit_experience_form").hide();
    $(".spinner").show();
});

$("#exp_toggle_pickup").change(set_pickup_toggle);
$("#exp_toggle_pickup").ready(set_pickup_toggle2);

function set_pickup_toggle() {
    if ($("[name = 'is_pickup']").val() == 0) {
        $(this).val("1");
        $("#exp_pickup_info").html(
            "Pick up & drop off service is active.Set the pick up range under 50 km from meeting point and set an additional pick up cost below."
        );
        $("#exp_pickup_detail").show();
    } else {
        $(this).val("0");
        $("#exp_pickup_info").html(
            "If you provide pick up & drop off service, please swipe right to activate."
        );
        $("#exp_pickup_detail").hide();
    }
}

function set_pickup_toggle2() {
    if ($("[name = 'is_pickup']").val() == 0) {
        $("#exp_pickup_info").html(
            "If you provide pick up & drop off service, please swipe right to activate."
        );
        $("#exp_pickup_detail").hide();
    } else {
        $("#exp_pickup_info").html(
            "Pick up & drop off service is active.Set the pick up range under 50 km from meeting point and set an additional pick up cost below."
        );
        $("#exp_pickup_detail").show();
    }
}

$("#routine").change(function() {
    if ($(this).val() == "1") {
        $("#exp_date").show();
        $("#exp_day").hide();
    } else if ($(this).val() == "2") {
        $("#exp_date").hide();
        $("#exp_day").show();
    } else {
        $("#exp_date").hide();
        $("#exp_day").hide();
    }
});

$("#prevBtn").click(function() {
    nextPrev(-1);
});

$("#nextBtn").click(function() {
    if ($("#edit_experience_form").valid()) {
        nextPrev(1);
    }
});

$("#edit_experience_form").validate({
    rules: {
        exp_schedule_type: {
            required: true,
            min: 1,
            max: 2,
        },

        exp_date: {
            required: true,
        },

        "exp_day[]": {
            required: true,
            minlength: 1,
        },

        exp_max_person: {
            required: true,
            min: 1,
            max: 10,
        },

        address_address: {
            required: true,
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

        total_img: {
            min: 1,
        },

        exp_price: {
            required: true,
        },

        exp_pickup_fee: {
            required: true,
        },
    },

    messages: {
        exp_schedule_type: "Please select routine type",
        exp_max_person: "Please select max number of travelers",
        "exp_day[]": "please select at least 1 day selected",
        total_img: "Please add at least 1 photo",
    },

    errorPlacement: function(error, element) {
        // console.log(element);

        if (element.attr("name") == "exp_day[]") {
            $("#exp_day_err").html(error);
        } else {
            error.insertAfter(element);
        }
    },
});

$("#exp_add_img").click(function() {
    $("#dynamic_images").append(
        "<div class='exp_img_container' id='exp_img_container" +
        total_upload +
        "'></div>"
    );
    $("<img />")
        .attr({
            // Same, create the element and specify its attributes
            id: "exp_images" + total_upload,
            src: "./public/assets/img/add-plus.svg",
            class: "exp_img_preview idp_crop_receiver",
        })
        .appendTo("#exp_img_container" + total_upload);

    $("<input>")
        .attr({
            class: "input_file exp_img_crop",
            id: "exp_input_file" + total_upload,
            name: "img_upload[]",
            type: "file",
            multiple: "",
        })
        .appendTo("#exp_img_container" + total_upload)
        .click();

    $("<input>")
        .attr({
            id: "exp_input_file_cropped" + total_upload,
            name: "img_upload_croppped[]",
            type: "hidden",
            multiple: "",
        })
        .appendTo("#exp_img_container" + total_upload);

    $("#exp_img_container" + total_upload).append(
        "<div id='del" +
        total_upload +
        "' class='del' value=" +
        total_upload +
        ">Del</div>"
    );
    $("#exp_img_container" + total_upload).append(
        "<div id='set_primary" +
        total_upload +
        "' class='set_primary' value=" +
        total_upload +
        ">Set Primary</div>"
    );
});

$(document).on("click", ".old_delete", function(event) {
    $("<input>")
        .attr({
            type: "hidden",
            name: "to_delete[]",
            value: $("#old_exp_images" + $(this).attr("value")).val(),
        })
        .appendTo(".todelete");

    del_img($(this).attr("value"));
    update_total_img(-1);
});

$(document).on("click", ".del", function(event) {
    del_img($(this).attr("value"));
    update_total_img(-1);
});

$(document).on("click", ".set_primary", function(event) {
    set_primary_img($(this).attr("value"));
});

function update_total_img(n) {
    total_upload += n;
    $("#total_img").val(total_upload);

    if (Number(total_upload) == 1) {
        // alert("last img2");

        // set_primary_img(0);
        $(".set_primary").addClass("is_primary_img");
        $(".is_primary_img").html("Primary img");
    }
}

$(document).on("change", ".input_file", function(event) {
    //input file changed
    //set image preview
    readURL(this, "#exp_images" + total_upload);
    update_total_img(1);
    //inc total up
});

function readURL(input, dest) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $(dest).attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function del_img(n) {
    $("#exp_img_container" + n).remove();
}

function set_primary_img(n) {
    if (total_upload != 1) {
        custom_alert("primary image reselected");
    }

    $("#primary_img_index").val(n);

    $(".is_primary_img").html("Set Primary");
    $(".is_primary_img").removeClass("is_primary_img");

    $("#set_primary" + n).addClass("is_primary_img");
    $(".is_primary_img").html("Primary img");
}