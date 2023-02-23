$(document).ready(() => {
  $(':button').css('color', 'green');
  const idList = [];
  $('.amenity-list input:checkbox').change((e) => {
    const inputElement = $(e.target)
    if ( inputElement.prop('checked')) {
      idList.push(inputElement.data('id'));
      const h4Tag = $('DIV.amenities h4');
      h4Tag.append(inputElement.data('name') + ' ');
    } else {
      const index = idList.indexOf(inputElement.data('id'));
      if (index > -1) {
	idList.splice(index, 1);
      }
      $('DIV.amenities h4').html($('DIV.amenities h4').html().
      replace(String(inputElement.data('name')), ''));
    }
  });  
});
