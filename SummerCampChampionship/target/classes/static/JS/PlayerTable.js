function makeTable(container, data) {
    var table = $("<table/>").addClass('playerTable');

    // var headerRow = $("<tr/>");
    // headerRow.append($("<th/>").text("ID"));
    // headerRow.append($("<th/>").text("FirstName"));
    // headerRow.append($("<th/>").text("LastName"));
    // headerRow.append($("<th/>").text("Age"));
    // table.append(headerRow);
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
        url: "http://localhost:8080/player/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var playerTableContainer = $("#playerTableContainer");
            makeTable(playerTableContainer, data);
        },
        error: function (data) {
            alert('Error: ' + data);
        }
    });
});
