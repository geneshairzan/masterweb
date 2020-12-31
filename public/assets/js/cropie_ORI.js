// cropie PP

$(document).on("click", ".pp_crop", function() {
    //reset value
    $(this).val("");

    // generate modal & cropie div
    $("#cropie_container").clone().appendTo("body");
    $("#cropie_container").show("body");

    //init cropie
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

    $(this).on("change", function(e) {
        croppie_readURL(this);
        $("#master_crop").show();
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

    $("#confirm_imgcrop").on("click", function(e) {
        if ($(".pp_crop").val().length > 1) {
            e.preventDefault();
            //parsing result

            abc.croppie("result", {
                type: "base64",
                size: {
                    width: 480,
                    height: 480,
                },
            }).then(function(resp) {
                // console.log(resp);
                //set result into preview
                $(".pp_crop_receiver").attr("src", resp);
                //set result into hidden input
                $(".pp_crop_receiver_64").val(resp);
            });
        }
        $("#cropie_container").remove();
    });
});

// CROPIE 2 - ID photo
$(document).on("click", ".idp_crop", function() {
    //reset value
    $(this).val("");
    // generate modal & cropie div
    $("#cropie_container").clone().appendTo("body");
    $("#cropie_container").show("body");

    //init cropie
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

    $(this).on("change", function(e) {
        croppie_readURL(this);
        $("#master_crop").show();
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

    $("#confirm_imgcrop").on("click", function(e) {
        e.preventDefault();
        //parsing result
        abc.croppie("result", {
            type: "base64",
            size: {
                width: 960,
                height: 480,
            },
        }).then(function(resp) {
            // console.log(resp);
            //set result into preview
            $(".idp_crop_receiver").attr("src", resp);
            $(".idp_crop_receiver").removeClass("plus");
            $(".idp_crop_receiver").addClass("user_idp");

            //set result into hidden input
            $(".idp_crop_receiver_64").val(resp);
        });

        if ($(".idp_crop").val().length > 1) {}
        $("#cropie_container").remove();
    });
});

// SET 3 - exp img
$(document).on("click", ".exp_img_crop", function() {
    //reset value
    $(this).val("");
    // generate modal & cropie div
    $("#cropie_container").clone().appendTo("body");
    $("#cropie_container").show("body");

    //init cropie
    var abc = $("#master_crop").croppie({
        enableExif: true,
        viewport: {
            width: 320,
            height: 180,
        },

        url: "",
        customClass: "gen_dnone",
    });

    $(this).on("change", function(e) {
        croppie_readURL(this);
        $("#master_crop").show();
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

    $("#confirm_imgcrop").on("click", function(e) {
        if ($(".exp_img_crop").val().length > 1) {
            e.preventDefault();
            //parsing result
            abc.croppie("result", {
                type: "base64",
                size: {
                    width: 640,
                    height: 360,
                },
            }).then(function(resp) {
                //set result into preview
                $("#exp_images" + total_upload).attr("src", resp);

                //set result into hidden input
                $("#exp_input_file_cropped" + total_upload).val(resp);
            });
        }
        $("#cropie_container").remove();
    });
});

$(document).on("click", ".cropie_container_close", function() {
    $("#cropie_container").remove();
});