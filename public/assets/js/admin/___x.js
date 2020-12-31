var table = $('#users-table').DataTable({
    processing: true,
    serverSide: true,
    ajax: 'users/json',
    "createdRow": function(row, data, dataIndex) {
        $(row).addClass('');
    },
    rowId: 'id',
    columns: [{
            data: 'email',
            name: 'email'
        },
        {

            data: 'role',
            render: {

                display: function(data, type, row) {
                    // console.log(row);
                    if (data == 1) return "user";
                    else if (data == 2) return "host";
                    else if (data == 3) return "admin";
                    else return data;

                },
            },
        },
        {
            data: 'verified',
            className: 'text-center',
            render: {

                display: function(data, type, row) {
                    // console.log(row.role);
                    if (row.role == 2 & data == 1) return ' <button style="height:20px; min-width:75px" class="gen_btn btn_blue m-0 verify" value="' + row.id + '">verify</button>';
                    else if (data == 2) return 'verified';
                    else return '';


                },
            },
        },
        {
            data: 'verified',
            className: 'text-center user_detail',
            render: {

                display: function(data, type, row) {
                    return '<button class="btn-danger m-0 mx-auto to_delete" style="height:20px;min-width:60px;" value="' + row.id + '">Del</button>';
                },
            },
        }
    ]
});



table.on('draw', function() {

    $('tr').click(function() {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: "users/do_verify_host",
            type: "POST",
            data: {
                host_id: this.value,
            },
            cache: false,
            datatype: 'JSON',
            success: function(data) {
                alert("verified");
                table.ajax.reload();
                // console.log(data);

            },
            error: function(data) {
                // console.log(data);

            }
        });

    });
});



$(document).on('click', '.user_detail', function() {
    // var id = table.row(this).id();
    // alert('Clicked row id ' + id);

    $.ajax({
            url: 'json/get_user_detail/',
            type: "get",
            data: {
                id: table.row(this).id(),
            },
            beforeSend: function() {
                $("#loader_modal").show();
            }
        })
        .done(function(data) {
            // console.log(data);

            $("#loader_modal").hide();
            $("#result_container").append(data.html);
            $('#host_detail').show();
        })
        .fail(function(jqXHR, ajaxOptions, thrownError) {
            $("#loader_modal").hide();

            alert("server not responding...");
        });

});

$(document).on('click', '.gen_destroy ', function() {
    $('#' + this.value).remove();
});

$(document).on('click', '.verify ', function() {

});

$(document).on('click', '.to_delete ', function() {
    alert(this.value);
});