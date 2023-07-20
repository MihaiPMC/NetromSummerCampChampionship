function makeTable(data) {
    var table = $('#playerTable').DataTable({
        data: data,
        dom: '<f<t><<"#howMany"l><"#pagination.pagination-padding"p>>>',
        columns: [
            {
                data: 'id',
                className: 'deletePlayer', // Add a class to the ID column cells
                render: function (data, type, row) {
                    if (type === 'display') {
                        return '<span class="data">' + data + '</span><input class="editField" type="text" value="' + data + '" style="display:none">';
                    }
                    return data;
                }
            },
            {data: 'firstName', render: renderEditableField},
            {data: 'lastName', render: renderEditableField},
            {data: 'age', render: renderEditableField},
            {data: 'type', render: renderEditableField},
            {data: 'team.name', render: renderEditableField},
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

    $('#playerTable tbody').on('dblclick', 'tr', function () {
        // Collapse any other editable rows
        $('#playerTable tbody tr').not(this).each(function () {
            $(this).find('.data, .editField, .saveChanges').hide();
            $(this).find('.data').show();
        });

        // Expand current row except the first td (ID)
        $(this).find('td:not(:first-child)').find('.data, .editField, .saveChanges').toggle();
    });

    $('#playerTable tbody').on('click', '.saveChanges', function () {
        // Save changes
        var row = $(this).closest('tr');
        var id = row.find('td:first-child .editField').val();
        var firstName = row.find('td:nth-child(2) .editField').val();
        var lastName = row.find('td:nth-child(3) .editField').val();
        var age = row.find('td:nth-child(4) .editField').val();
        var teamName = row.find('td:nth-child(6) .editField').val();
        var teamType = row.find('td:nth-child(5) .editField').val();
        id = parseInt(id);
        age = parseInt(age);

        // Validation
        var errorMessage = "";

        if (!firstName || firstName.length === 0) {
            errorMessage += "First Name can't be empty\n";
        }

        if(firstName.length <3)
        {
            errorMessage += "First Name must be at least 3 characters\n";
        }

        if (!lastName || lastName.length === 0) {
            errorMessage += "Last Name can't be empty\n";
        }

        if(lastName.length <3)
        {
            errorMessage += "Last Name must be at least 3 characters\n";
        }

        if (!age || age.length === 0 || isNaN(age)) {
            errorMessage += "Age must be a valid number\n";
        }

        if(age < 10)
        {
            errorMessage += "Player must be older than 10\n";
        }

        if(age > 100)
        {
            errorMessage += "Player must be younger than 100\n";
        }

        if (!teamName || teamName.length === 0) {
            errorMessage += "Team Name can't be empty\n";
        }

        if (!teamType || teamType.length === 0) {
            errorMessage += "Team Type can't be empty\n";
        }

        if (errorMessage.length > 0) {
            alert(errorMessage);
            return;
        }

        var data = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            team: {
                name: teamName,
                type: teamType
            }
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/player/update',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Player updated successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
                alert(error.responseText)
                window.location.reload();
            }
        });

        row.find('.data, .editField, .saveChanges').toggle();
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

    $('#submitAddFormButton').click(function (e) {
        e.preventDefault();

        var firstName = $('#firstNameInput').val();
        var lastName = $('#lastNameInput').val();
        var age = $('#ageInput').val();
        var teamNameInput = $('#teamNameInput').val();
        var teamType = $('#typeInput').val();

        var data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            team: {
                name: teamNameInput,
                type: teamType
            }
        };

        // Validation
        var errorMessage = "";

        if (!firstName || firstName.length === 0) {
            errorMessage += "First Name can't be empty\n";
        }

        if(firstName.length <3)
        {
            errorMessage += "First Name must be at least 3 characters\n";
        }

        if (!lastName || lastName.length === 0) {
            errorMessage += "Last Name can't be empty\n";
        }

        if(lastName.length <3)
        {
            errorMessage += "Last Name must be at least 3 characters\n";
        }

        if (!age || age.length === 0 || isNaN(age)) {
            errorMessage += "Age must be a valid number\n";
        }

        if(age < 10)
        {
            errorMessage += "Player must be older that 10\n";
        }

        if(age > 100)
        {
            errorMessage += "Player must be younger that 100\n";
        }

        if (!teamNameInput || teamNameInput.length === 0) {
            errorMessage += "Team Name can't be empty\n";
        }

        if (!teamType || teamType.length === 0) {
            errorMessage += "Team Type can't be empty\n";
        }

        if (errorMessage.length > 0) {
            alert(errorMessage);
            return;
        }

        // Send the request if validation passed
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/player/add',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Player added successfully');
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
            url: 'http://localhost:8080/player/delete/id=' + id,
            success: function (response) {
                console.log('Player deleted successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    $('#submitDeleteAllFormButton').click(function (e) {
        e.preventDefault();
        var confirmation = confirm("Are you sure you want to delete all players?");
        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/player/deleteAll',
                success: function (response) {
                    console.log('Players deleted successfully');
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
