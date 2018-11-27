// Initialize Firebase
var config = {
  apiKey: "AIzaSyBqTcJJ_3u7P6Mg7RXJRgZlzuJcLd8XnnM",
  authDomain: "projectsounders-52f0a.firebaseapp.com",
  databaseURL: "https://projectsounders-52f0a.firebaseio.com",
  projectId: "projectsounders-52f0a",
  storageBucket: "projectsounders-52f0a.appspot.com",
  messagingSenderId: "488308303654"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#sign-in-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var email = $("#e-mail-input").val().trim();
  var password = $("#password-input").val().trim();

 firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
  //Success, move to homepage.
  console.log("logged in!")
  window.location.href = 'index2.html';
}).catch(function(error){
  console.log(error.code);
  console.log(error.message);
  alert(error.message);
});
});