// $(".debug_icon").hide();
$(".debug_screen").hide();


$(".debug_icon").click(function() {

    $('.debug_screen').html(get_debug_msg());
    $(".debug_screen").toggle();

});

$(".debug_screen").click(function() {
    $(".debug_screen").toggle();
});


function get_debug_msg() {

    return '<div class="debug_msg">' +
        '<button class="fs" onclick="abc()" >FULL SCREEN</button>' + "<br><br>" +

        "date time = " + Date().toLocaleString() + "<br><br>" +

        "resolution.width  = " + screen.width * window.devicePixelRatio + "px<br>" +
        "resolution.height  = " + screen.height * window.devicePixelRatio + "px<br>" +
        "window.devicePixelRatio = " + window.devicePixelRatio + "px<br><br>" +


        "screen.width  = " + screen.width + "px<br>" +
        "screen.height  = " + screen.height + "px<br><br>" +


        "window.innerWidth = " + window.innerWidth + "px<br>" +

        "window.innerHeight = " + window.innerHeight + "px<br>" +
        "body Height = " + $("body").css("height") + "px<br>" +
        "content Height = " + $("#content").css("height") + "px<br>" +
        "slide Height = " + $(".gen_slide").height() + "px<br>" +



        '</div>';


}

function abc() {
    $('body').height("100vh");
    $('body').width("100vw");
    $('body').css("margin-top", "0");


}