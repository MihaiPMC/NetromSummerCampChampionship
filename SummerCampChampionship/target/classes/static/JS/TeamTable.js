function makeTable(container, data) {
    var table = $("<table id='table'/>").addClass('teamTable');

    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("Type"));
    headerRow.append($("<th/>").text("Name"));
    table.append(headerRow);
    $.each(data, function (rowIndex, r) {

        var row = $("<tr/>");

        var idCell = $("<td/>").text(r.id);
        idCell.click(function () {
            deleteTeam(r.id);
        });
        row.append(idCell);

        $.each(r, function (colIndex, c) {
            if (colIndex == "team1Games") {
                if (r.team1Games.length > 0) {
                    row.append($("<td/>").text(r.team1Games[0].score1));
                }
            } else if (colIndex == "team2Games") {
                if (r.team2Games.length > 0) {
                    row.append($("<td/>").text(r.team2Games[0].score2));
                }
            } else if(colIndex != "id") {
                row.append($("<td/>").text(c));
            }

        });
        table.append(row);
    });
    return container.append(table);
}

function deleteTeam(teamId) {
    var confirmation = confirm("Are you sure you want to delete this team?");
    if (confirmation) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/team/delete/id=" + teamId,
            success: function (response) {
                console.log("Player deleted successfully");
                window.location.reload();
            },
            error: function (error) {
                console.log("Error:", error);
            },
        });
    }
    else {
        console.log("User cancelled the deletion");
    }
}

function showForm() {
    var addForm = document.getElementById("addForm");

    // Toggle addForm visibility
    if (addForm.style.display === "block") {
        addForm.style.display = "none";
    }
    else {
        addForm.style.display = "block";
    }
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
        var confirmation = confirm("Are you sure you want to delete all teams?");
        if(confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/team/deleteAll',
                success: function (response) {
                    console.log('Players deleted successfully');
                    window.location.reload();
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        }else {
            console.log("User cancelled the deletion");
        }
    });
});
