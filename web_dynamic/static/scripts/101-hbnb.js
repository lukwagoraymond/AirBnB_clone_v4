/*
    Listens for response, once response is OK
    adds class available to div#api_status otherwise remove class
*/

$(document).ready(function () {
  const idList = [];
  const cityList = [];
  const stateList = [];
  $('.amenity-list input:checkbox').change((e) => {
    const inputElement = $(e.target);
    if (inputElement.prop('checked')) {
      idList.push(inputElement.data('id'));
      const h4Tag = $('DIV.amenities h4');
      h4Tag.append(inputElement.data('name') + ' ');
    } else {
      const index = idList.indexOf(inputElement.data('id'));
      if (index > -1) {
        idList.splice(index, 1);
      }
      const h4Tag = $('DIV.amenities h4');
      h4Tag.html(h4Tag.html().replace(inputElement.data('name'), ''));
    }
  });


  $('li.states input:checkbox').change((e) => {
    const inputElement = $(e.target);
    if (inputElement.prop('checked')) {
      // differentiate betwn state and city
      if (inputElement.prop('id') === 'state-alone'){
	stateList.push(inputElement.data('id'));
      } else {
	cityList.push(inputElement.data('id'));
      }
      const h4Tag = $('DIV.locations h4');
      h4Tag.append(inputElement.data('name') + ' ');
    } else {
      if (inputElement.prop('id') === 'state-alone') {
	const index = stateList.indexOf(inputElement.data('id'));
	if (index > -1) {
	  stateList.splice(index, 1);
	}
      }
      else {
	const index = cityList.indexOf(inputElement.data('id'));
	if (index > -1) {
	  cityList.splice(index, 1);
	}
      }
      const h4Tag = $('DIV.locations h4');
      h4Tag.html(h4Tag.html().replace(inputElement.data('name'), ''));
    }
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, responseStatus) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  // fetch data for place_search endpoint
  function templatePrint (data) {
    data.forEach((place) => {
      $('section.places').append(
`<article>
<div class="title_box">
<h2>${place.name}</h2>
<div class="price_by_night">$${place.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${place.max_guest} Guest${
place.max_guest !== 1 ? 's' : ''}</div>
<div class="number_rooms">${place.number_rooms} Bedroom${
place.number_rooms !== 1 ? 's' : ''}</div>
<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
place.number_bathrooms !== 1 ? 's' : ''}</div>
</div>
<div class="description">
${place.description}
</div>
</article>`
      );
    });
  }
  function templatePrintFilter (data) {
    $('section.places article').remove();
    data.forEach((place) => {
      $('section.places').append(
`<article>
<div class="title_box">
<h2>${place.name}</h2>
<div class="price_by_night">$${place.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${place.max_guest} Guest${
place.max_guest !== 1 ? 's' : ''}</div>
<div class="number_rooms">${place.number_rooms} Bedroom${
place.number_rooms !== 1 ? 's' : ''}</div>
<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
place.number_bathrooms !== 1 ? 's' : ''}</div>
</div>
<div class="description">
${place.description}
</div>
</article>`
      );
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
  $(':button').click(() => {
    let postList = {};
    if (stateList.length > 0) {
      postList["states"] = stateList;
    }
    if (cityList.length > 0) {
      postList["cities"] = cityList;
    }
    if (idList.length > 0){
      postList["amenities"] = idList;
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(postList),
      contentType: 'application/json',
      success: (data) => { templatePrintFilter(data); },
      dataType: 'json'
    });
  });
});
