var total_star = 0;
var table_exp = $("#exp-table").DataTable({
    processing: false,
    serverSide: false,
    "bLengthChange": false,
    "bFilter": false,
    "searching": true,
    initComplete: (settings, json) => {
        $(".dataTables_filter").appendTo(".gen_table_search");
    },

    rowId: 'id',
    ajax: "exp/json",
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
            data: "user.name",
            name: "user.name",
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
        {
            data: "is_star",
            render: {
                display: function(data, type, row) {
                    if (data == 0)
                        return (
                            ' <button class="btn_blue set_star m-0" style="height:30px;" value="' +
                            row.id +
                            '">Set Star</button>'
                        );
                    else {
                        if (data == 1) total_star++;
                        // console.log(total_star);
                        return (
                            ' <button class="set_star m-1 btn-success" style="height:30px; min-width: 90px;" value="' +
                            row.id +
                            '">Up Star</button><button class="down_star m-1 btn-danger" style="height:30px;min-width: 90px;" value="' +
                            row.id +
                            '">Down Star</button>'
                        );
                    }
                },
            },
        },
        {
            data: "is_star",
            render: {
                display: function(data, type, row) {
                    return (
                        '<a href="' +
                        js_base_url +
                        "/host/exp_edit?id=" +
                        row.id +
                        '"><button class="btn_blue m-0" style="height:30px; min-width:60px">edit</button></a> '
                    );
                },
            },
        },

        {
            data: "is_actived",
            render: {
                display: function(data, type, row) {
                    if (data == 2)
                        return (
                            '<a href="' +
                            js_base_url +
                            "/admin/do_actived?v=1&id=" +
                            row.id +
                            '"><button class="btn_blue m-0" style="height:30px; min-width:120px">Set Actived</button></a> '
                        );
                    else if (data == 1)
                        return (
                            '<a href="' +
                            js_base_url +
                            "/admin/do_actived?v=0&id=" +
                            row.id +
                            '"><button class="btn-danger m-0" style="height:30px; min-width:120px">Take Down</button></a> '
                        );
                    else return "";
                },
            },
        },

        {
            data: "is_actived",
            render: {
                display: function(data, type, row) {
                    return (
                        ' <button class="btn-danger m-0 do_del_exp" style="height:30px; min-width:120px">Delete</button>'
                    );
                },
            },
        },
    ],
});

$(document).on("click", ".set_star", function() {
    if (total_star % 5 == 0) {
        custom_alert("Star Experience reached max. number");
    } else {
        $.ajax({
            url: "exp/set_star",
            type: "GET",
            data: {
                id: this.value,
            },
            cache: false,
            datatype: "JSON",
            success: function(data) {
                custom_alert("Status Changed");
                table.ajax.reload();
                total_star = 0;
            },
            error: function(data) {},
        });
    }
});

$(document).on("click", ".down_star", function() {
    $.ajax({
        url: "exp/down_star",
        type: "GET",
        data: {
            id: this.value,
        },
        cache: false,
        datatype: "JSON",
        success: function(data) {
            custom_alert("Status Changed");
            table.ajax.reload();
            total_star = 0;
        },
        error: function(data) {},
    });
});

$(document).on("click", ".do_del_exp", function() {

    // var id = ;
    // alert('Clicked row id ' + id);

    var data_email = table.row($(this).closest('tr')).data().exp_title;
    var data_id = table.row($(this).closest('tr')).data().id;
    $('#admin_confirmation_modal .content_confirmation').html('Are youre want to delete exp where title : <br>' + data_email)
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
        url: js_base_url + "/admin/do_exp_delete",
        type: "POST",
        data: {
            id: $('#admin_confirmation_modal #value_confirmation').val(),
        },
        cache: false,
        datatype: "JSON",
        success: function(data) {
            custom_alert("Experience deleted");
            table.ajax.reload();
            $(".gen_modal").hide();
        },
        error: function(data) {},
    });
});