// var page = 1;
// $(window).scroll(function() {
//     if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
//         page++;
//         loadMoreData(page);
//     }
// });

// function loadMoreData(page) {
//     $.ajax({
//             url: window.location + "&page=" + page,
//             type: "get",
//             beforeSend: function() {
//                 $("#loader_modal").show();

//             },
//         })
//         .done(function(data) {
//             if (data.html.length == 0) {
//                 // custom_alert("No more records found");
//                 $("#data_end").html("No more records found");
//                 return;
//             }
//             $("#loader_modal").hide();

//             $("#result_card_container").append(data.html);
//         })
//         .fail(function(jqXHR, ajaxOptions, thrownError) {
//             alert("server not responding...");
//         });
// }