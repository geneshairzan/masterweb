let sub_menu1_page = 1;
let sub_menu2_page = 2;
let sub_menu3_page = 3;

let sub_menu = 1;

$(document).ready(function() {
    //
});

$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() / 2 * sub_menu1_pag) {

        if (sub_menu == 1) {
            console.log('coontent loading');
            sub_menu1_page++;
            $(".ajax-load").show();
            loadMoreData(sub_menu1_page);
        }
    }
});

function loadMoreData(page) {
    $.ajax({
            url: window.location + "?page=" + page,
            type: "get",
            beforeSend: function() {
                $(".ajax-load").show();
            },
        })
        .done(function(data) {
            if (data.html.length == 0) {
                custom_alert("No more records found");
                return;
            }
            $(".ajax-load").hide();
            $(".created_container").append(data.html);
        })
        .fail(function(jqXHR, ajaxOptions, thrownError) {
            alert("server not responding...");
        });
}

$(".gen_submenu_node").on("click", function() {
    $(".node_container ").hide();
});

$(".created_node").on("click", function() {
    $(".created_container").show();
    sub_menu = 1;
});

$(".booked_node").on("click", function() {
    $(".booked_container").show();
    sub_menu = 2;
});

$(".history_node").on("click", function() {
    $(".history_container").show();
    sub_menu = 3;
});

// $(document).on("click", ".change_status", function() {
//     $.ajaxSetup({
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//         },
//     });

//     $.ajax({
//         url: "../exp/set_status",
//         type: "POST",
//         data: {
//             exp_id: this.value,
//         },
//         cache: false,
//         datatype: "JSON",
//         success: function(data) {
//             custom_alert("Status Changed");
//             $("#card_container").html("");
//             loadMoreData(page);
//         },
//         error: function(data) {},
//     });
// });