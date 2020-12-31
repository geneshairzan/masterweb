// cropie PP
$(document).on("click", ".pp_crop", function() {
    //reset value
    $(this).val("");
    $("#cropie_container").remove();
    // generate modal & cropie div
    var x = $("#temp_cropie_container")
        .clone()
        .attr("id", "cropie_container")
        .appendTo("body");

    x.find("#temp_master_crop").attr("id", "master_crop");
    x.find("#confirm_imgcrop").addClass("confirm_imgcrop_pp_crop");
});

// CROPIE 2 - ID photo

$(document).on("click", ".idp_crop", function() {
    //reset value
    $(this).val("");
    $("#cropie_container").remove();

    // generate modal & cropie div
    var x = $("#temp_cropie_container")
        .clone()
        .attr("id", "cropie_container")
        .appendTo("body");

    x.find("#temp_master_crop").attr("id", "master_crop");
    x.find("#confirm_imgcrop").addClass("confirm_imgcrop_idp_crop");
});

// SET 3 - exp img
$(document).on("click", ".exp_img_crop", function() {
    //reset value
    $(this).val("");
    $("#cropie_container").remove();

    // generate modal & cropie div
    var x = $("#temp_cropie_container")
        .clone()
        .attr("id", "cropie_container")
        .appendTo("body");

    x.find("#temp_master_crop").attr("id", "master_crop");
    x.find("#confirm_imgcrop").addClass("confirm_imgcrop_exp_img_crop");
});

// ON CANCEL

$(document).on("click", ".cropie_container_close", function() {
    $("#cropie_container").remove();
});

$(document).on("change", ".idp_crop, .exp_img_crop, .pp_crop", function() {
    $("#cropie_container").show();
});

$(document).on("change", ".pp_crop", function() {
    $("#master_crop").croppie("destroy");
    var abc = $("#master_crop").croppie({
        viewport: {
            width: 250,
            height: 250,
            type: "circle",
        },

        showZoomer: false,
        url: "",
        customClass: "gen_dnone",
    });



    croppie_readURL(this);
    $("#master_crop").show();
});

$(document).on("change", ".idp_crop", function() {
    $("#master_crop").croppie("destroy");
    var abc = $("#master_crop").croppie({
        viewport: {
            width: 280,
            height: 160,
        },
        boundary: {
            width: 320,
            height: 180,
        },
        showZoomer: true,
        url: "",
        customClass: "gen_dnone",
    });

    croppie_readURL(this);
    $("#master_crop").show();
});

$(document).on("change", ".exp_img_crop", function() {
    $("#master_crop").croppie("destroy");

    var abc = $("#master_crop").croppie({
        enableExif: true,
        viewport: {
            width: 320,
            height: 180,
        },

        url: "",
        customClass: "gen_dnone",
    });
    croppie_readURL(this);
    $("#master_crop").show();
});

$(document).on("click", ".confirm_imgcrop_idp_crop", function(e) {
    e.preventDefault();
    $("#master_crop")
        .croppie("result", {
            type: "base64",
            size: {
                width: 960,
                height: 480,
            },
        })
        .then(function(resp) {
            // console.logresp);
            //set result into review
            $(".idp_crop_receiver").attr("src", resp);
            $(".idp_crop_receiver").removeClass("pls");
            $(".idp_crop_receiver").addClass("user_idp");

            //set result into hidden input
            $(".idp_crop_receiver_64").val(resp);
        });

    if ($(".idp_crop").val().length > 1) {}
    $("#cropie_container").remove();
});

$(document).on("click", ".confirm_imgcrop_pp_crop", function(e) {
    if ($(".pp_crop").val().length > 1) {
        e.preventDefault();
        $("#master_crop")
            .croppie("result", {
                type: "base64",
                size: {
                    width: 480,
                    height: 480,
                },
            })
            .then(function(resp) {
                //set result ito preview
                $(".pp_crop_receiver").attr("src", resp);
                //set result into hidden inpu
                $(".pp_crop_receiver_64").val(resp);
            });
    }
    $("#cropie_container").remove();
});

$(document).on("click", ".confirm_imgcrop_exp_img_crop", function(e) {


    // check : host_exp_create_update.js




    // if ($(".exp_img_crop").val().length > 1) {
    //     e.preventDefault();
    //     $("#master_crop")
    //         .croppie("result", {
    //             type: "base64",
    //             size: {
    //                 width: 640,
    //                 height: 360,
    //             },
    //         })
    //         .then(function(resp) {
    //             console.log(resp);
    //             //st result into preview
    //             $("#exp_images" + total_upload).attr("src", resp);
    //             console.log(total_upload);
    //             //set result into hidden input
    //             $("#exp_input_file_cropped" + total_upload).val(resp);
    //         });
    //     $("#cropie_container").remove();
    // }
});

function croppie_readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#master_crop").croppie("bind", {
                url: e.target.result,
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
}