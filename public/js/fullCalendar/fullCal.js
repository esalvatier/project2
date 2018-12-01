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
    // eventColor: "#ff0000"
  });
});
