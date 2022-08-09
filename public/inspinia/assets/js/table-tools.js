var $table = $('#table')
var $remove = $('#remove')
var $download = $('#download')
var selections = []

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    })
}

function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.id, selections) !== -1
    })
    return res
}
$table.on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table',
    function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length),
        $download.prop('disabled', !$table.bootstrapTable('getSelections').length)
        selections = getIdSelections()
    })

$remove.click(function () {
    swal({
        html: true,
        customClass:"modifiedSweetAlerts",
        title: "<span class='text-strong'></span>Are you sure?",
        text: "<strong class='text-strong'>These Row</strong> will be disappear from List.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#eb1c24",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, 
        function (isConfirm) {
            if (isConfirm) {
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids,
                })
            }
        });
    $remove.prop('disabled', true)
})

$download.click(function () {
    var ads = getIdSelections();
    $table.bootstrapTable('download', {
        field: 'id',
        values: ads,
    })
    $download.prop('disabled', true)
})

function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
}