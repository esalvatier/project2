$(document).ready(function() {
  $(".allDayCheck").hide();
  $(".startTime").hide();
  $(".startTimeText").hide();
  $(".endTime").hide();
  $(".endTimeText").hide();
  $(".eventEndDateDay").hide();
  $(".dateEndTextDay").hide();
  $(".eventEndDateMonth").hide();
  $(".dateEndTextMonth").hide();
  $(".eventEndDateYear").hide();
  $(".dateEndTextYear").hide();

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
    },
    defaultDate: defaultStart,
    editable: false,
    //jsEvent and view also return data if passed through function
    eventClick: function(calEvent) {
      $(".allDayCheck").hide();
      $(".startTime").hide();
      $(".startTimeText").hide();
      $(".endTime").hide();
      $(".endTimeText").hide();
      $(".eventEndDateDay").hide();
      $(".dateEndTextDay").hide();
      $(".eventEndDateMonth").hide();
      $(".dateEndTextMonth").hide();
      $(".eventEndDateYear").hide();
      $(".dateEndTextYear").hide();

      //Triggers Modal
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", ".bd-edit-modal-lg");

      //Start Time of click event
      var momentStartTime = moment(calEvent.start).format(
        "YYYY-MM-DDTHH:mm:ss"
      );

      var n = momentStartTime.split("A");
      var y = n[0];

      var eventStartTime = n[1];

      var eventDate = y.split("-");
      var eventYear = eventDate[0];
      var eventMonth = eventDate[1];
      var eventDay = eventDate[2];

      //End Time of click event
      var momentEndTime = moment(calEvent.end).format("YYYY-MM-DDTHH:mm:ss");

      var a = momentEndTime.split("A");
      var b = a[0];

      var eventEndTime = b[1];

      var eventEndDate = b.split("-");
      var eventEndYear = eventEndDate[0];
      var eventEndMonth = eventEndDate[1];
      var eventEndDay = eventEndDate[2];

      //Event Title
      $(".nameTitle").attr("value", calEvent.title);

      //Day
      $(".eventDateDay").attr("value", eventDay);

      //Month
      $(".eventDateMonth").attr("value", eventMonth);

      //Year
      $(".eventDateYear").attr("value", eventYear);

      if (calEvent.allDay) {
        $(".allDayCheck").show();
      } else {
        $(".allDayCheck").hide();
        $(".startTime").show();
        $(".startTimeText").show();
        $(".startTime").attr("value", eventStartTime);
      }

      //End Time
      if (eventEndYear !== "Invalid date") {
        $(".endTime").show();
        $(".endTimeText").show();
        $(".endTime").attr("placeholder", eventEndTime);

        //Day
        $(".eventEndDateDay").show();
        $(".dateEndTextDay").show();
        $(".eventEndDateDay").attr("value", eventEndDay);

        //Month
        $(".eventEndDateMonth").show();
        $(".dateEndTextMonth").show();
        $(".eventEndDateMonth").attr("value", eventEndMonth);

        //Year
        $(".eventEndDateYear").show();
        $(".dateEndTextYear").show();
        $(".eventEndDateYear").attr("value", eventEndYear);
      }

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
      // var url =
      ("https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=");
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
              " target=\"_blank\"" +
              ">" +
              events.events[i].url +
              "</a></p>"
          );
          $(".modal-body").append("<br>");
        }
      });
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
          $(this).attr("data-target", ".bd-addEvent-modal-lg");

          //Reset's typed text in modal
          $(".modal").on("hidden.bs.modal", function() {
            $(this)
              .find("form")[0]
              .reset();
          });
          $(document).on("click", "#addEventBtn", function(event) {
            event.preventDefault();
            var title = $("#addEventTitle")
              .val()
              .trim();

            var strtTime = $("#addEventStartTime").val();
            var endTime = $("#addEventEndTime").val();

            var startDate = $("#addEventStartDate")
              .val()
              .trim();
            var endDate = $("#addEventEndDate")
              .val()
              .trim();
            
            var allDay = $("#allDayCheck").val();

            var description = $("#eventDescription").val();

            var eventStart = moment(startDate + "T" + strtTime).format("YYYY-MM-DDTHH:mm:ss");
            var eventEnd = moment(endDate + "T" + endTime).format("YYYY-MM-DDTHH:mm:ss");

            console.log(
              "Start Date: " +
                startDate +
                " Time: " +
                strtTime +
                " | End Date: " +
                endDate +
                " Time: " +
                " All Day: " +
                allDay
            );

            console.log("BEFORE AJAX CALL");

            $.ajax("/api/event/", {
              method: "POST",
              data: {
                title: title,
                eventStart: eventStart,
                eventEnd: eventEnd,
                allDay: allDay,
                description: description,
                startDate: startDate
              }
            }).then(function(response) {
              //TODO
            });

          });
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
        var source = [];
        response.forEach(function(elem) {
          source.push(JSON.parse(elem));
        });
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar("addEventSource", source);
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
