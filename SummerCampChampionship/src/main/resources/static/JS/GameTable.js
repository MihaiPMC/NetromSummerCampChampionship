function makeTable(data) {
    var table = $('#gameTable').DataTable({
        data: data,
        dom: '<f<t><<"#howMany"l><"#pagination.pagination-padding"p>>>',
        columns: [
            {
                data: 'id',
                className: 'deleteGame', // Add a class to the ID column cells
                render: function (data, type, row) {
                    if (type === 'display') {
                        return '<span class="data">' + data + '</span><input class="editField" type="text" value="' + data + '" style="display:none">';
                    }
                    return data;
                }
            },
            {data: 'team1.name', render: renderEditableField},
            {data: 'team2.name', render: renderEditableField},
            {data: 'score1', render: renderEditableField},
            {data: 'score2', render: renderEditableField},
            {data: 'type', render: renderEditableField},
            {data: 'date', render: renderEditableField},
            {
                data: null,
                defaultContent: '<button class="saveChanges" style="display:none">Save</button>',
                orderable: false
            }
        ]
    });

    function renderEditableField(data, type, row) {
        if (type === 'display') {
            return '<span class="data">' + data + '</span><input class="editField" type="text" value="' + data + '" style="display:none">';
        }
        return data;
    }

    $('#gameTable tbody').on('dblclick', 'tr', function () {
        // Collapse any other editable rows
        $('#gameTable tbody tr').not(this).each(function () {
            $(this).find('.data, .editField, .saveChanges').hide();
            $(this).find('.data').show();
        });

        // Expand current row except the first td (ID)
        $(this).find('td:not(:first-child)').find('.data, .editField, .saveChanges').toggle();
    });

    $('#gameTable tbody').on('click', '.saveChanges', function () {
        // Save changes
        var row = $(this).closest('tr');
        var id = row.find('td:first-child .editField').val();
        var team1 = row.find('td:nth-child(2) .editField').val();
        var team2 = row.find('td:nth-child(3) .editField').val();
        var scoreTeam1 = row.find('td:nth-child(4) .editField').val();
        var scoreTeam2 = row.find('td:nth-child(5) .editField').val();
        var teamType = row.find('td:nth-child(6) .editField').val();
        var date = row.find('td:nth-child(7) .editField').val();
        id = parseInt(id);

        // Validation
        var errorMessage = "";

        if(!team1 || team1.length === 0)
        {
            errorMessage += "Team1 name cannot be empty\n";
        }
        if(!team2 || team2.length === 0)
        {
            errorMessage += "Team2 name cannot be empty\n";
        }
        if(!scoreTeam1 || scoreTeam1.length === 0)
        {
            errorMessage += "Score1 cannot be empty\n";
        }
        if(!scoreTeam2 || scoreTeam2.length === 0)
        {
            errorMessage += "Score2 cannot be empty\n";
        }
        if(!teamType || teamType.length === 0)
        {
            errorMessage += "Type cannot be empty\n";
        }
        if(!date || date.length === 0)
        {
            errorMessage += "Date cannot be empty\n";
        }

        if(isNaN(scoreTeam1))
        {
            errorMessage += "Score1 must be a number\n";
        }
        if(isNaN(scoreTeam2))
        {
            errorMessage += "Score2 must be a number\n";
        }

        if(team1.length < 3)
        {
            errorMessage += "Team1 name must be at least 3 characters long\n";
        }

        if(team2.length < 3)
        {
            errorMessage += "Team2 name must be at least 3 characters long\n";
        }

        if(errorMessage.length !== 0)
        {
            alert(errorMessage);
            return;
        }



        var data = {
            id: id,
            team1:{
                name: team1
            },
            team2:{
                name: team2
            },
            score1: scoreTeam1,
            score2: scoreTeam2,
            type: teamType,
            date: date
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/game/update',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Game updated successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
                alert(error.responseText);
                window.location.reload();
            }
        });

        row.find('.data, .editField, .saveChanges').toggle();
    });


    $('#gameTable tbody').on('click', 'td.deleteGame', function () { // Attach the click event to the ID column cells
        var data = table.row(this).data();
        deleteGame(data.id);
    });
}

function deleteGame(gameId) {
    var confirmation = confirm("Are you sure you want to delete this game?");
    if (confirmation) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/game/delete/id=" + gameId,
            success: function (response) {
                console.log("Game deleted successfully");
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
    if (addForm.style.display !== "block") {
        addForm.style.display = "block";
        addForm.style.height = "auto";
    }
    else {
        addForm.style.display = "none";
        addForm.style.height = "auto";
    }
}

$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/game/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            makeTable(data);
        },
        error: function (data) {
            alert('Error: ' + data);
        }
    });

    $('#submitAddFormButton').click(function (e) {
        e.preventDefault();

        var team1 = $('#team1').val();
        var team2 = $('#team2').val();
        var score1 = $('#scoreTeam1').val();
        var score2 = $('#scoreTeam2').val();
        var gameType = $('#type').val();
        var date = $('#date').val();

        var data = {
            "team1": {
                "name": team1
            },
            "team2": {
                "name": team2
            },
            "score1": score1,
            "score2": score2,
            "type": gameType,
            "date": date
        };

        // Validation
        var errorMessage = "";

        if(!team1 || team1.length === 0)
        {
            errorMessage += "Team1 name cannot be empty\n";
        }
        if(!team2 || team2.length === 0)
        {
            errorMessage += "Team2 name cannot be empty\n";
        }
        if(!scoreTeam1 || scoreTeam1.length === 0)
        {
            errorMessage += "Score1 cannot be empty\n";
        }
        if(!scoreTeam2 || scoreTeam2.length === 0)
        {
            errorMessage += "Score2 cannot be empty\n";
        }
        if(!gameType || gameType.length === 0)
        {
            errorMessage += "Type cannot be empty\n";
        }
        if(!date || date.length === 0)
        {
            errorMessage += "Date cannot be empty\n";
        }

        if(isNaN(score1))
        {
            errorMessage += "Score1 must be a number\n";
        }
        if(isNaN(score2))
        {
            errorMessage += "Score2 must be a number\n";
        }

        if(team1.length < 3)
        {
            errorMessage += "Team1 name must be at least 3 characters long\n";
        }

        if(team2.length < 3)
        {
            errorMessage += "Team2 name must be at least 3 characters long\n";
        }

        if(errorMessage.length !== 0)
        {
            alert(errorMessage);
            return;
        }


        // Send the request if validation passed
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/game/add',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Game added successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
                alert(error.responseText);
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

    $('#submitDeleteAllFormButton').click(function (e) {
        e.preventDefault();
        var confirmation = confirm("Are you sure you want to delete all games?");
        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/game/deleteAll',
                success: function (response) {
                    console.log('Game deleted successfully');
                    window.location.reload();
                },
                error: function (error) {
                    console.log('Error:', error);
                }
            });
        }
        else {
            console.log("User cancelled the deletion");
        }
    });

});
