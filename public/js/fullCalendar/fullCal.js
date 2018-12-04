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
    //jsEvent and view also return data if passed through function
    eventClick: function(calEvent) {
      //Clears contents so each time clicked only selected content appears
      $(".modal-title").text("");
      $(".modal-body").text("");
      console.log(calEvent.source);

      //Gives the clicked event the needed class'/data for it to trigger the modal.  Won't work without these two lines
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", ".bd-example-modal-lg");

      //Time needs to be converted by Moment JS
      var eventStartTime = moment(calEvent.start).format("h:mm a");
      var eventEndTime = moment(calEvent.end).format("h:mm a");

      //Title
      $(".modal-title").append("<form class=titleForm></form>");
      $(".titleForm").append(
        "<input class='nameTitle modalInput' type=text></input>"
      );
      $(".nameTitle").attr("value", calEvent.title);

      if (calEvent.allDay) {
        $(".modal-body").append("<p class=allDayCheck></p>");
        $(".allDayCheck").append("This is an all day event");
      } else {
        $(".modal-body").append("<form class=editingForm></form>");

        //Start Time (All events require at least a start time to be valid)
        $(".editingForm").append(
          "<input class='startTime modalInput'></input>"
        );
        $(".editingForm").append(
          "<p class='startTimeText modalText'>Start Time (Format must be (HH:mm) </p>"
        );
        $(".startTime").attr("value", eventStartTime);
      }

      //End Time
      if (eventEndTime !== "Invalid date") {
        $(".editingForm").append("<input class='endTime modalInput'></input>");
        $(".editingForm").append(
          "<p class='endTimeText modalText'>End Time (Format must be (HH:mm)</p>"
        );
        $(".endTime").attr("placeholder", eventEndTime);
      }

      $(".modal-body").append(
        "<p class=recommendEvents>Recommendations for Events that start at the same time</p>"
      );

      // $(".editingForm").append("<input class=eventMonth></input>");
      // $(".allDayCheck").append("Month: " + calEvent.allDay);
    },
    eventMouseover: function() {
      $(this).css("border-color", "#00427f");
    },
    eventMouseout: function() {
      $(this).css("border-color", "");
    },
    customButtons: {
      addNewEvent: {
        text: "Add Event!",
        click: function() {
          alert("You added an event!");
        }
      }
    },
    header: {
      right: "addNewEvent today prev,next"
    },
    eventLimit: true,
    eventColor: "#006acc",
    eventTextColor: "#f0f0f0",
    events: resources
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      localUID = user.uid;
      var nowDate = moment()
        .startOf("month")
        .format("YYYY-MM-DD");
      console.log(val);
      $.ajax("/api/event/" + val, {
        method: "GET",
        data: {
          date: nowDate,
          uid: localUID
        }
      }).then(function(response) {
        console.log(response);
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
    userLoggedOut();
    $("#calendar").fullCalendar("removeEvents");
    $("#calendar").fullCalendar("addEventSource", resources);
    $("#calendar").fullCalendar("rerenderEvents");
    $("#calendar").fullCalendar("refetchEvents");
  });
});
