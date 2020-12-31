// select picker default value

$(document).ready(function() {
    $("#language").select2();
    $('#language').select2('val', $.makeArray($("#language_temp").val()));
    $('#language').val($("#language_temp").val().split(",")).trigger('change');


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



$("#form_edit_profile").submit(function(e) {
    if (!$("#form_edit_profile").valid()) {
        e.preventDefault();
    }

});

$("#language").change(function() {
    $("#language_err").hide()
})

$("#form_edit_profile").validate({
    rules: {
        first_name: {
            required: true,
        },

        last_name: {
            required: true
        },

        birthday: {
            required: true,
        },
        occupation: {
            required: true,
        },

        from: {
            required: true
        },

        "language[]": {
            required: true

        },

        about: {
            required: true
        },
    },

    messages: {
        // exp_schedule_type: "Please select routine type",
        // exp_max_person: "Please select max number of travelers",
        // "exp_day[]": "please select at least 1 day selected",
        // total_img: "Please add at least 1 photo"
    },

    errorPlacement: function(error, element) {
        // console.log(element);

        if (element.attr("name") == "language[]") {
            $("#language_err").html(error);
        } else {

            error.insertAfter(element);
        }
    }

});