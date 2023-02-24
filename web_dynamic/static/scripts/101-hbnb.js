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
<div class="reviews">
<h2 id="review-title">Reviews <span id="my-span" data-place=${place.id} data-user=${place.user_id}>show</span></h2>
</div>
</article>`
      );
    });
    $('H2#review-title #my-span').click((e) => {
      const spanElement = $(e.target);
      if (spanElement.text() == 'show'){
	/*$('DIV.reviews').append(
`<ul>
<li>
<h3></h3>
<p></p>
</li>
</ul>`
	);*/
	const placeId = spanElement.data('place');
	const userId = spanElement.data('user');
	let user = '';
	$.ajax({
	  type: 'GET',
	  url: `http://0.0.0.0:5001/api/v1/users/${userId}`,
	  contentType: 'application/json',
	  dataType: 'json'
	})
	  .done(data => {
	    user = data;
	    $.ajax({
	      type: 'GET',
	      url: `http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`,
	      contentType: 'application/json',
	      dataType: 'json'
	    })
	      .done((data) => {
		data.forEach((review) => {
		  console.log(review);
		  const date = new Date(review.created_at).toUTCString();
		  if (spanElement.data('place') === review.place_id) {
		    spanElement.parent().parent().append(
`<ul>
<li>
<h3>From ${user.first_name} ${user.last_name} the ${date}</h3>
<p>${review.text}</p>
</li>
</ul>`
	);
		//    spanElement.parent().siblings('ul').children('li').children('h3').text(`From ${user.first_name} ${user.last_name}
//the ${date}`);
		  //  spanElement.parent().siblings('ul').children('li').children('p').text(`${review.text}`);
		  }
		});
		spanElement.text('hide');
	      });
	  });
      } else {
	spanElement.parent().siblings('ul').detach();
	spanElement.text('show');
      }
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
  $('#review-title > #my-span').click(() => {
    alert('span clicked');
  });
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
