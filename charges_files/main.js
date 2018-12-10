// JQUERY Handles AJAX calls and enables/disables fields based on what's currently selected
$(function() {

  valueIsSet = function(select_val) {
    if (select_val != 'zero') {
      return true;
    }
  }

  $('#location').change(function(event) {

    // var category_value = $('#category').val();
    var location_id = $('#location').val();
    if (valueIsSet(location_id)) {
      $('#category').prop('disabled', false);
      $('#service').prop('disabled', true);
      /* Send the data using post and put the results in a div */
      $.ajax({
        url: "./call_categories.php",
        type: "get",
        data: { "location_id" : location_id },
        success: function(data){
          $('#category').html(data);
        },
        error:function(){
          alert("failure");
        }
      });
    }
    else {
      $('#category').prop('disabled', true);
      $('#service').prop('disabled', true);
      $('#category').html('<option value="zero">Choose a Category</option>');
      $('#service').val('zero');
    }



    $('.charges-wrapper').fadeTo( 500, 0 );

    // Prevent default posting of form
    event.preventDefault();
  });

  $('#category').change(function(event) {

    // Enables the Service dropdown if a value is selected
    var category_value = $('#category').val();
    if (valueIsSet(category_value)) {
      $('#service').prop('disabled', false);
    }
    else {
      $('#service').prop('disabled', true);
    }

    var category_id = $('#category').val();
    var location_id = $('#location').val();

    /* Send the data using post and put the results in a div */
    $.ajax({
      url: "./call_services.php",
      type: "get",
      data: { "location_id" : location_id, "category_id" : category_id },
      success: function(data){
        $('#service').html(data);
      },
      error:function(){
        alert("failure");
      }
    });

    $('.charges-wrapper').fadeTo( 500, 0 );
    event.preventDefault();
  });

  // Check to see if Service has a value, if so enable the Submit button
  $('#service').change(function(event) {
    var service_value = $('#service').val();
    if (valueIsSet(service_value)) {
      $('#submit-button').prop('disabled', false);
      var location_id = $('#location').val();
      var category_id = $('#category').val();
      var service_id = $('#service').val();

      /* Send the data using post and put the results in a div */
      $.ajax({
        url: "./call_charge.php",
        type: "get",
        data: { "location_id" : location_id, "category_id" : category_id, "service_id" : service_id },
        success: function(data){
          $('#charge').html(data);
        },
        error:function(){
          alert("failure");
        }
      });
      // Show the charges div
      $('.charges-wrapper').fadeTo( 500, 1 );
    }
    else {
      $('#submit-button').prop('disabled', true);
      // Hide the charges div if Service isn't set
      $('.charges-wrapper').fadeTo( 500, 0 );
    }
    event.preventDefault();
  });

  // Disable the Submit button if Location or Category are changed
  $('#location, #category').change(function(event) {
    // Disables submit button
    $('#submit-button').prop('disabled', true);
  });

});


