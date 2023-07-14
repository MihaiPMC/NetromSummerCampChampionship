function makeTable(container, data) {
    var table = $("<table/>").addClass("playerTable");
    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("FirstName"));
    headerRow.append($("<th/>").text("LastName"));
    headerRow.append($("<th/>").text("Age"));
    headerRow.append($("<th/>").text("Team"));
    table.append(headerRow);

    $.each(data, function (rowIndex, r) {
        var row = $("<tr/>");

        var idCell = $("<td/>").text(r.id);
        idCell.click(function () {
            deletePlayer(r.id);
        });
        row.append(idCell);

        $.each(r, function (colIndex, c) {
            if (colIndex == "team") {
                row.append($("<td/>").text(r.team.name));
            } else if (colIndex != "id") {
                row.append($("<td/>").text(c));
            }
        });

        table.append(row);
    });

    return container.append(table);
}

function deletePlayer(playerId) {
    var confirmation = confirm("Are you sure you want to delete this player?");
    if (confirmation) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/player/delete/id=" + playerId,
            success: function (response) {
                console.log("Player deleted successfully");
                window.location.reload();
            },
            error: function (error) {
                console.log("Error:", error);
            },
        });
    } else {
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

    $('#submitAddFormButton').click(function(e) {
        e.preventDefault();
        var firstName = $('#firstNameInput').val();
        var lastName = $('#lastNameInput').val();
        var age = $('#ageInput').val();
        var teamId = $('#idInput').val();
        teamId = Number(teamId);
        var data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            team: {
                id: teamId
            }
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/player/add',
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
            url: 'http://localhost:8080/player/delete/id=' + id,
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
        var confirmation = confirm("Are you sure you want to delete all players?");
        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/player/deleteAll',
                success: function(response) {
                    console.log('Players deleted successfully');
                    window.location.reload();
                },
                error: function(error) {
                    console.log('Error:', error);
                }
            });
        } else {
            console.log("User cancelled the deletion");
        }
    });

});
