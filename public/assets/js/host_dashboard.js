var table = $('#exp_table').DataTable({
    processing: true,
    serverSide: true,

    ajax: "host/get_booking",

    columns: [{
            data: 'exp.exp_title',
            name: 'id',

        },
        {
            data: 'schedule_date',
            name: 'schedule_date'

        },
        {
            data: 'count',
            // name: 'count',

            render: {

                display: function(data, type, row) {
                    console.log(row);

                    return data + " / " + row.exp.max_travelers;


                },
            },

        },

    ]
});