$(document).ready(function() {
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
});

$(".prevBtn").click(function() {
    nextPrev(-1);
});

$(".nextBtn").click(function() {
    if ($("#map_error_flag").val() == 1) {
        if ($("#map_is_selected").val() == 0) {
            $(".map_error_msg").html("Please set your pickup location first");
        } else {
            //
        }
        $(".map_error_msg").show();
    } else {
        if ($("#exp_confirmation_booking").valid()) {
            nextPrev(1);
        }
    }
});

$("#exp_confirmation_booking").validate({
    rules: {
        // tnc: "required",
        // pickup_address: "required",
    },
});

$(document).on("click", "#btn_submit_exp_confirmation_booking", function() {
    $("#exp_confirmation_booking").submit();
});

$("#exp_toggle_pickup").change(function() {
    if ($(this).prop("checked")) {
        var total = $("#c_pickup_fee").val() * 1 + $("#c_exp_price").val() * 1;
        $(".h3_pickup_price").html($("#temp_pickup_price").val());
        $(".set_pickup_loc_container").show();
        $("#booking_is_pickup").val("1");

        $(".pickup1").show();
        $(".pickup0").hide();

        $(".pickup_cost1").show();
        $(".pickup_cost2").hide();

        $(".total1").show();
        $(".total0").hide();

        if ($(".set_pickup_loc_btn").is(":visible")) {
            $("#map_error_flag").val(1);
        } else {
            $("#map_error_flag").val(0);
        }

        // $("#total_exp_price").html("<b>IDR " + parseInt(total).toLocaleString() + "<b>");
    } else {
        $(".h3_pickup_price").html("-");
        $(".set_pickup_loc_container").hide();
        $("#booking_is_pickup").val("0");

        $(".pickup1").hide();
        $(".pickup0").show();

        $(".pickup_cost1").hide();
        $(".pickup_cost2").show();

        $(".total1").hide();
        $(".total0").show();

        $("#map_error_flag").val(0);

        // $("#total_exp_price").html("<b>IDR " + parseInt($("#c_exp_price").val()).toLocaleString() + "<b>");
    }
});

$("#booking_is_pickup").change(function() {
    if ($(this).val() == 1) {
        alert("booking_is_pickup1");
    } else {
        alert("booking_is_pickup0");
    }
});

$(document).on("click", ".map_confirm", function() {
    if ($("#map_error_flag").val() == 1) {
        //
        $(".set_pickup_loc_btn").removeClass("gen_dnone");
        $(".map_error_msg").show();
    } else {
        $("#address-map-container2").show();
        $(".set_pickup_loc_btn").hide();
        $(".map_error_msg").hide();

        $(".Addtional_Cost_Text").css("posisition", "relative");
        $(".Addtional_Cost_Text").removeClass("position-absolute");
        $(".Addtional_Cost_Text").css("top", "52px");

        var custom_marker2 = {
            url: "public/assets/img/mtr-pin-black.svg",
            scaledSize: new google.maps.Size(30, 30),
        };

        var myLatLng2 = {
            lat: $("#address-latitude").val() * 1,
            lng: $("#address-longitude").val() * 1,
        };

        var map2 = new google.maps.Map(
            document.getElementsByClassName("pickup_maps_preview")[0], {
                center: myLatLng2,
                zoom: 15,
                draggable: false,
                disableDefaultUI: true,
            }
        );

        var map3 = new google.maps.Map(
            document.getElementsByClassName("pickup_maps_preview")[1], {
                center: myLatLng2,
                zoom: 15,
                draggable: false,
                disableDefaultUI: true,
            }
        );

        new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map2,
            position: myLatLng2,
        });

        new google.maps.Marker({
            icon: custom_marker2,
            draggable: false,
            map: map3,
            position: myLatLng2,
        });
    }
});




$(document).on('submit', '#exp_confirmation_booking', function(e) {

    // e.preventDefault();

});

$('#exp_confirmation_booking').submit(function(e) {

    // //prevent default
    // e.preventDefault();

    // if ($("input[name=payment_type]:checked").val() == 'cash') {
    //     // continue submitting
    //     e.currentTarget.submit();
    // }
    // if ($("input[name=payment_type]:checked").val() == 'midtrans') {
    //     $.ajax({
    //         url: js_base_url + '/api/submit_midtrans',
    //         method: "POST",
    //         data: new FormData(this),
    //         dataType: "JSON",
    //         contentType: false,
    //         cache: false,
    //         processData: false,
    //         beforeSend: function() {
    //             $("#loader_modal").show();
    //         },
    //         success: function(data) {
    //             $("#loader_modal").hide();
    //             console.log(data);

    //             // console.log(data.responseText);
    //             // $("#app_register").html($('#success'));
    //             // $('#success').show();

    //             if (data.role == 3) $(location).attr("href", "home");
    //             if (data.role == 2) $(location).attr("href", "home");
    //         },
    //         error: function(data) {
    //             console.log(data);
    //             $("#loader_modal").hide();
    //             // console.log(data.responseText);

    //             $("#register_form").show();
    //             $("#password_form").hide();
    //             $("#err_phone_number").html("Phone number and password invalid");
    //         },
    //     });
    // }



});