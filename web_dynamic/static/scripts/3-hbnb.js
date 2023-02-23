/*
    Listens for response, once response is OK
    adds class available to div#api_status otherwise remove class
*/

$(document).ready(function () {
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

    // fetch data for place_search endpoint
    function templatePrint (data) {
      data.forEach((place) =>{
        $('section.places').append(
          `<article>
	    <div class="title_box">
	    <h2>${place.name}</h2>
	    <div class="price_by_night">$${place.price_by_night}</div>
	    </div>
	    <div class="information">
	    <div class="max_guest">${place.max_guest} Guest${
	                            place.max_guest !== 1 ? "s" : ""}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${
                                place.number_rooms !== 1 ? "s" : ""}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                                place.number_bathrooms !== 1 ? "s" : ""}</div>
	  </div>
          <div class="description">
	    ${place.description}
          </div>
	        </article>`
        );
	console.log(place.description);
      });
    }
    // $.post(url, [data], [callback], [type]);
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: '{}',
        contentType: 'application/json',
        success: (data) => { templatePrint(data); },
        dataType: 'json'
    });
});
