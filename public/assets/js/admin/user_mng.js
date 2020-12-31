var table = $("#users-table").DataTable({
    processing: true,
    serverSide: false,
    "bLengthChange": false,
    "bFilter": false,
    "searching": true,
    rowId: 'id',
    ajax: js_base_url + "/admin/json/user",
    // "createdRow": function(row, data, dataIndex) {
    //     $(row).addClass('');
    // },
    initComplete: (settings, json) => {
        // $(".dataTables_length").appendTo(".gen_table_length");
        $(".dataTables_filter").appendTo(".gen_table_search");
    },

    rowId: "id",
    columns: [

        {
            data: "name",
            className: "user_detail",
        },
        {
            data: "email",
            name: "email",
            className: "user_detail",
        },
        {
            data: "role",
            name: "role",
            className: "user_detail",
            render: function(data, type, row) {
                console.log(data);
                switch (data) {
                    case 1:
                        return 'user'
                        break;
                    case 2:
                        return 'host'
                        break;
                    case 5:
                        return 'guest'
                        break;
                    default:
                        break;
                }

            },
        },
        {
            data: "user_booking_count",
            name: "user_booking_count",
        },
        {
            data: "id",
            className: "text-center ",
            render: {
                display: function(data, type, row) {
                    return (
                        '<a href="' + js_base_url + '/admin/user_booking_list?id=' + data + '" class=""><button class="btn_blue m-0 mx-auto w-100" style="height:20px" value="' +
                        row.id +
                        '">booking list</button></a>'
                    );
                },
            },
        },
        {
            data: "verified",
            className: "text-center ",
            render: {
                display: function(data, type, row) {
                    if (data != 9)
                        return (
                            '<button class="btn-danger m-0 mx-auto to_delete" style="height:20px;min-width:60px;" value="' +
                            row.id +
                            '">Del</button>'
                        );
                    else return "";
                },
            },
        },
    ],
});

$(document).on("click", ".user_detail", function() {
    $.ajax({
            url: "json/get_user_detail/",
            type: "get",
            data: {
                id: table.row(this).id(),
            },
            beforeSend: function() {
                $("#loader_modal").show();
            },
        })
        .done(function(data) {
            // console.log(data);
            $("#loader_modal").hide();
            $("#result_container").html(data.html);
            $("#host_detail").show();
        })
        .fail(function(jqXHR, ajaxOptions, thrownError) {
            $("#loader_modal").hide();
            custom_alert("server not responding...");
        });
});



$(document).on("click", ".verify ", function() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $.ajax({
        url: "users/do_verify_host",
        type: "POST",
        data: {
            host_id: this.value,
        },
        cache: false,
        datatype: "JSON",
        success: function(data) {
            custom_alert("verified");
            table.ajax.reload();
        },
        error: function(data) {},
    });
});


$(document).on("click", ".to_delete ", function() {
    var data_email = table.row($(this).closest('tr')).data().email;
    var data_id = table.row($(this).closest('tr')).data().id;
    $('#admin_confirmation_modal .content_confirmation').html('Are youre want to delete user where email : <br>' + data_email)
    $('#admin_confirmation_modal #value_confirmation').val(data_id)
    $('#admin_confirmation_modal').show();
});

$(document).on("click", ".confirm_to_delete ", function() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $.ajax({
        url: "users/do_delete_user",
        type: "POST",
        data: {
            host_id: $('#admin_confirmation_modal #value_confirmation').val(),
        },
        cache: false,
        datatype: "JSON",
        success: function(data) {
            custom_alert("user deleted");
            table.ajax.reload();
            $(".gen_modal").hide();
        },
        error: function(data) {},
    });
});