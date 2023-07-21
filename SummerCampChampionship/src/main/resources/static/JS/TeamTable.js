function makeTable(data) {
    var table = $('#teamTable').DataTable({
        data: data,
        dom: '<f<t><<"#howMany"l><"#pagination.pagination-padding"p>>>',
        columns: [
            {
                data: 'id',
                className: 'deleteTeam',
                render: function (data, type, row) {
                    if (type === 'display') {
                        return '<span class="data">' + data + '</span><input class="editField" type="text" value="' + data + '" style="display:none">';
                    }
                    return data;
                }
            },
            {data: 'type', render: renderEditableField},
            {data: 'name', render: renderEditableField},
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

    $('#teamTable tbody').on('dblclick', 'tr', function () {
        $('#teamTable tbody tr').not(this).each(function () {
            $(this).find('.data, .editField, .saveChanges').hide();
            $(this).find('.data').show();
        });

        $(this).find('td:not(:first-child)').find('.data, .editField, .saveChanges').toggle();
    });

    $('#teamTable tbody').on('click', '.saveChanges', function () {
        var row = $(this).closest('tr');
        var id = row.find('td:first-child .editField').val();
        var teamType = row.find('td:nth-child(2) .editField').val();
        var name = row.find('td:nth-child(3) .editField').val();
        id = parseInt(id);

        var errorMessage = "";

        if (!name || name.length === 0) {
            errorMessage += "Name cannot be empty\n";
        }

        if (!teamType || teamType.length === 0) {
            errorMessage += "Type cannot be empty\n";
        }

        if (name.length < 3) {
            errorMessage += "Name must be at least 3 characters long\n";
        }

        if (teamType.length < 3) {
            errorMessage += "Type must be at least 3 characters long\n";
        }

        if (errorMessage.length !== 0) {
            alert(errorMessage);
            return;
        }

        var data = {
            id: id,
            type: teamType,
            name: name
        }

        $.ajax({
            type: 'POST',
            url: "http://localhost:8080/team/update",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Team updated successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
                alert(error.responseText);
                window.location.reload();
            }
        })

        row.find('.data, .editField, .saveChanges').toggle();
    });

    $('#teamTable tbody').on('click', 'td.deleteTeam', function () {
        var data = table.row(this).data();
        deleteTeam(data.id);
    });
}

function deleteTeam(teamId) {
    var confirmation = confirm("Are you sure you want to delete this team?");
    if (confirmation) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/team/delete/id=" + teamId,
            success: function (response) {
                console.log("Team deleted successfully");
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
        url: "http://localhost:8080/team/all",
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
        var name = $('#nameInput').val();
        var teamType = $('#typeInput').val();

        var data = {
            name: name,
            type: teamType
        };

        var errorMessage = "";

        if (!name || name.length === 0) {
            errorMessage += "Name cannot be empty\n";
        }

        if (!teamType || teamType.length === 0) {
            errorMessage += "Type cannot be empty\n";
        }

        if (name.length < 3) {
            errorMessage += "Name must be at least 3 characters long\n";
        }

        if (teamType.length < 3) {
            errorMessage += "Type must be at least 3 characters long\n";
        }

        if (errorMessage.length !== 0) {
            alert(errorMessage);
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/team/add',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                console.log('Team added successfully');
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
            url: 'http://localhost:8080/team/delete/id=' + id,
            success: function (response) {
                console.log('Team deleted successfully');
                window.location.reload();
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    });

    $('#submitDeleteAllFormButton').click(function (e) {
        e.preventDefault();
        var confirmation = confirm("Are you sure you want to delete all teams?");
        if (confirmation) {
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/team/deleteAll',
                success: function (response) {
                    console.log('Teams deleted successfully');
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
