/*
    Listens for response, once response is OK
    adds class available to div#api_status otherwise remove class
*/

$(document).ready(function () {
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(url, function(data, responseStatus) {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
});
