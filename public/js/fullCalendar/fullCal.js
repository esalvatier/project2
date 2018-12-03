$(document).ready(function() {
  var val = $("#calendar").data("history");
  console.log(val);
  var defaultStart = moment().format("YYYY-MM-DD");
  var resources = [
    {
      title: "All Day Event",
      start: defaultStart,
      startEditable: true
    },
    {
      title: "Long Event",
      start: moment(defaultStart)
        .add(6, "days")
        .format("YYYY-MM-DD"),
      end: moment(defaultStart)
        .add(9, "days")
        .format("YYYY-MM-DD")
    },
    {
      id: 999,
      title: "Repeating Event",
      start: moment(defaultStart)
        .add(8, "days")
        .add(16, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      id: 999,
      title: "Repeating Event",
      start: moment(defaultStart)
        .add(15, "days")
        .add(16, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Conference",
      start: moment(defaultStart)
        .add(10, "days")
        .format("YYYY-MM-DD"),
      end: moment(defaultStart)
        .add(12, "days")
        .format("YYYY-MM-DD")
    },
    {
      title: "Meeting",
      start: moment(defaultStart)
        .add(11, "days")
        .add(10, "hours")
        .format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(defaultStart)
        .add(11, "days")
        .add(12, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Lunch",
      start: moment(defaultStart)
        .add(11, "days")
        .add(12, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Meeting",
      start: moment(defaultStart)
        .add(11, "days")
        .add(14, "hours")
        .add(30, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Happy Hour",
      start: moment(defaultStart)
        .add(11, "days")
        .add(17, "hours")
        .add(30, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Dinner",
      start: moment(defaultStart)
        .add(11, "days")
        .add(20, "hours")
        .add(30, "minutes")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "TestEvent1",
      start: moment(defaultStart)
        .add(12, "days")
        .add(7, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Event2",
      start: moment(defaultStart)
        .add(12, "days")
        .add(7, "hours")
        .format("YYYY-MM-DDTHH:mm:ss")
    },
    {
      title: "Click for Google",
      url: "http://google.com/",
      start: moment(defaultStart).add(27, "days")
    }
  ];

  $("#calendar").fullCalendar({
    eventClick: function(event) {
      console.log("test");
      event.title = "CLICKED!";
      // $('#calendar').fullCalendar('updateEvent', event);
    },
    defaultDate: defaultStart,
    editable: false,
    eventClick: function(calEvent, jsEvent, view) {
      console.log("Event: " + calEvent.title);
      console.log("Coordinates: " + jsEvent.pageX + "," + jsEvent.pageY);
      console.log("View: " + view.name);
      // change the border color just for fun
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", ".bd-example-modal-lg");
      $(".modal-content").append("Event: " + calEvent.title);
      $(".modal-content").append("Event: " + calEvent.start);
      // $(".modal-content").append(
      //   "Coordinates: " + jsEvent.pageX + "," + jsEvent.pageY
      // );
      // $(".modal-content").append("View: " + view.name);
      $(this).css("border-color", "red");
    },
    eventLimit: true,
    events: resources
    // eventColor: "#ff0000"
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localUID = user.uid;
      var nowDate = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      $.ajax("/api/event/" + history, {
        method: "GET",
        data: {
          date: nowDate,
          uid: localUID
        }
      }).done(function(response) {
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar("addEventSource", response);
        $("#calendar").fullCalendar("rerenderEvents");
        $("#calendar").fullCalendar("refetchEvents");
        userLoggedIn(localUID);
      });
    }
  });

  $(document.body).on("click", "#log-out-btn", function(event) {
    event.preventDefault();
    localUID = "";
    user = undefined;
    firebase
      .auth()
      .signOut()
      .then(function() {
        $("#username-display")
          .empty()
          .hide();
        $("#username-input").show();
        $("#password-input").show();
        $("#sign-up-btn").show();
        $("#sign-in-btn").show();
        $("#log-out-btn").hide();
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar("addEventSource", resources);
        $("#calendar").fullCalendar("rerenderEvents");
        $("#calendar").fullCalendar("refetchEvents");
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});
