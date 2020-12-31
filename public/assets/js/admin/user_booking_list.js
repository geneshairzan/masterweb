$(document).on('change', '#select_user_name', function() {
    $('#selected_id').val($(this).val());
});
var table_booking = $("#booking_table").DataTable({
    processing: false,
    serverSide: false,
    "bLengthChange": false,
    "bFilter": false,
    "searching": true,
    initComplete: (settings, json) => {
        $("#booking_table_filter").appendTo(".gen_table_search_booking");
    },
    rowId: 'id',
    ajax: js_base_url + "/admin/json/get_user_booking?id=" + $('#selected_id').val(),
    columns: [{
            data: "exp.exp_title",
            name: "exp.exp_title",
        },
        {
            data: "host.name",
            name: "host.name",
        },
        {
            data: "user.name",
            name: "user.name",
        },
        {
            data: 'schedule_date',
            name: 'schedule_date',
            render: function(data, type, row) {

                var x = new Date(data);
                var y = Date.now();

                if (x >= y) {
                    data = 'Upcoming'
                } else {
                    data = 'Past'
                };

                return data;

            },
        },
        {
            data: "id",
            render: {
                display: function(data, type, row) {
                    return (
                        '  <a href="../exp_booking_review?id=' +
                        data +
                        '"><p class="text-center">Detail</p></a>'
                    );
                },
            },
        },
    ],
});