function makeTable(data) {
    var table = $('#playerTable').DataTable({
        data: data,
        columns: [
            {
                data: 'id',
                className: 'deletePlayer' // Add a class to the ID column cells
            },
            { data: 'firstName' },
            { data: 'lastName' },
            { data: 'age' },
            { data: 'team.name' }
        ]
    });

    $('#playerTable tbody').on('click', 'td.deletePlayer', function () { // Attach the click event to the ID column cells
        var data = table.row(this).data();
        deletePlayer(data.id);
    });
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
    if (addForm.style.opacity !== "0") {
        addForm.style.opacity = "0";
        addForm.style.height = "0";
    } else {
        addForm.style.opacity = "1";
        addForm.style.height = "auto";
    }
}

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/player/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            makeTable(data);
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
