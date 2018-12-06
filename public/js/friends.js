// Get references to page elements
var $friendsList = $(".friends");

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

    console.log("data: " + data);

    var $friends = data.map(function(friend) {

      console.log("friend: " + friend);
      console.log("friend.firstName: " + friend.firstName);
      

      var $a = $("<a>")
        .text(friend.firstName + " " + friend.lastName)

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": friend.id
        })
        .append($a);
      return $li;
      });

    console.log("Before append");
    console.log("$friendsList: " + $friendsList);
    console.log("$friends.data: " + $friends);
    //$friendsList.empty();
    //$("#friends-display").html("BLAHBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    $("#friends").append($friends);
    //$("#friends-display").hide();
  });
};

firebase.auth().onAuthStateChanged(function(user){

  if (user) {
    refreshFriends();
  }

});