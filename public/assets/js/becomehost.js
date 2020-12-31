currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab.
btn_check();

window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
    },

});

$(".prevBtn").click(function() {
    nextPrev(-1);
    btn_check();
});

$(".nextBtn").click(function() {
    if ($("#become_host_form").valid()) {
        nextPrev(1);
        btn_check();
    }
});


$("#become_host_form").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        birthday: "required",
        gender: "required",
        id_img_upload: {
            required: true,
            extension: "jpg|jpeg|png|ico|bmp",
        },
        id_type: "required",
        tnc: "required",
    },
});

$("#become_host_form_phonever_form").validate({
    debug: true,
    rules: {
        verification_code: {
            required: true,
        },

    },
})

$(document).on('click', '#btn_phone_ver', function() {
    if ($("#become_host_form").valid()) {
        phone_regis($('#area_code').val() + $('#phone_number').val());
    }
});

function btn_check() {
    if (currentTab == 1) {
        $("#btn_phone_ver").show();
        $("#nextBtn").hide();
    } else {
        $("#btn_phone_ver").hide();
        $("#nextBtn").show();
    }
}


function phone_regis(phone) {
    $("#loader_modal").show();

    firebase.auth().signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            window.confirmationResult = confirmationResult;
            $('#phone_ver_modal').show();

            $("#loader_modal").hide();

            // console.log(confirmationResult);

            // $('#register_form').hide();
            // $('#verification_form').show();
            // $("#loader_modal").hide();

            //let code = window.prompt('Please enter the 6 digit code');
            //return confirmationResult.confirm(code);
        }).catch(function(error) {
            $("#loader_modal").hide();

            // Error; SMS not sent
            // ...
            alert(error);
            // console.log(error);

        });
}

$(document).on('click', '#verify', function() {
    if ($("#become_host_form_phonever_form").valid()) {
        // alert($('#verification_id').val());

        var code = $("#verification_id").val();
        // alert(code);
        confirmationResult.confirm($('#verification_id').val()).then(function(result) {
            // User signed in successfully.
            // var user = result.user;

            // console.log(user);
            $('#phone_ver_modal').hide();
            $('#phone_number_isvalid').html('this phone number is valid');
            $("#btn_phone_ver").hide();
            $("#nextBtn").show();


            // ...
        }).catch(function(error) {
            console.log(error);
            // User couldn't sign in (bad verification code?)
            // ...
            $('#phone_ver_modal').hide();
            $('#phone_number_isvalid').html('bad verification code');
            // alert("bad verification code");
        });
    }
});




$("#id_file_input .plus").click(function() {
    $(".pid_group .input_file").click();
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



$("#become_host_form").on("submit", function(event) {
    event.preventDefault();

    if ($("#become_host_form").valid()) {
        $('#become_host_form').hide();
        $("#loader_modal").show();

        $.ajax({
            url: 'do_becomehost',
            method: "POST",
            data: new FormData(this),
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                // console.log(data);
                // $("#app_register").html($("#success"));
                $("#loader_modal").hide();

                $("#success").show();
            },
            error: function(data) {
                // console.log(data);
                alert('err');

            },
        });
    }

});