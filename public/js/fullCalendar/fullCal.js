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
      var momentStartTime = moment(calEvent.start).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      var momentEndTime = moment(calEvent.end).format("YYYY-MM-DDTHH:mm:ss");

      //Getting date of clicked event
      var n = momentStartTime.split("A");
      var y = n[0];

      var a = momentEndTime.split("A");
      var b = a[0];

      var eventStartTime = n[1];
      var eventEndTime = b[1];

      var eventDate = y.split("-");
      var eventYear = eventDate[0];
      var eventMonth = eventDate[1];
      var eventDay = eventDate[2];

      //Title
      $(".modal-title").append("<form class=titleForm></form>");
      $(".titleForm").append(
        "<input class='nameTitle modalInput' type=text></input>"
      );
      $(".nameTitle").attr("value", calEvent.title);

      $(".modal-body").append("<form class=dateEdit></form>");

      //Day
      $(".dateEdit").append("<input class='eventDateDay modalInput'></input>");
      $(".dateEdit").append("<p class='dateTextDay modalText'>Start Day</p>");
      console.log(eventDay);
      $(".eventDateDay").attr("value", eventDay);

      //Month
      $(".dateEdit").append(
        "<input class='eventDateMonth modalInput'></input>"
      );
      $(".dateEdit").append(
        "<p class='dateTextMonth modalText'>Start Month</p>"
      );
      console.log(eventMonth);
      $(".eventDateMonth").attr("value", eventMonth);

      //Year
      $(".dateEdit").append("<input class='eventDateYear modalInput'></input>");
      $(".dateEdit").append("<p class='dateTextYear modalText'>Start Year</p>");
      console.log(eventYear);
      $(".eventDateYear").attr("value", eventYear);

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

        var eventEndDate = b.split("-");
        var eventEndYear = eventEndDate[0];
        var eventEndMonth = eventEndDate[1];
        var eventEndDay = eventEndDate[2];

        //Day
        $(".dateEdit").append(
          "<input class='eventEndDateDay modalInput'></input>"
        );
        $(".dateEdit").append("<p class='dateTextDay modalText'>End Day</p>");
        $(".eventEndDateDay").attr("value", eventEndDay);

        //Month
        $(".dateEdit").append(
          "<input class='eventEndDateMonth modalInput'></input>"
        );
        $(".dateEdit").append(
          "<p class='dateTextMonth modalText'>End Month</p>"
        );
        $(".eventEndDateMonth").attr("value", eventEndMonth);

        //Year
        $(".dateEdit").append(
          "<input class='eventEndDateYear modalInput'></input>"
        );
        $(".dateEdit").append("<p class='dateTextYear modalText'>End Year</p>");
        $(".eventEndDateYear").attr("value", eventEndYear);
      }

      $(".modal-body").append(
        "<p class=recommendEvents>Recommendations for Events that start at the same time</p>"
      );

      var eventStartTimeForEventbrite = moment(calEvent.start).format(
        "YYYY-MM-DD"
      );
      var eventStartTimeForEventbrite2 = moment(calEvent.start).format(
        "HH:mm:ss"
      );
      var eventStartTimeForEventbrite3 =
        eventStartTimeForEventbrite + "T" + eventStartTimeForEventbrite2 + "Z";

      var eventEndTimeForEventbrite = moment(calEvent.end).format("YYYY-MM-DD");
      var eventEndTimeForEventbrite2 = moment(calEvent.end).format("HH:mm:ss");
      var eventEndTimeForEventbrite3 =
        eventStartTimeForEventbrite + "T" + eventStartTimeForEventbrite2 + "Z";

      //format the URL
      var url =
        "https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=";
      url += eventStartTimeForEventbrite3;
      url += "&start_date.range_end=";
      url += eventEndTimeForEventbrite3;
      url +=
        "&categories=103,113,105,104,108,107,102,109,110,111,114,115,116,106,117,118,119&token=E3HXKGT4QLZPWYHIGQD2";
      console.log("URL: " + url);

      //call into eventbrite API
      var API = {
        getEvents: function() {
          return $.ajax({
            url: url,
            type: "GET"
          });
        }
      };

      API.getEvents().then(function(events) {
        console.log(events);
        //var events = JSON.parse(data);
        console.log("Parsed JSON: " + events);
        var count = events.pagination.object_count;
        console.log("count: " + count);

        for (var i = 0; i < count; i++) {
          console.log("Name: " + events.events[i].name.text);
          $(".modal-body").append(
            "<p class=recommendEvents>Name:" +
              events.events[i].name.text +
              "</p>"
          );
          console.log("Url: " + events.events[i].url);
          console.log("\n");
          $(".modal-body").append(
            "<p class=recommendEvents>URL: <a href=" +
              events.events[i].url +
              ' target="_blank"' +
              ">" +
              events.events[i].url +
              "</a></p>"
          );
          $(".modal-body").append("<br>");
        }
      });

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
          $(this).attr("data-toggle", "modal");
          $(this).attr("data-target", ".bd-example-modal-lg");

          $(".modal-title").text("");
          $(".modal-body").text("");

          //Title
          $(".modal-title").append("<form class=titleForm></form>");
          $(".titleForm").append(
            "<input class='nameTitle modalInput' type=text></input>"
          );
          $(".nameTitle").attr("placeholder", "Enter Event Title Here!");

          //Start Time
          $(".modal-body").append("<form class=editingForm></form>");
          $(".editingForm").append(
            "<input class='startTime modalInput'></input>"
          );
          $(".editingForm").append(
            "<p class='startTimeText modalText'>Start Time (Format must be (HH:mm) </p>"
          );
          $(".startTime").attr("placeholder", "Start Time Here!");

          //End Time
          $(".editingForm").append(
            "<input class='endTime modalInput'></input>"
          );
          $(".editingForm").append(
            "<p class='endTimeText modalText'>End Time (Format must be (HH:mm)</p>"
          );
          $(".endTime").attr("placeholder", "End Time Here!");

          $(".modal-body").append(
            "<p class=recommendEvents>Recommendations for Events that start at the same time</p>"
          );
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
