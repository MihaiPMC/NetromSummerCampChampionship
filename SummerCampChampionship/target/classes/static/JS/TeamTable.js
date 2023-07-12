function makeTable(container, data) {
    var table = $("<table/>").addClass('playerTable');

    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("Type"));
    headerRow.append($("<th/>").text("Name"));
    headerRow.append($("<th/>").text("Games"));
    table.append(headerRow);
    $.each(data, function (rowIndex, r) {

        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            row.append($("<td/>").text(c));
        });
        table.append(row);
    });
    return container.append(table);
}

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/team/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var teamTableContainer = $("#teamTableContainer");
            makeTable(teamTableContainer, data);
        },
        error: function (data) {
            alert('Error: ' + data);
        }
    });
});
