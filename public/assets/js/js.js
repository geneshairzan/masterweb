// register hide/show event
(function($) {
    $.each(["show", "hide"], function(i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function() {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

var currentTab; // Current tab is set to be the first tab (0)

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab_hide");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == x.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab_hide");

    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;

    // Hide the current tab:
    x[currentTab].style.display = "none";

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // if you have reached the end of the form...
    if (currentTab == x.length) {
        $("#nextBtn").attr("type", "submit");
        currentTab = 0;
    }

    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    return 1;
}

// redirectPost('http://www.example.com', { text: 'text\n\ntext' });
function redirectPost(url, data) {
    var form = document.createElement("form");
    document.body.appendChild(form);
    form.method = "post";
    form.action = url;

    var input1 = document.createElement("input");
    input1.type = "hidden";
    input1.name = "_token";
    input1.value = $("input[name=_token]").val();
    form.appendChild(input1);

    var input2 = document.createElement("input");
    input2.type = "hidden";
    input2.name = "data";
    input2.value = data;
    form.appendChild(input2);

    form.submit();
}

function custom_alert(data_text) {
    $("#custom_alert").detach();
    $("body").prepend(
        "<div class='alert text-light animated fadeOut delay-1s  ' id='custom_alert'> </div>"
    );

    $("#custom_alert").html(data_text);
    $("#custom_alert").removeClass(" animated fadeOut");
    setTimeout(function() {
        $("#custom_alert").addClass(" animated fadeOut");
        $("#custom_alert").detach();
    }, 3000);
    $("#custom_alert").show();
}

function set_session(data_name, data_val) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $("input[name=_token]").val(),
        },
    });
    $.ajax({
        type: "POST",
        url: "set_session",
        data: {
            data_name: data_name,
            data_val: data_val,
        },
    });
}

$(document).on("click", ".search", function() {
    $("#search_modal").addClass("slideInRight");
    $("#search_modal").show();
});

$(document).on("click", "#search_modal_close", function() {
    $("#search_modal").addClass("slideOutRight");

    setTimeout(function() {
        //your code to be executed after 1 second
        //wait till animmation closed
        $("#search_modal").hide();
        $("#search_modal").delay(1000).removeClass("slideOutRight");
    }, 1000);
});

// When the user clicks the button, open the modal
$(document).on("click", "#nav_btn", function() {
    $("#nav_modal #sidebar").addClass("slideInLeft animate__faster");
    $("#nav_modal ").show();
});

// When the user clicks on <span> (x), close the modal
$(document).on("click", "#btn_close", function() {
    close_nav();
});

function close_nav() {
    $("#nav_modal #sidebar").addClass("slideOutLeft");

    setTimeout(function() {
        $("#nav_modal").hide();
        $("#nav_modal #sidebar").delay(1000).removeClass("slideOutLeft");
    }, 100);
}

$(document).on("click", ".gen_modal_close", function(e) {
    $(".gen_modal").hide();
    close_nav();
});

$(document).on("click", ".gen_modal_open", function() {
    $("#" + $(this).attr("value")).show();
});

// ELEMENT CHECKER
$("*").click(function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    // console.log($(this));
});

//body locking system
$(document).on("show", ".gen_modal, #nav_modal", function() {
    $("body").addClass("body_lock");
});

$(document).on("hide", ".gen_modal, #nav_modal", function() {
    $("body").removeClass("body_lock");
});

// When the user clicks anywhere outside of the modal, close it
$("#content").on("click", function() {
    if ($("#nav_modal").is(":visible")) {
        $("#nav_modal").hide();
    }
});

$(document).ready(function() {
    $(".datepicker").pickadate({
        min: new Date(),
        format: "yyyy-mm-dd",
        clear: "",
        onStart: function() {
            this.set("select", new Date());
        },
    });

    $(".datepicker2").pickadate({
        min: new Date(),
        clear: "Anytime",
        format: "yyyy-mm-dd",
        // container: '#home_result_card_container',
        onOpen: function() {
            $(".picker").prependTo("body");
        },
    });
});

// truncate tooltip

$(document).on("ready draw load", ".gen_short_text", function() {
    alert();
    var lengthText = 10;
    var text = $(".gen_short_text").text();
    var shortText =
        $.trim(text)
        .substring(0, lengthText)
        .split(" ")
        .slice(0, -1)
        .join(" ") + "...";
    $(".gen_short_text").attr("data-toggle", "tooltip");
    $(".gen_short_text").prop("title", text);
    $(".gen_short_text").text(shortText);

    $('[data-toggle="tooltip"]').tooltip();
});

//LABEL CSS

$("form :input").on("focus active", function() {
    $("label[for='" + this.id + "']").addClass("gen_labelfocus");
});

$("form :input").blur(function() {
    $("label").removeClass("gen_labelfocus");
});

$(".selectpicker").on("select2:open", function(e) {
    $(".selectpicker_label").addClass("f_blue");
});

$(".selectpicker").on("select2:close", function(e) {
    $(".selectpicker_label").removeClass("f_blue");
});

$(document).on("click", ".gen_square", function() {
    $(".gen_square").removeClass("gen_square_selected");
    $(this).addClass("gen_square_selected");
});

// LABEL HELPER
// $(document).on('focus', 'input', function() {
//     if ($(this).val().length > 1) return;
//     if ($(this).attr('class') != 'select2-search__field') {
//         $("<p class='caption label_helper'>" + $(this).attr('placeholder') + "</p>").insertBefore(this);
//     }
// });

// $(document).on('blur', 'input', function() {
//     $('.label_helper').remove();
// });

$(document).on("select2:select", function(e) {
    // Do something
    $(".select2").addClass("select2selected");
});

function K_Formatter(num) {
    return Math.abs(num) > 999 ?
        Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" :
        Math.sign(num) * Math.abs(num);
}

function IDR_formatter(value) {
    return "IDR " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

$(document).on("keyup", ".input_idr", function() {
    if (event.which >= 37 && event.which <= 40) return;
    $(this).val(function(index, value) {
        return (
            "IDR " +
            value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        );
    });
});

$(document).on("click", ".gen_submenu_node", function() {
    $(".gen_submenu_node").removeClass("actived");
    $(this).addClass("actived");
});

// activating custom alert
if ($('.custom_alert').val()) custom_alert($('.custom_alert').val());