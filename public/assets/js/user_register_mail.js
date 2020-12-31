// select picker default value

$(document).ready(function() {

    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
    $("#language").select2();
    $(".nextBtn").click(function() {
        if ($("#user_mail_register").valid()) {
            nextPrev(1);
        }
    });
});




//img trigger file upload
$("#profile_picture_preview").click(function() {
    $("#profile_picture_input ").click();
});

$("#profile_picture_input").change(function() {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $("#profile_picture_preview").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


$("#user_mail_register").validate({
    rules: {
        first_name: "required",
        last_name: "required",
        cropped_img: "required",
        birthday: "required",
        occupation: "required",
        from: "required",
        "language[]": {
            required: true

        },
        about: "required",

    },

    messages: {
        first_name: "Please enter your first name",
        last_name: "Please enter your last name",
        cropped_img: "Please add your profile picture",
        birthday: "Please add your birthdate",
        occupation: "Please add your occupation",
        from: "Please add where do you live",
        "language[]": "Please select language you speak",
        about: "Please add something about you",
    },

    errorPlacement: function(error, element) {
        // console.log(element);
        custom_alert();
        error.appendTo('#custom_alert');
    }

});


$('#user_mail_register').on(submit, function() {
    $("#user_mail_register").hide();

    $("#loader_modal").show();

});