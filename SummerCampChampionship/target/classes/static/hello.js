function makeTable(container, data) {
    var table = $("<table/>").addClass('playerTable');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

$(document).ready(function() {

    $.ajax(
        {
            url:" http://localhost:8080/player/all",
            type:"GET",
            dataType:"json",
            success: function(data) {
                var cityTable = makeTable($(document.body), data);
            },
            error: function(data) {
                alert('Error: '+data);
            }
        }
    )
});