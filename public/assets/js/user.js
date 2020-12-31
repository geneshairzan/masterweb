$(document).on("click", ".gen_submenu_node", function() {
    $(".node_container").hide();
});

$(document).on("click", ".upcoming_node", function() {
    $(".upcoming_container").show();
    $(".page_title").html("Upcomming Experience");
});

$(document).on("click", ".past_node", function() {
    $(".past_container").show();
    $(".page_title").html("Past Experience");
});