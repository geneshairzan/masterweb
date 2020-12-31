// PAGINATE FORM
var total_upload = 0; //max image number
var total_tier =
    $("#data_total_tier").length > 0 ? $("#data_total_tier").val() : 0; //max image number

$(document).ready(function() {
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
});
$(".mode1").click(function(e) {
    $(".mode2dev").hide();
    $(".set1_data_input").show();
});

$(".mode2").click(function(e) {
    $(".mode2dev").show();
    $(".set1_data_input").hide();
});

$(".datepicker4").pickadate({
    min: new Date() + 1,
    clear: "",
    format: "yyyy-mm-dd",
    container: "body",
    onSet: function(context) {
        $(".datepicker4").addClass("date_selected");
    },
});

$(".clockpicker").clockpicker({
    align: "left",
    donetext: "Done",
    autoclose: true,
});

function load_default() {
    // $("#routine").val(1);
    // $("#routine").change();
    // $("#activity_date").val(new Date().toISOString().slice(0, 10));
    // $("#exp_max_person_id").val(2);
    // $("#address-input").val("address_address");
    // $("#address-latitude").val("41.40338");
    // $("#address-longitude").val("2.17403");
    // $("#exp_name").val("Experiance Name");
    // $("#exp_desc").val("Experiance Description");
    // $("#exp_duration_length").val("60");
    // $("#exp_price").val("10000");
    // $("#exp_pickup_fee").val("20000");
}

function readURL(input, dest) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $(dest).attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//EXP IMG RESPONSE
// SET PRIM - DEL IMG

$(document).on("click", ".del", function(event) {
    del_img($(this).attr("value"));
});

$(document).on("click", ".exp_img_preview ", function(event) {
    if ($(this).hasClass("gen_square_selected_coverimg")) {
        custom_alert("Already select as cover image");
    } else {
        custom_alert("Cover image reselected");

        var a = $(".exp_img_preview");
        n = a.length - a.index(this) - 1;

        $("#primary_img_index").val(n);
        $(".gen_square_selected_coverimg").removeClass(
            "gen_square_selected_coverimg"
        );
        $(this).addClass("gen_square_selected_coverimg");
    }
});

function del_img(n) {
    $("#exp_img_container" + n).remove();
    total_upload--;
    $("#total_img").val(total_upload);
}

$(document).on("change", "#total_img", function(event) {
    // alert("bind");
    if (total_upload == 1) {
        set_primary_img(0);
        $(".set_primary").addClass("is_primary_img");
        $(".is_primary_img").html("Primary img");
    }
});

//EXPERIENCE ADD +/-
$(document).on("click", ".btn_addition_inc", function() {
    if ($('input[name="addition_inc[]"]').last().val().length < 1) {
        custom_alert("Last include still empty");
    } else {
        // $('input[name="addition_inc[]"]').last().attr("disabled", "");
        $('input[name="addition_inc[]"]').last().addClass("disable");
        $("#template_addition_inc:first")
            .clone(true)
            .removeAttr("id")
            .removeClass("gen_dnone")
            .appendTo(".addition_inc_container");
    }
});

$(document).on("click", ".btn_addition_exc", function() {
    if ($('input[name="addition_exc[]"]').last().val().length < 1) {
        custom_alert("Last exclude still empty");
    } else {
        $('input[name="addition_exc[]"]').last().addClass("disable");

        $("#template_addition_exc")
            .clone()
            .removeAttr("id")
            .removeClass("gen_dnone")
            .appendTo(".addition_exc_container");
    }
});

// SLIDE LOADER
$("#distance_slider").slider({
    orientation: "horizontal",
    value: 25,
    range: "min",
    animate: "fast",
    max: 50,
    min: 1,
    step: 1,

    slide: function(event, ui) {
        $("#pickup_max_distance").val(ui.value);
        $(".distance_val_html").html(ui.value);
    },

    create: function(event, ui) {
        $("#pickup_max_distance").val($(this).slider("value"));
        $(".distance_val_html").html($(this).slider("value"));
    },
});

// PRICING SIMULATION

$(document).on(
    "change , keyup",
    "#exp_price, #exp_pickup_fee,#is_pickup,#exp_toggle_pickup,.input_tier_price,.input_tier_person ",
    function() {
        set_simulation_price();
    }
);

function set_simulation_price() {
    var max_person = $("#exp_max_person_id").val();

    var exp_price;
    var exp_pickup_fee;

    var max_price = get_tier_price(1);
    var min_price = get_tier_price(1);

    if ($("#is_pickup").val() * 1) {
        exp_pickup_fee =
            $("#exp_pickup_fee").val().replace("IDR", "").replace(".", "") * 1;
    } else {
        exp_pickup_fee = 0;
    }

    $("#price_simulation_list").html(
        '<div class="row pt-3"> <div class="col text-left"> <p class="">1 Person</p> </div> <div class="col text-right"> <p class="subtitle"> ' +
        IDR_formatter(get_tier_price(1)) +
        "</p> </div> </div>"
    );
    for (let index = 2; index <= max_person; index++) {
        $("#price_simulation_list").append(
            '<div class="row pt-3"> <div class="col text-left"> <p class="">' +
            index +
            ' Persons</p> </div> <div class="col text-right"> <p class="subtitle"> ' +
            IDR_formatter(get_tier_price(index) * index) +
            "</p> </div> </div>"
        );

        if (get_tier_price(index) * index < min_price)
            min_price = get_tier_price(index) * index;
        if (get_tier_price(index) * index > max_price) {
            // console.log("index:" + index);
            // console.log("val:" + get_tier_price(index));

            max_price = get_tier_price(index) * index;
        }
    }
    $("#price_simulation_list").append(
        '<div class="row pt-3"> <div class="col text-left"> <p class="">Pickup fee</p> </div> <div class="col text-right"> <p class="subtitle"> ' +
        (exp_pickup_fee * 1 > 0 ?
            IDR_formatter(exp_pickup_fee) :
            "Not applied") +
        "</p> </div> </div>"
    );
    $("#price_simulation_total").html(K_Formatter(min_price));
    $("#price_simulation_total").append(" - ");
    $("#price_simulation_total").append(
        K_Formatter(max_price + exp_pickup_fee)
    );
}

function get_tier_price(qty) {
    let max = 1;

    $("select[name='tier_person[]']").each(function(i) {
        if (qty >= $(this).val()) max = i;
    });

    var return_val = $("input[name='exp_price[]']")
        .eq(max)
        .val()
        .replace("IDR", "")
        .replace(" ", "")
        .replace(".", "");

    return return_val;
}

// EXP Routine function
$("#routine").change(function() {
    if ($(this).val() == "1") {
        $("#exp_date").show();
        $("#exp_day").hide();
        $("#input_exp_schedule_type").val(1);
    } else if ($(this).val() == "2") {
        $("#exp_date").hide();
        $("#exp_day").show();
        $("#input_exp_schedule_type").val(2);
    } else if ($(this).val() == "3") {
        //
        $("#exp_date").hide();
        $("#exp_day").show();
        $("#input_exp_schedule_type").val(2);
        set_schedule_checked();
    } else {
        $("#exp_date").hide();
        $("#exp_day").hide();
    }
});

function set_schedule_checked() {
    $('input[name^="exp_day"]').each(function() {
        this.setAttribute("checked", "checked");
    });
}

// INPUT IMG MNG
$(document).on("change", ".input_file", function(event) {
    readURL(this, "#exp_images" + total_upload);
});

$(document).on("click", ".confirm_imgcrop_exp_img_crop", function() {
    if ($("#exp_input_file" + total_upload).get(0).files.length == 0) {
        $("#exp_img_container" + total_upload).remove();
    } else {
        if (total_upload == 0) {
            $("#exp_images" + total_upload).addClass(
                "gen_square_selected_coverimg"
            );
            $("#primary_img_index").val(0);
        }
        $("#master_crop")
            .croppie("result", {
                type: "base64",
                size: {
                    width: 640,
                    height: 360,
                },
            })
            .then(function(resp) {
                //st result into preview
                $("#exp_images" + total_upload).attr("src", resp);
                console.log(total_upload);
                //set result into hidden input
                $("#exp_input_file_cropped" + total_upload).val(resp);
                $("#cropie_container").remove();
                total_upload++;
                $("#total_img").val(total_upload);
            });
    }
});

$(document).on("click", ".cropie_container_close", function() {
    $("#exp_img_container" + total_upload).remove();
    $("#cropie_container").remove();
});

//INPUT DYNAMIC IMG
$("#exp_add_img").click(function() {
    $("#exp_primary_img_container").prepend(
        "<div class='dynamic_images col-6 px-2 mt-3 ' id='exp_img_container" +
        total_upload +
        "'></div>"
    );
    $("<img />")
        .attr({
            id: "exp_images" + total_upload,
            src: "",
            class: "exp_img_preview idp_crop_receiver h72",
        })
        .appendTo("#exp_img_container" + total_upload);
    $("<input>")
        .attr({
            id: "exp_input_file_cropped" + total_upload,
            name: "img_upload_croppped[]",
            type: "hidden",
            multiple: "",
        })
        .appendTo("#exp_img_container" + total_upload);
    $("<input>")
        .attr({
            class: "input_file exp_img_crop d-none",
            id: "exp_input_file" + total_upload,
            name: "img_upload[]",
            type: "file",
            multiple: "",
        })
        .appendTo("#exp_img_container" + total_upload)
        .click();
    $("#exp_img_container" + total_upload).append(
        "<div id='del" +
        total_upload +
        "' class='del position-absolute' style='top:14px; right:24px' value=" +
        total_upload +
        "> <img class='' src='../public/assets/img/circle-close-blue.svg'></div>"
    );
});
//cancel checker

$(document).on("click", ".input_file", function() {
    document.body.onfocus = checkIt;
});

function checkIt() {
    var theFile = document.getElementById("exp_input_file" + total_upload);

    setTimeout(function() {
        if (theFile.value.length) {
            //if there is files loaded
        } else {
            //if there no files loaded
            $("#exp_img_container" + total_upload).remove();
            $("#cropie_container").remove();
        }
        document.body.onfocus = null;
    }, 500);
}

$("#exp_toggle_pickup").change(function() {
    if ($(this).prop("checked")) {
        $(this).val("1");
        $("#is_pickup").val(1);

        $("#exp_pickup_info").html(
            "Pick up & drop off service is active.Set the pick up range under 50 km from meeting point and set an additional pick up cost below."
        );
        $("#exp_pickup_detail").show();
    } else {
        $(this).val("0");
        $("#is_pickup").val(0);

        $("#exp_pickup_info").html(
            "If you provide pick up & drop off service, please swipe right to activate."
        );
        $("#exp_pickup_detail").hide();
    }
});

$(document).on("click", ".del_include, .del_exclude", function() {
    $(this).closest(".row").remove();
});

//ADD PRICING TIER
$(document).on("click", ".add_price_tier", function() {
    if ($('input[name="exp_price[]"]').last().val().length < 1) {
        custom_alert("Last tier price still empty");
        return;
    }

    if ($(".input_tier_person ").last().val() < $("#exp_max_person_id").val()) {

        // disable latest tier
        $(".tier" + total_tier + " .tier_delete").remove();
        $(".tier" + total_tier).addClass("disable");
        total_tier++;
        $(".tier_template")
            .clone()
            .removeClass("tier_template ")
            .addClass("tier" + total_tier)
            .appendTo(".price_tier_container");
        // $(".tier" + total_tier + " .input_tier_price").attr(
        //     "name",
        //     "exp_price[]"
        // );

        $(".tier" + total_tier + " .template_tier_person").removeClass(
            "template_tier_person"
        );

        if (total_tier == 1) {
            $(".tier1 .input_tier_person option:first-child").remove()
        }

        $(".input_tier_person").change();

    } else {
        custom_alert("Tier price reach max");

    }
});

$(document).on("click", ".tier_delete", function() {
    if (total_tier > 1) {
        //
        $(this)
            .clone()
            .appendTo(".tier" + (total_tier - 1));
        $(".input_tier_person").eq(-2).change();
    }

    if (total_tier == 1) {
        $("#exp_max_person_id").change();
    }

    $(this).closest(".gen_tier").remove();
    total_tier--;
    $(".tier" + total_tier).removeClass("disable");

    set_simulation_price();
});

$(document).on("change", "#exp_max_person_id", function() {
    if ($(this).val() > 1) {
        $(".template_tier_person").html("");
        for (let index = 1; index <= $(this).val(); index++) {
            $(".template_tier_person").append(new Option(index, index));
        }
    } else {
        $(".template_tier_person").append(new Option(1, 1));
    }
});

$(document).on("change", ".input_tier_person ", function() {
    $(".template_tier_person ").html("");
    $(".template_tier_person").append(
        $("<option></option>").attr("value", "").attr("hidden", "").text("")
    );


    for (var index = $(this).val() * 1 + 1; index <= $("#exp_max_person_id").val(); index++) {
        if (index - 1 == $(this).val() * 1) {
            $(".template_tier_person").append(
                $("<option></option>").attr("value", index).attr("selected", "").text(index)
            );

        } else $(".template_tier_person").append(new Option(index, index));
    }
});

jQuery.validator.addMethod(
    "Starting_time_set",
    function(value, element) {
        if (value == "Starting time") return 0;
        else return 1;

        // return this.optional(element) || parseFloat(value) > 0;
    },
    "Please set starting time"
);

jQuery.validator.addMethod(
    "cek_total_img",
    function(value, element) {
        if (currentTab == 1) {
            if (value == 0) return 0;
            else return 1;
        } else return 1;

        // return this.optional(element) || parseFloat(value) > 0;
    },
    "Minimum 1 photo is required, max 10 photos."
);

$(document).on("change", ".gen_timepicker_hr", function() {
    if ($(".gen_timepicker_mnt").val() == null) {
        $(".gen_timepicker_mnt").val("00");
    }
});

$(document).on("change", ".gen_timepicker", function() {
    //
    $("#exp_start_time").val(
        $(".gen_timepicker_hr").val() + ":" + $(".gen_timepicker_mnt").val()
    );
});