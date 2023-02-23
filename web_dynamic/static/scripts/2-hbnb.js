/*
    Listens for response, once response is OK
    adds class available to div#api_status otherwise remove class
*/

$(document).ready(function () {
  $(':button').css('color', 'green');
    const idList = [];
    $('.amenity-list input:checkbox').change((e) => {
        const inputElement = $(e.target)
        if ( inputElement.prop('checked')) {
            idList.push(inputElement.data('id'));
            const h4Tag = $('DIV.amenities h4');
            h4Tag.append(inputElement.data('name')+ ' ');
        } else {
        const index = idList.indexOf(inputElement.data('id'));
        if (index > -1) {
        idList.splice(index, 1);
        }
        $('DIV.amenities h4').html($('DIV.amenities h4').html().replace(inputElement.data('name'), ''));
        }
    });

    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(url, function(data, responseStatus) {
        if (data.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
});
