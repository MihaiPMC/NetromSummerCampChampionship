function makeTable(container, data) {
    var table = $("<table/>").addClass('playerTable');
    var headerRow = $("<tr/>");
    headerRow.append($("<th/>").text("ID"));
    headerRow.append($("<th/>").text("FirstName"));
    headerRow.append($("<th/>").text("LastName"));
    headerRow.append($("<th/>").text("Age"));
    headerRow.append($("<th/>").text("Team"));
    table.append(headerRow);
    $.each(data, function (rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function (colIndex, c) {
            if(colIndex == "team")
            {
                row.append($("<td/>").text(r.team.name));
            }

            else{
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
    });
});
