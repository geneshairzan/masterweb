$(document).ready(function() {
    currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab
});

$(document).ready(function() {
    $("#language").select2({
        width: "100%",
        placeholder: "Select your spoken language",
    });
    $(".select2-search__field").css("min-width", "300px");
});

$(".prevBtn").click(function() {
    nextPrev(-1);
});

$(".nextBtn").click(function() {
    if (currentTab < 5) {
        nextPrev(1);
    }
    if (currentTab == 1) {
        $("#actived_user_continue_form").removeClass("gen_dnone");
    }
});

$("#new_actived_user_form").submit(function(e) {
    if (currentTab != 2) {
        // e.preventDefault();
    }
});

$(".change_pp").click(function() {
    $("#profile_picture_input ").click();
});

$("#profile_picture_input").change(function() {
    readURL(this);
});

$(document).on("click", "#confirm_imgcrop", function() {
    $(".pp_unselected").hide();
    $(".pp_selected").show();
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

$(document).on("click", ".form_skip", function() {
    $("#form_skip").show();
});

$(document).on("click", ".form_continue", function() {
    $("#actived_user_continue_form").submit();
});