$(document).ready(function() {
    $(document).on('mouseenter', function() {
        $('#mySidepanel').css('width', '250px'); // Adjust width as needed
    });

    $(document).on('mouseleave', function() {
        $('#mySidepanel').css('width', '0');
    });
});
