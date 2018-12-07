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
    $("#username-display").text(response.firstName + " " + response.lastName);
    $("#user-dropdown").show();
    $("#user-display").show();
    $("#username-input").hide();
    $("#password-input").hide();
    $("#sign-up").hide();
    $("#sign-in-btn").hide();
    $("#log-out-btn").show();
  });
}

// eslint-disable-next-line no-unused-vars
function userLoggedOut() {
  sessionStorage.setItem("localUID", "");
  firebase
    .auth()
    .signOut()
    .then(function() {
      $("#username-display").empty();
      $("#user-dropdown").hide();
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
//var database = firebase.database();

$(document).on("click", "#sign-in-btn", function(event) {
  event.preventDefault();
  var localUID = sessionStorage.getItem("dropselvalue");
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

  if (
    password === "" ||
    confirm === "" ||
    confirm !== password ||
    firstName === "" ||
    lastName === "" ||
    email === ""
  ) {
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
        var newUser = {
          firstName: firstName,
          lastName: lastName,
          fullName: firstName + " " + lastName,
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var localUID = user.uid;
    if (window.sessionStorage) {
      sessionStorage.setItem("localUID", localUID);
    }
    userLoggedIn(localUID);
  }
});
