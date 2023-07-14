function makeTable(container, data) {
    var table = $("<table id='table'/>").addClass('teamTable');

    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("Type"));
    headerRow.append($("<th/>").text("Name"));
    //headerRow.append($("<th/>").text("GamesScore1"));
    //headerRow.append($("<th/>").text("GamesScore2"));
    table.append(headerRow);
    $.each(data, function (rowIndex, r) {

        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            if (colIndex == "team1Games") {
                if (r.team1Games.length > 0) {
                    row.append($("<td/>").text(r.team1Games[0].score1));
                }
            } else if (colIndex == "team2Games") {
                if (r.team2Games.length > 0) {
                    row.append($("<td/>").text(r.team2Games[0].score2));
                }
            } else {
                row.append($("<td/>").text(c));
            }

        });
        table.append(row);
    });
    return container.append(table);
}

function showForm() {
    var form = document.getElementById("addForm");
    form.style.display = "block";
}

function deleteForm() {
    var form = document.getElementById("deleteForm");
    form.style.display = "block";
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

    $('#submitAddFormButton').click(function(e) {
        e.preventDefault();
        var name =  $('#nameInput').val();
        var gametype = $('#typeInput').val();

        var data = {
            name: name,
            type: gametype
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/team/add',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(response) {
                console.log('Player added successfully');
                window.location.reload();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    $('#submitDeleteFormButton').click(function(e) {
        e.preventDefault();
        var id = $('#idDelete').val();
        id = Number(id);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/team/delete/id=' + id,
            success: function(response) {
                console.log('Player deleted successfully');
                window.location.reload();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    $('#submitDeleteAllFormButton').click(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/team/deleteAll',
            success: function(response) {
                console.log('Players deleted successfully');
                window.location.reload();
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
