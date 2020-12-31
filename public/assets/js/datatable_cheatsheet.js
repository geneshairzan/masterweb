var tr = $(this).closest('tr');
// var tr = $(this).closest('tr').attr('id');
var row = table.row(tr);

var rowData = row.data();
var data = row.data().email;

// console.log(tr);
console.log(data);
// console.log(id);