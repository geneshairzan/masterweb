if (window.innerWidth < 420) {
    // $("body").css("width", "100vw");
    // $("body").css("height", window.innerHeight);

} else {
    // $("body").css("margin-top", "100px");
}

$(window).resize(function() {
    if (window.innerWidth < 420) {
        // $("body").css("width", "100vw");
        // $("body").css("height", window.innerHeight);
        // $("body").css("margin-top", "unset");
    } else {
        // $("body").css("width", "320px");
        // $("body").css("height", "568px");
        // $("body").css("margin-top", "100px");
    }
});