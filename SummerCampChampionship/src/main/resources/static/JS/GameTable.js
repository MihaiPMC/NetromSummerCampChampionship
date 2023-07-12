function makeTable(container, data) {
    var table = $("<table/>").addClass('gameTable');

    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("ScoreTeam1"));
    headerRow.append($("<th/>").text("ScoreTeam2"));
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
        url: "http://localhost:8080/game/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var gameTableContainer = $("#gameTableContainer");
            makeTable(gameTableContainer, data);
        },
        error: function (data) {
            alert('Error: ' + data);
        }
    });
});
