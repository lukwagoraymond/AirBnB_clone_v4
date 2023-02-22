$( document ).ready(() => {
  let id_list = [];
  let id_name = [];

  const listAmenities = $('DIV.amenities LI input:checkbox');
  console.log(listAmenities);

  // choose each link and add an change event listener to it indepedently
  $('.amenity-list input:checkbox').change((e) => {
    let element = $(e.target)
    let amenityElem = $('.amenity-list li').has(element);
    let amenityName = amenityElem.text();
    if ( element.prop('checked')) {
      console.log('this checkbox is checked');
      id_list.push(element.data('id'));
      console.log(id_list);
      //let amenityElem = $('.amenity-list li').has(element);
      //let amenityName = amenityElem.text(); 
      console.log(amenityName);
      // Now to add amenityName to h4
      let h4Tag = $('DIV.amenities h4');
      h4Tag.append(amenityName + ' ');
    } else {
      let index = id_list.indexOf(element.data('id'));
      if (index > -1) {
	id_list.splice(index, 1);
      }
      console.log(id_list);
      console.log('removing ' + amenityName);
      $('DIV.amenities h4').html($('DIV.amenities h4').html().replace(String(amenityName), ''));
    }
  });  
});
