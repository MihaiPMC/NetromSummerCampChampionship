function makeTable(container, data) {
    var table = $("<table/>").addClass('gameTable');

    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("Team1"));
    headerRow.append($("<th/>").text("Team2"));
    headerRow.append($("<th/>").text("ScoreTeam1"));
    headerRow.append($("<th/>").text("ScoreTeam2"));
    headerRow.append($("<th/>").text("Type"));
    table.append(headerRow);
    $.each(data, function (rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            if (colIndex == "team1") {
                row.append($("<td/>").text(r.team1.name));
            }
            else if (colIndex == "team2") {
                row.append($("<td/>").text(r.team2.name));
            }
            else {
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

    $('#submitAddFormButton').click(function (e) {
        e.preventDefault();
        var team1 = $('#firstTeamInput').val();
        var team2 = $('#secondTeamInput').val();
        var scoreTeam1 = $('#score1Input').val();
        var scoreTeam2 = $('#score2Input').val();
        var gameType = $('#gameTypeInput').val();
        scoreTeam1 = Number(scoreTeam1);
        scoreTeam2 = Number(scoreTeam2);

        var data = {
            team1:{
                name: team1
            },
            team2:{
                name: team2
            },
            score1: scoreTeam1,
            score2: scoreTeam2,
            type: gameType
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/game/add',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                console.log('Game added successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        })
    });

    $('#submitDeleteAllFormButton').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/game/deleteAll',
            success: function (response) {
                console.log('Players deleted successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    $('#submitDeleteFormButton').click(function (e) {
        e.preventDefault();
        var id = $('#idDelete').val();
        id = Number(id);
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/game/delete/id=' + id,
            success: function (response) {
                console.log('Game deleted successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });


});
