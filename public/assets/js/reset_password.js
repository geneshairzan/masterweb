$("#forget_pass_form").validate({
    rules: {
        password1: {
            minlength: 8
        },
        password2: {
            equalTo: "#password"
        }
    },
});