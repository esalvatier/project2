$(document).on("click", "#send-email-button", function(event) {
  event.preventDefault();

  console.log("IN EMAIL BUTTON HANDLER");

  // Grabs user input
  var email = $("#email-input")
    .val()
    .trim();

  // var message = $("#message-input")
  //   .val()
  //   .trim();

  $.ajax("/api/email/", {
    method: "POST",
    data: {
      email: email
    }
  });
});
