$(document).on('click', '#btn_submit_exp_confirmation_booking', function() {

    if ($('input[name=payment_type]:checked').val() != 2) {
        $('#booking_payment_form').submit();
    } else {

        $.ajax({
            url: js_base_url + '/api/submit_midtrans',
            method: "POST",
            data: new FormData($('#booking_payment_form')[0]),
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function() {
                $("#loader_modal").show();
            },
            success: function(data) {
                $("#loader_modal").hide();
                // console.log(data);

                snap.pay(data['token'], {
                    onSuccess: function(result) {
                        /* You may add your own implementation here */
                        custom_alert("payment success!");
                        window.location.href = js_base_url + '/exp_booking_review?id=' + $('#bookingid').val();

                        // $('#booking_payment_form').submit();
                        // console.log(result);
                    },
                    onPending: function(result) {
                        /* You may add your own implementation here */
                        //if bank transfer into here
                        custom_alert("wating your payment!");
                        console.log('genesha');
                        $("#loader_modal").show();
                        window.setTimeout(function() {
                            window.location.href = js_base_url + '/exp_booking_review?id=' + $('#bookingid').val();
                        }, 1000);
                        // window.location.href = js_base_url + '/exp_booking_review?id=' + $('#bookingid').val();

                        // console.log(result);
                    },
                    onError: function(result) {
                        /* You may add your own implementation here */
                        custom_alert("payment failed!");
                        // console.log(result);
                    },
                    onClose: function() {
                        /* You may add your own implementation here */
                        // custom_alert('you closed the popup without finishing the payment');
                        // window.location.href = js_base_url + '/exp_booking_review?id=' + $('#bookingid').val();
                        // window.setTimeout(function() {
                        //     window.location.href = 'home';
                        // }, 5000);
                        window.location.href = js_base_url + '/exp_booking_review?id=' + $('#bookingid').val();

                    }
                })


            },
            error: function(data) {
                console.log(data);
                console.log('err');

                $("#loader_modal").hide();
            },
        });
    }
});

$(document).ready(function() {
    switch ($('input[name="payment_type"]:checked').val()) {
        case '1':
            $('.payment_msg').html("You have to pay the host directly by cash on the <br> meeting point before the experience begin");
            break;
        case '2':
            $('.payment_msg').html("Midtrans payment");
            break;
        case 3:
            $('.payment_msg').html("");
            break;
        default:
            $('.payment_msg').html("");
            break;

    }

    if ($('#is_cash_payment').val() * 1 == 0) {
        //
        $('#btn_submit_exp_confirmation_booking').click();
    }
});


$(document).on('change', '.input_payment_type ', function() {
    switch ($(this).val()) {
        case '1':
            $('.payment_msg').html("You have to pay the host directly by cash on the <br> meeting point before the experience begin");
            break;
        case '2':
            $('.payment_msg').html("Midtrans payment");
            break;
        case 3:
            $('.payment_msg').html("");
            break;
    }


});