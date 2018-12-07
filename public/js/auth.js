var config = {
  apiKey: "AIzaSyC5zyqG5mwPDszfk18PvFAhTzLB68k807o",
  authDomain: "groupproject2eventcal.firebaseapp.com",
  databaseURL: "https://groupproject2eventcal.firebaseio.com",
  projectId: "groupproject2eventcal",
  storageBucket: "groupproject2eventcal.appspot.com",
  messagingSenderId: "295266350244"
};
firebase.initializeApp(config);

function userLoggedIn(dbUID) {
  $.ajax("/api/user", {
    method: "GET",
    data: { uid: dbUID }
  }).done(function(response) {
    console.log(response);
    $("#username-display").text(response.firstName + " " + response.lastName);
    $("#user-dropdown").show();
    $("#username-input").hide();
    $("#password-input").hide();
    $("#sign-up-btn").hide();
    $("#sign-in-btn").hide();
    $("#log-out-btn").show();
  });
}

function userLoggedOut() {
  localUID = "";
  firebase
    .auth()
    .signOut()
    .then(function() {
      $("#username-display").empty();
      $("#user-dropdown").show();
      $("#username-input").show();
      $("#password-input").show();
      $("#sign-up-btn").show();
      $("#sign-in-btn").show();
      $("#log-out-btn").hide();
    })
    .catch(function(error) {
      console.log(error);
    });
}
// eslint-disable-next-line no-unused-vars
var localUID = "";
//var database = firebase.database();

$(document).on("click", "#sign-in-btn", function(event) {
  event.preventDefault();

  // Grabs user input
  var email = $("#username-input")
    .val()
    .trim();
  var password = $("#password-input")
    .val()
    .trim();

  console.log("Before auth");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      //Success, move to homepage.
      console.log("logged in!");
      userLoggedIn(localUID);
    })
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
    });
});

$(document).on("click", "#sign-up-btn", function(event) {
  event.preventDefault();
  // Grabs user input
  var email = $("#username-input")
    .val()
    .trim();
  var password = $("#password-input")
    .val()
    .trim();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(data) {
      console.log("signed up");
      var newUser = {
        firstName: "test",
        lastName: "test2",
        email: email,
        uid: data.user.uid
      };
      alert("You signed up with e-mail: " + email);
      $.ajax("/api/user", {
        method: "POST",
        data: newUser
      }).done(function() {
        userLoggedIn(localUID);
      });
    })
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
      alert(error.message);
    });
});
