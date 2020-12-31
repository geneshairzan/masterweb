var table_booking = $("#exp_booking_table").DataTable({
    processing: false,
    serverSide: false,
    "bLengthChange": false,
    "bFilter": false,
    "searching": true,
    initComplete: (settings, json) => {
        $(".dataTables_filter").appendTo(".gen_table_search");
    },

    ajax: "json/exp_booking",
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
            data: "schedule_date",
            name: "schedule_date",
        },
        {
            name: 'schedule_type',
            data: "schedule_date",
            render: function(data, type, row) {
                var x = new Date(data);
                var y = Date.now();
                if (x >= y) return 'Upcoming';
                else return 'Past';
            },
        },
        {
            data: "id",

            render: {
                display: function(data, type, row) {
                    if (row.payment_status) {
                        return (
                            ' <div class="row">' + '<a href="../exp_booking_review?id=' +
                            data +
                            '"><p class="text-center">Detail</p></a>' +
                            " - " +
                            '  <a href="resend_email_booking?id=' +
                            data +
                            '"><p class="text-center">resend notification email </p></a>' +
                            '</div>'
                        );
                    } else {
                        return (
                            ' <div class="row">' + '<a href="../exp_booking_review?id=' +
                            data +
                            '"><p class="text-center">Detail</p></a>' +
                            '</div>'
                        );
                    }
                },
            },
        },
    ],
});