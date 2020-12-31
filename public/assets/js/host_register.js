var temp_date = new moment();

$(document).ready(function() {
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
    btn_mailcheck();

    let startYear = 1800;
    let endYear = new Date().getFullYear();
    for (i = endYear; i > startYear; i--) {
        $("#gen_year_picker").append($("<option />").val(i).html(i));
    }

    for (var i = 1; i <= 31; i++) {
        $("#gen_day_picker").append($("<option />").val(i).html(i));
    }
    temp_date.date(1);
    temp_date.year(2020);
    temp_date.month(0);

    $("#birthdate").val(temp_date.format("YYYY-MM-DD"));
});

$(document).ready(function() {
    $("#language").select2();

    $("#city").select2({
        placeholder: "Select a state",
    });

    // $('#language').select2('val', $.makeArray($("#language_temp").val()));
    // $('#language').val($("#language_temp").val().split(",")).trigger('change');
});

$(document).on("click,focus", "#input_pass", function(e) {
    $("#input_pass").attr("type", "text");
});

$(document).on("blur", "#input_pass", function(e) {
    $("#input_pass").attr("type", "password");

    if ($("#input_pass").val().length < 1) {
        $("#input_pass").attr("type", "text");
    }
});

$(document).on("keyup", "#input_pass", function(e) {
    $("#input_pass").attr("type", "password");

    if ($("#input_pass").val().length < 1) {
        $("#input_pass").attr("type", "text");
    }
});

$(document).ready(function() {
    $("#language").select2({
        width: "100%",
        placeholder: "Select your spoken language",
    });
    $(".select2-search__field").css("min-width", "300px");
});

$("#host_registration").on("submit", function(event) {
    $("#loader_modal").show();

    //  $('#host_registration').submit();
    // event.preventDefault();
    // $.ajax({
    //     url: $("#host_registration").attr("action"),
    //     method: "POST",
    //     data: new FormData(this),
    //     dataType: "JSON",
    //     contentType: false,
    //     cache: false,
    //     processData: false,
    //     success: function(data) {
    //         $("#app_register").html($("#success"));
    //         $("#success").show();
    //     },
    //     error: function(data) {
    //         console.log(data);
    //     },
    // });
});

$("#host_registration").validate({
    rules: {
        password: {
            required: true,
            minlength: 8,
            //  alphanumeric: true,
        },
        email: {
            // compound rule
            required: true,
            email: true,
            email_valid: true,
        },

        fullname: "required",
        birthdate: "required",
        occupation: "required",
        "language[]": "lang_check",
        gender: "required",
        about: "required",

        img_upload: {
            required: true,
            extension: "jpg|jpeg|png|ico|bmp",
        },
        id_img_upload: {
            required: true,
            extension: "jpg|jpeg|png|ico|bmp",
        },
        id_type: "required",
        tnc: "required",
    },
    //  password: {
    //      required: "Please enter name",
    //      //  maxlength: "Your last name maxlength should be 50 characters long."
    //  },
});

jQuery.validator.addMethod(
    "email_valid",
    function(value, element) {
        return $('#input_mail_is_valid').val() * 1;
        // return this.optional(element) || parseFloat(value) > 0;
    },
    "Please check your email"
);

$("#prevBtn").click(function() {
    nextPrev(-1);
    btn_mailcheck();
});

$(".nextBtn").click(function() {
    // nextPrev(1);
    if ($("#host_registration").valid()) {
        if (currentTab < 2) {
            nextPrev(1);
        }
        // btn_mailcheck();
    } else {
        $(window).scrollTop(0);
    }
});

function btn_mailcheck() {
    if (currentTab == 0) {
        $("#email_check").show();
        $("#nextBtn").hide();
    } else {
        $("#email_check").hide();
        $("#nextBtn").show();
    }
}

$(document).on("click", "#email_check", function() {
    if ($("#host_registration").valid()) {
        $.ajax({
            url: "../auth/do_check_mail",
            type: "POST",
            data: {
                email: $("#email").val(),
                _token: $("[name='_token']").val(),
            },
            cache: false,
            datatype: "JSON",
            beforeSend: function() {
                $("#loader_modal").show();
            },
            success: function(data) {
                console.log(data);
                $("#loader_modal").hide();

                if (data.condition == 0) {
                    // if no email registered
                    $("#mail_check_response").html("This is email is valid");
                    $("#email_check").hide();
                    $("#nextBtn").show();
                }

                if (data.condition == 1) {
                    //
                    $("#mail_check_response").html(
                        'This is email already registred as user.<br> If you own this email, and want to become a Host, please follow <a href=""><b>this link</b></a>'
                    );
                    $("#email_check").hide();
                }
                if (data.condition == 2) {
                    //
                    $("#mail_check_response").html(
                        "This is email already used by another host.<br> Please use another email"
                    );
                }
            },
            error: function(data) {
                // console.log(data);
            },
        });
    }
});

$(".pp_trigger").click(function() {
    // alert();
    // $(".pp_group .input_file").click();
    $("#pp_img_upload").attr("name", "img_upload");
    $("#pp_img_upload").click();
});

$(".idp_trigger").click(function() {
    // $(".pid_group .input_file").click();
    // alert();
    $("#id_img_upload").click();
});

$(document).on("click", "#confirm_imgcrop", function(e) {
    if (currentTab == 1) {
        if ($("#id_img_upload").val().length > 0) {
            //
            $("#id_img_error").val(0);
            $(".dashed_rect").hide();
            $(".idp_crop_receiver").show();
        } else {
            //
        }
    }

    if (currentTab == 2) {
        if ($("#pp_img_upload").val().length > 0) {
            //
            $("#pp_img_error").val(0);
            $(".dashed_circle").hide();
            $(".pp_crop_receiver").show();
            $(".pp_crop_receiver_refresh").show();
        } else {
            //
        }
    }
});

$("#img_file_input input").change(function() {
    readURL(this, "#img_file_input");
});

$("#id_file_input input").change(function() {
    readURL(this, "#id_file_input");
});

function readURL(input, dest) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $(dest + " img").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on(
    "change",
    "#gen_day_picker,#gen_month_picker,#gen_year_picker",
    function() {
        temp_date.date($("#gen_day_picker").val());
        temp_date.year($("#gen_year_picker").val());
        temp_date.month($("#gen_month_picker").val());

        $("#birthdate").val(temp_date.format("YYYY-MM-DD"));
        console.log($("#birthdate").val());
    }
);

function countChar(val) {
    if (val.value.length <= 300) {
        $("#total_char").text(300 - val.value.length);
    }
}

$.validator.addMethod(
    "lang_check",
    function(value, element) {
        if ($("#language").val().length == 0) return false;
        else return true;
    },
    "Please select at least 1"
);

$("#language").on("select2:select", function(e) {
    $("#language").valid();
    $(".select2-search__field").css("min-width", "0");
});

$(document).on("change", "#input_mail_check", function() {
    $.ajax({
        url: js_base_url + "/auth/do_check_mail",
        type: "POST",
        data: {
            email: $("#input_mail_check").val(),
            _token: $("[name='_token']").val(),
        },
        cache: false,
        datatype: "JSON",
        beforeSend: function() {
            $("#loader_modal").show();
        },
        success: function(data) {
            console.log(data);
            $("#loader_modal").hide();

            if (data.condition == 0) {
                $('#input_mail_is_valid').val(1);
            }

            if (data.condition == 1) {
                //

                $('#user_confirmation_modal .content_confirmation').html('This is email already registred as user.<br> If you own this email, and want to become a Host, please login first');
                $('#user_confirmation_modal .link_login').show();

                $('#user_confirmation_modal').show();
                $('#input_mail_is_valid').val(0);


            }
            if (data.condition == 2) {

                $('#user_confirmation_modal .content_confirmation').html("This is email already used by another host.<br> Please use another email");
                $('#user_confirmation_modal .link_login').hide();
                $('#user_confirmation_modal').show();
                $('#input_mail_is_valid').val(0);



            }
        },
        error: function(data) {
            // console.log(data);
        },
    });
});