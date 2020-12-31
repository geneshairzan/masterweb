$("#mail_check").validate({
    onsubmit: true,
    rules: {
        login_mail: {
            required: true,
            email: true,
        },

    },
});

$("#app_mail_register").validate({
    onsubmit: true,
    rules: {
        register_mail: {
            required: true,
            email: true,
        },

        register_pass: {
            required: true,
            minlength: 8,
        },

        tnc: {
            required: true,
        },


    },
});

$("#app_mail_login").validate({
    onsubmit: true,
    rules: {
        login_mail: {
            required: true,
            email: true,
        },

        login_pass: {
            required: true,
            minlength: 8,
        },

    },
});



$('#mail_check').on('submit', function(event) {
    event.preventDefault();
    if ($("#mail_check").valid()) {
        $.ajax({
            url: 'auth/do_check_mail',
            method: "POST",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#loader_modal").show();
            },
            success: function(data) {
                console.log(data);
                $('#mail_check').hide();
                $("#loader_modal").hide();
                $('.i_mail').val($('#check_mail').val());



                if (data.condition == 0) {
                    // $('#app_mail_register').show();
                    $('#app_mail_register').submit();


                } else {
                    console.log(data);
                    $('#app_mail_login').show();
                    $('.whois_login').html(data.username);

                }


            },
            error: function(data) {
                // console.log(data.responseText);
                // $("#loader_modal").hide();

            }
        })
    }
});


$('#app_mail_register').on('submit', function(event) {
    event.preventDefault();
    if ($("#app_mail_register").valid()) {
        $.ajax({
            url: 'auth/do_mail_register',
            method: "POST",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#loader_modal").show();
            },
            success: function(data) {
                // console.log(data);
                $("#loader_modal").hide();
                $('#app_mail_register').hide();

                $('.callback_msg').html(data.msg);
                $("#callback").show();


                // window.setTimeout(function() {
                //     window.location.href = 'home';
                // }, 5000);


            },
            error: function(data) {
                // console.log(data.responseText);
                // $("#loader_modal").hide();

            }
        })
    }
});