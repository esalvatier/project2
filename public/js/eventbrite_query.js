$(document).ready(function() {




$("#test-btn").on("click", function(event) {
  event.preventDefault();

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  getEvents: function() {
    return $.ajax({
      url: "https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=2018-12-01T13:00:00Z&start_date.range_end=2018-12-01T18:00:00Z&categories=103,113,105,104,108,107,102,109,110,111,114,115,116,106,117,118,119&token=E3HXKGT4QLZPWYHIGQD2",
      type: "GET"
    });
  },
};

API.getEvents().then(function(data) {
      console.log(data);
      //window.location.href = "/events";
    });

});




});

