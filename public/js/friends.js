// Get references to page elements

// The API object contains methods for each kind of request we'll make
var API = {
  getFriends: function(id) {
    return $.ajax({
      url: "api/friend/" + id,
      type: "GET"
    });
  }
};

// refreshFriends gets new friends from the db and repopulates the list
var refreshFriends = function() {
  console.log("BEFORE API CALL");
  console.log("localUID: " + localUID);

  API.getFriends(localUID).then(function(data) {
    console.log(data);

    data.requests.forEach(function(request) {
      $.ajax("/api/user", {
        method: "GET",
        data: { uid: request.fromUser }
      }).done(function(response) {
        console.log(response);
        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": request.id
          })
          .text(response.fullName);
        $("#requests").append($li);
        //Accept
        var $acceptBtn = $("<button>")
          .attr({
            class: "acceptButton btn-success",
            display: inline
          })
          .text("Accept");
        $($li).append($acceptBtn);
        //Decline
        var $declineBtn = $("<button>")
          .attr({
            class: "declineButton btn-danger",
            display: inline
          })
          .text("Decline");
        $($li).append($declineBtn);
      });
    });
    data.friends.forEach(function(friends) {
      $.ajax("/api/user", {
        method: "GET",
        data: { uid: friends.targetUser }
      }).done(function(response) {
        console.log(response);
        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": friends.id
          })
          .text(response.fullName);
        $("#friends").append($li);
      });
    });
  });
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    refreshFriends();
  }
});
