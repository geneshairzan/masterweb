$(".nav_trigger").hover(
    function() {
        $(this).addClass('active');
        show_mini_stack();
    },
    function() {
        if (!$(this).hasClass('clicked')) {
            $(this).removeClass('active');
            hide_stack();
        }
    }
);

$(".nav_trigger").click(function() {
    $(this).toggleClass('clicked');
    if ($(this).hasClass('clicked')) {
        show_full_stack();
    }
});


$(".menu_stack").hover(
    function() {

        if (!$(".nav_trigger").hasClass('clicked')) {
            $(".nav_trigger").click();

        }
    },
);


function show_mini_stack(params) {
    $('.menu_stack').css('display', 'flex')
}


function show_full_stack(params) {
    $('.menu_stack').css('display', 'flex')
    $('.menu_stack').addClass('opened');

}

function hide_stack(params) {
    $('.menu_stack').css('display', 'none').removeClass('opened');
    $('.nav_trigger').removeClass('clicked active')
}

$(document).click(
    function(event) {
        if (!$(event.target).hasClass("_alpha_nav")) {
            hide_stack();
        }
    }
);