// Get references to page elements
// refreshFriends gets new friends from the db and repopulates the list
var refreshFriends = function() {
  var localUID = sessionStorage.getItem("localUID");
  $.ajax("/api/friend/" + localUID, { method: "GET" }).then(function(data) {
    data.requests.forEach(function(request) {
      $.ajax("/api/user", {
        method: "GET",
        data: { uid: request.fromUser }
      }).done(function(response) {
        console.log(request);
        var $li = $("<li>")
          .attr({
            class: "list-group-item"
          })
          .text(response.fullName);
        $("#requests").append($li);
        //Accept
        var $acceptBtn = $("<button>")
          .attr({
            class: "acceptButton btn btn-success",
            relID: request.relID,
            display: "inline-block",
            uid: response.uid,
            newCode: 2
          })
          .text("Accept");
        $($li).append($acceptBtn);
        //Decline
        var $declineBtn = $("<button>")
          .attr({
            class: "declineButton btn btn-danger",
            relID: request.relID,
            display: "inline-block",
            uid: response.uid,
            newCode: 3
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

$(document).on("click", ".acceptButton", function() {
  var relID = $(this).attr("relid");
  var newCode = $(this).attr("newcode");
  $.ajax("/api/friend", {
    method: "PUT",
    data: { id: relID, status: newCode }
  });
  var targetUser = $(this).attr("uid");
  var user = sessionStorage.getItem("localUID");
  $.ajax("/api/friend", {
    method: "POST",
    data: { fromUser: user, targetUser: targetUser, status: 2 }
  }).then(function() {
    $("#friends").empty();
    $("#requests").empty();
    refreshFriends();
  });
  $(this)
    .parent()
    .remove();
});

$(document).on("click", ".declineButton", function() {
  var relID = $(this).attr("relid");
  var newCode = $(this).attr("newcode");
  $.ajax("/api/friend", {
    method: "PUT",
    data: { id: relID, status: newCode }
  }).then(function() {
    refreshFriends();
  });
  $(this)
    .parent()
    .remove();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#friends").empty();
    $("#requests").empty();
    refreshFriends();
  }
});
