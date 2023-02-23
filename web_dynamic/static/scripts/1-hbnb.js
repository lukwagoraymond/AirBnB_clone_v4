$(document).ready(() => {
  const idList = [];
  $('.amenity-list input:checkbox').change((e) => {
    const element = $(e.target)
    const amenityElem = $('.amenity-list li').has(element);
    const amenityName = amenityElem.text();
    if ( element.prop('checked')) {
      idList.push(element.data('id'));
      const h4Tag = $('DIV.amenities h4');
      h4Tag.append(amenityName + ' ');
    } else {
      const index = idList.indexOf(element.data('id'));
      if (index > -1) {
	idList.splice(index, 1);
      }
      $('DIV.amenities h4').html($('DIV.amenities h4').html().replace(String(amenityName), ''));
    }
  });  
});
