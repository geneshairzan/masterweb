$("#forget_pass_form").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        phone_number: "required",
    },
});



$("#forget_pass_form").on("submit", function(event) {
    event.preventDefault();
    if ($("#forget_pass_form").valid()) {
        $.ajax({
            url: "forgot_pass_request_token",
            method: "POST",
            data: new FormData(this),
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#loader_modal").show();
                $("#forget_pass_form").hide();
            },
            success: function(r) {
                console.log(r);
                $("#loader_modal").hide();
                if (r.data == 0) {
                    $("#forget_pass_form").show();
                    $(".msg1").html("incorect phone or email");
                }

                if (r.data == 1) {
                    $("#callback_msg").show();
                    // $("#msg_email").append($("#login_email_forgot").val());
                    window.setTimeout(function() {
                        window.location.href = 'home';
                    }, 5000);
                }
            },
        });
    }
});