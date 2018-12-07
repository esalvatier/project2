

$(document).on("click", "#search-button", function(event) {
  event.preventDefault();

  console.log("IN SEARCH BUTTON HANDLER");

  // Grabs user input
  var searchterm = $("#search-input")
    .val()
    .trim();

  // var message = $("#message-input")
  //   .val()
  //   .trim();

    $.ajax("/api/search/", {
      method: "GET",
      data: {
        searchterm: searchterm
      }
    }).then(function(response) {
      console.log(response[0].firstName);
      $("#friends-found").empty();
      for (var i=0; i < response.length; i++) {
       $("#friends-found").append(response[i].firstName + " " + response[i].lastName + " " + response[i].email);
       $("#friends-found").append("<br>");
      }
    });
    
  });

