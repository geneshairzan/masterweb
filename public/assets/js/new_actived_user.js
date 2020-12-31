var temp_date = new moment();


$(document).ready(function() {
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    let startYear = 1800;
    let endYear = new Date().getFullYear();
    for (i = endYear; i > startYear; i--) {
        $('#gen_year_picker').append($('<option />').val(i).html(i));
    }

    for (var i = 1; i <= 31; i++) {
        $('#gen_day_picker').append($('<option />').val(i).html(i));
    }
    temp_date.date(1);
    temp_date.year(2020);
    temp_date.month(0);
    // console.log(temp_date.format('YYYY-MM-DD'));

    $('#birthdate').val(temp_date.format('YYYY-MM-DD'));
});


$(".prevBtn").click(function() {
    nextPrev(-1);
});

$(".nextBtn").click(function() {
    // nextPrev(1);
    if ($("#new_actived_user_form").valid()) {
        nextPrev(1);
    }
});

$("#new_actived_user_form").validate({
    rules: {
        name: "required",
        gender: "required",
        password: {
            required: 1,
            minlength: 8,
        },

        gen_day_picker: {
            age_check: true,
            // required: age_check(),
            // minlength: 8,
        },

    },
});

$('#new_actived_user_form').submit(function(e) {
    if (currentTab != 3) {
        e.preventDefault();
    }
});



$(document).on('click', '.gender_male', function() {
    $('#gender').val(1);
});

$(document).on('click', '.gender_female', function() {
    $('#gender').val(0);
});

$(document).on('click', '.gender_other', function() {
    $('#gender').val(3);
});


$(document).on('change', '#gen_day_picker,#gen_month_picker,#gen_year_picker', function() {
    temp_date.date($('#gen_day_picker').val());
    temp_date.year($('#gen_year_picker').val());
    temp_date.month($('#gen_month_picker').val());

    $('#birthdate').val(temp_date.format('YYYY-MM-DD'));
    console.log($('#birthdate').val());


});


$.validator.addMethod("age_check", function(value, element) {

    if (moment().diff($('#birthdate').val(), 'years') < 13) {
        return 0;

    } else {
        return 1;
    }
}, "Min age 14 years old");


$(document).on('click,focus', '#input_pass', function(e) {
    $("#input_pass").attr("type", "text");
});

$(document).on('blur', '#input_pass', function(e) {
    $("#input_pass").attr("type", "password");

    if ($('#input_pass').val().length < 1) {
        $("#input_pass").attr("type", "text");
    }
});


$(document).on('keyup', '#input_pass', function(e) {

    $("#input_pass").attr("type", "password");

    if ($('#input_pass').val().length < 1) {
        $("#input_pass").attr("type", "text");
    }
});