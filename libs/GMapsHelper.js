// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

var autocomplete;

module.exports = {
  initAutocomplete: function(successCallback, errorCallback) {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('gmaps_autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, 
    // call the callback function with the place
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        errorCallback("GMaps Autocomplete's returned place contains no geometry");
      } else {
        successCallback(place);
      }
    });
  }
}
