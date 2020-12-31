$(document).on('change', '#select_host_name', function() {
    $('#selected_id').val($(this).val());
});


var table_exp = $("#exp_table").DataTable({
    processing: false,
    serverSide: true,
    "bLengthChange": false,
    "bFilter": false,
    "searching": true,
    initComplete: (settings, json) => {
        $("#exp_table_filter").appendTo(".gen_table_search_exp");
    },
    rowId: 'id',
    ajax: js_base_url + "/admin/json/get_host_exp?id=" + $('#selected_id').val(),
    columns: [{
            data: "exp_title",
            name: "exp_title",
            render: {
                display: function(data, type, row) {
                    return (
                        '<a href="' +
                        js_base_url +
                        "/experience?id=" +
                        row.id +
                        '">' + data + '</a> '
                    );
                },
            },
        },

        {
            data: "is_actived",
            name: "is_actived",
            render: {
                display: function(data, type, row) {
                    if (data == 0) return ('Initiate');
                    else if (data == 3) return ('Waiting Admin Approval');
                    else return "Actived";
                },
            },
        },

    ],
});