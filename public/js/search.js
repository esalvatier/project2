$(document).ready(function() {
  $(document).on("click", "#search-button", function(event) {
    event.preventDefault();

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
      $("#friends-found").empty();
      for (var i = 0; i < response.length; i++) {
        var result = $("<li>").text(
          "Name: " +
            response[i].firstName +
            " " +
            response[i].lastName +
            " Email: " +
            response[i].email
        );
        var newBtn = $("<button>")
          .attr({
            class: "frndRequestBtn btn btn-secondary",
            uid: response[i].uid,
            display: "inline-block"
          })
          .text("Send Friend Request");
        result.append(newBtn);
        $("#friends-found").append(result);
      }
    });
  });

  $(document).on("click", ".frndRequestBtn", function() {
    console.log("request");
    var targetUser = $(this).attr("uid");
    var fromUser = sessionStorage.getItem("localUID");
    $.ajax("/api/friend", {
      method: "POST",
      data: { fromUser: fromUser, targetUser: targetUser, status: 1 }
    }).then(function(resp) {
      console.log(resp);
    });
    $(this)
      .parent()
      .remove();
  });
});
