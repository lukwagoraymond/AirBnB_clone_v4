$(document).ready(() => {
  const idList = [];
  $('.amenity-list input:checkbox').change((e) => {
    const inputElement = $(e.target)
    const amenityElem = $('.amenity-list li').has(inputElement);
    const amenityName = amenityElem.text();
    if ( inputElement.prop('checked')) {
      idList.push(inputElement.data('id'));
      const h4Tag = $('DIV.amenities h4');
      h4Tag.append(amenityName + ' ');
    } else {
      const index = idList.indexOf(inputElement.data('id'));
      if (index > -1) {
	idList.splice(index, 1);
      }
      $('DIV.amenities h4').html($('DIV.amenities h4').html().replace(String(amenityName), ''));
    }
  });  
});
