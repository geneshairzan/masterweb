// Your web app's Firebase configuration
var phone = "+6208119951112";
$(document).ready(function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
            size: "invisible",
            callback: function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
        }
    );
});

$("#register_form").on("submit", function(event) {
    event.preventDefault();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $("input[name=_token]").val(),
        },
    });

    $.ajax({
        url: "auth/app_login",
        type: "POST",
        data: {
            phone: $("#area_code").val() + $("#phone_number").val(),
        },
        cache: false,
        datatype: "JSON",
        beforeSend: function() {
            $("#loader_modal").show();
        },
        // processData: false,
        success: function(data) {
            $("#loader_modal").hide();
            $("#err_phone_number").html("");

            if (data.logged_in == 0) {
                redirectPost("host/register", data.phone);
            }

            if (data.logged_in == 1) {
                //phone regis process

                $("#register_form").hide();
                $("#password_form").show();
                $("#login_phone_number").val(
                    $("#area_code").val() + $("#phone_number").val()
                );
                $("#login_phone_number_forgot").val(
                    $("#area_code").val() + $("#phone_number").val()
                );
            }

            if (data.logged_in == 2) {
                //phone regis process
                phone = data.phone;
                // $('#exampleModal').modal('show');

                $("#loader_modal").show();
                phone_regis();

                setInterval(timer, 1000); //1000 will  run it every 1 second
            }
        },
        error: function(data) {
            // console.log(data);

            var errors = $.parseJSON(data.responseText);
            $("#err_phone_number").html("err fail: ");
            $.each(errors.messages, function(key, value) {
                $("#err_phone_number").append(value);
            });
        },
    });
});

$("#password_form").on("submit", function(event) {
    event.preventDefault();
    $.ajax({
        url: $("#password_form").attr("action"),
        method: "POST",
        data: new FormData(this),
        dataType: "JSON",
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function() {
            $("#loader_modal").show();
        },
        success: function(data) {
            $("#loader_modal").hide();

            // console.log(data.responseText);
            // $("#app_register").html($('#success'));
            // $('#success').show();

            if (data.role == 3) $(location).attr("href", "admin");
            if (data.role == 2) $(location).attr("href", "home");
        },
        error: function(data) {
            $("#loader_modal").hide();
            // console.log(data.responseText);

            $("#register_form").show();
            $("#password_form").hide();
            $("#err_phone_number").html("Phone number and password invalid");
        },
    });
});

// $('#reg_button').click(function() {
//     $('#exampleModal').modal('hide');
//     $("#loader_modal").show();
//     phone_regis();

// });

function phone_regis() {
    firebase
        .auth()
        .signInWithPhoneNumber(phone, window.recaptchaVerifier)
        .then(function(confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
            $("#register_form").hide();
            $("#verification_form").show();
            $("#loader_modal").hide();

            //let code = window.prompt('Please enter the 6 digit code');
            //return confirmationResult.confirm(code);
        })
        .catch(function(error) {
            // Error; SMS not sent
            // ...
            alert(error);
            console.log(error);
        });
}

$("#verification_form").on("submit", function(event) {
    $("#loader_modal").show();

    event.preventDefault();

    var code = $("#verification_id").val();
    // alert(code);
    confirmationResult
        .confirm(code)
        .then(function(result) {
            // User signed in successfully.
            // var user = result.user;

            // console.log(user);
            custom_alert(result.user.phoneNumber + " Successfully registered");
            redirectPost("host/register", phone);

            $("#loader_modal").hide();

            // ...
        })
        .catch(function(error) {
            // console.log(error);
            $("#loader_modal").hide();

            // User couldn't sign in (bad verification code?)
            // ...
            custom_alert("bad verification code");
        });
});

$(".trigger_forget_pass").on("click", function() {
    $("#forget_password_modal").show();
});

$(".trigger_forgot_pass_modal_close").on("click", function() {
    $("#forget_password_modal").hide();
});