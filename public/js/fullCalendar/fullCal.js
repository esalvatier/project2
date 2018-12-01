$(document).ready(function() {
  $("#calendar").fullCalendar({
    eventClick: function(event) {
      console.log("test");
      event.title = "CLICKED!";
      // $('#calendar').fullCalendar('updateEvent', event);
    },
    defaultDate: "2018-03-12",
    editable: false,
    eventClick: function(calEvent, jsEvent, view) {
      console.log("View: " + view.name);

      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", ".bd-example-modal-lg");
      $(".modal-title").append(calEvent.title);
      $(".modal-body").append(
        "Start: " + moment(calEvent.start).format("h:mm a")
      );
      $(".modal-body").append("End: " + moment(calEvent.end).format("h:mm a"));
      $(".modal-body").append("All Day: " + calEvent.allDay);
    },
    eventMouseover: function(calEvent, jsEvent, view) {
      console.log(calEvent.title);
      console.log("View: " + view.name);
      console.log("AAAA");

      $(this).css("border-color", "#00427f");
    },
    eventMouseout: function(calEvent, jsEvent, view) {
      $(this).css("border-color", "");
      console.log("View: " + view.name);
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
