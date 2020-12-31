$(document).ready(function() {
    $("#pre_exp_booking").validate({
        rules: {
            name: "required",
            email: "required",
            phone: "required",
        },
    });

    $("#pre_exp_booking").submit(function(e) {
        if (!$("#pre_exp_booking").valid()) return;
        if ($("#is_login").val() == 1) {
            // $("#pre_exp_booking").submit();
        } else {
            // custom_alert("need to log in - register ajax");
            e.preventDefault();
            $.ajax({
                url: "auth/do_reg_guest",
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
                    console.log(data);
                    if (data.condition == 1) {
                        $("#is_login").val(1);
                        $("#pre_exp_booking").submit();
                        $("#loader_modal").hide();
                    } else {
                        $("#loader_modal").hide();
                    }
                    // $("#app_register").html($('#success'));
                    // $('#success').show();
                },
                error: function(data) {
                    $("#loader_modal").hide();
                    // console.log(data.responseText);
                },
            });
        }
    });
});