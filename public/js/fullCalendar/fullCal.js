$(document).ready(function() {
  $("#calendar").fullCalendar({
    eventClick: function(event) {
      console.log("test");
      event.title = "CLICKED!";
      // $('#calendar').fullCalendar('updateEvent', event);
    },
    defaultDate: "2018-03-12",
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
      }

      $(".modal-body").append("<form class=editingForm></form>");

      //Start Time (All events require at least a start time to be valid)
      $(".editingForm").append("<input class='startTime modalInput'></input>");
      $(".editingForm").append(
        "<p class='startTimeText modalText'>Start Time (Format must be (HH:mm) </p>"
      );
      $(".startTime").attr("value", eventStartTime);

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
    events: [
      {
        title: "All Day Event",
        start: "2018-03-01",
        startEditable: true
      },
      {
        title: "Long Event",
        start: "2018-03-07",
        end: "2018-03-10"
      },
      {
        id: 999,
        title: "Repeating Event",
        start: "2018-03-09T16:00:00"
      },
      {
        id: 999,
        title: "Repeating Event",
        start: "2018-03-16T16:00:00"
      },
      {
        title: "Conference",
        start: "2018-03-11",
        end: "2018-03-13"
      },
      {
        title: "Meeting",
        start: "2018-03-12T10:30:00",
        end: "2018-03-12T12:30:00"
      },
      {
        title: "Lunch",
        start: "2018-03-12T12:00:00"
      },
      {
        title: "Meeting",
        start: "2018-03-12T14:30:00"
      },
      {
        title: "Happy Hour",
        start: "2018-03-12T17:30:00"
      },
      {
        title: "Dinner",
        start: "2018-03-12T20:00:00"
      },
      {
        title: "TestEvent1",
        start: "2018-03-13T07:00:00"
      },
      {
        title: "Event2",
        start: "2018-03-13T07:00:00"
      },
      {
        title: "Click for Google",
        url: "http://google.com/",
        start: "2018-03-28"
      }
    ]
  });
});
