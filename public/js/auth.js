


var config = {
  apiKey: "AIzaSyBL_LaPryoNiAeqDaOxA8TtHCGQqQauH6c",
  authDomain: "personal-budget-app-5f7f7.firebaseapp.com",
  databaseURL: "https://personal-budget-app-5f7f7.firebaseio.com",
  projectId: "personal-budget-app-5f7f7",
  storageBucket: "personal-budget-app-5f7f7.appspot.com",
  messagingSenderId: "239802611255"
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
    $("#sign-up").hide();
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
      $("#sign-up").show();
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

$(document).on("click", "#register-btn", function(event) {
  event.preventDefault();
  // Grabs user input
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();
  var confirm = $("#confirm")
    .val()
    .trim();
  var firstName = $("#first-name")
    .val()
    .trim();
  var lastName = $("#last-name")
    .val()
    .trim();

  if (password === "" || confirm === "" || confirm !== password || firstName === "" || lastName === "" || email === "") {

    var text = "";

    if (firstName === "") {
      text += "<p>You need to specify a valid first name.</p>";
    }
    if (lastName === "") {
      text += "<p>You need to specify a valid last name.</p>";
    }
    if (email === "") {
      text += "<p>You need to specify a valid e-mail.</p>";
    }
    if (password === "") {
      text += "<p>You need to specify a valid password.</p>";
    }
    if (confirm === "") {
      text += "<p>You need to confirm the password.</p>";
    }
    if (password !== confirm) {
      text += "<p>Passwords don't match.</p>";
    }
    $(".modal-body").html(text);
    $("#sign-fail-modal").modal("show");

  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(data) {
        console.log("signed up");
        var newUser = {
          firstName: firstName,
          lastName: lastName,
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
  }
});



