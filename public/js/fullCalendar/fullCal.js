$(document).ready(function() {
  $(".allDayCheck").hide();

  var val = $("#calendar").data("history");
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
      $(".editStartEventMaster").hide();
      $(".editEndEventMaster").hide();

      //Triggers Modal
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", ".bd-edit-modal-lg");

      //Start Time of click event
      var momentStartTime = moment(calEvent.start).format(
        "YYYY-MM-DDTHH:mm:ss"
      );

      var n = momentStartTime.split("A");

      var eventStartDate = n[0];
      var eventStartTime = n[1];

      var eventDate = eventStartDate.split("-");
      var eventYear = eventDate[0];

      //End Time of click event
      var momentEndTime = moment(calEvent.end).format("YYYY-MM-DDTHH:mm:ss");

      var a = momentEndTime.split("A");

      var eventEndDate = a[0];
      var eventEndTime = a[1];

      var eventEnd = eventEndDate.split("-");
      var eventEndYear = eventEnd[0];

      //Event Title
      $(".nameTitle").attr("value", calEvent.title);
      $(".editStartEventMaster").show();
      $("#editEventStart").attr("value", eventStartDate);
      $("#editEventStartTime").attr("value", eventStartTime);

      //All Day Check
      if (calEvent.allDay) {
        $(".allDayCheck").show();
      } else {
        $(".allDayCheck").hide();
      }

      //End Time
      if (eventEndYear !== "Invalid date") {
        $(".editEndEventMaster").show();

        if (eventEndYear !== "Invalid date" && calEvent.allDay === true) {
          $(".editEndEventMaster").hide();
        }

        $("#editEventEnd").attr("value", eventEndDate);
        $("#editEventEndTime").attr("value", eventEndTime);
      }
      $("#descriptionP").text(calEvent.description);
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
          $(this).attr("id", "addEventModal");
          console.log(this);

          //Reset's typed text in modal
          $(".modal").on("hidden.bs.modal", function() {
            $(this)
              .find("form")[0]
              .reset();
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
      $.ajax("/api/event/" + val, {
        method: "GET",
        data: {
          date: nowDate,
          uid: localUID
        }
      }).then(function(response) {
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

$(document).on("click", "#addEventBtn", function(event) {
  event.preventDefault();
  var title = $("#addEventTitle")
    .val()
    .trim();

  var strtTime = $("#addEventStartTime").val();
  var endTime = $("#addEventEndTime").val();

  var start = $("#addEventStart")
    .val()
    .trim();
  var end = $("#addEventEnd")
    .val()
    .trim();
  console.log("end: " + end);
  var allDay = $("#allDayCheck").is(":checked");
  var descrip = $("#eventDescription")
    .val()
    .trim();

  var eventStart = start + "T";
  var eventEnd = "";
  if (strtTime === "") {
    eventStart += "00:00";
  } else {
    eventStart += strtTime;
  }
  var eventObj = {
    title: title,
    start: eventStart,
    description: descrip
  };
  if (end === "") {
    eventEnd += start + "T";
  } else {
    eventEnd += end + "T";
  }
  if (endTime === "") {
    eventEnd += "00:00";
  } else {
    eventEnd += endTime;
  }
  if (eventEnd !== " T ") {
    eventObj.end = eventEnd;
  }
  console.log(
    "Start Date: " +
      start +
      " Time: " +
      strtTime +
      " | End Date: " +
      end +
      " Time: " +
      " All Day: " +
      allDay
  );
  eventObj.allDay = allDay;
  $.ajax("/api/event/", {
    method: "POST",
    data: {
      eventOwner: localUID,
      date: start,
      eventObj: JSON.stringify(eventObj)
    }
  });
  $(".bd-addEvent-modal-lg").modal("hide");
});

$(document).on("click", "#getRecommends", function(event) {
  event.preventDefault();
  var ebEventStart = $("#addEventStart")
    .val()
    .trim();
  if (ebEventStart === "") {
    $("#addEventStart").css("color", "red");
  }
  var ebEventStartTime = $("#addEventStartTime").val();
  if (ebEventStartTime === "") {
    $("#addEventStartTime").css("color", "red");
  }
  var eventStartRange = ebEventStart + "T" + ebEventStartTime;
  eventStartRange = moment(eventStartRange).format("YYYY-MM-DDTHH:mm:ss");
  var eventEndRange = moment(eventStartRange)
    .add(1, "hour")
    .format("YYYY-MM-DDTHH:mm:ss");
  console.log(eventEndRange);
  //format the URL
  eventStartRange += "Z";
  eventEndRange += "Z";
  var url =
    "https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=";
  url += eventStartRange;
  url += "&start_date.range_end=";
  url += eventEndRange;
  url +=
    "&categories=103,113,105,104,108,107,102,109,110,111,114,115,116,106,117,118,119&token=E3HXKGT4QLZPWYHIGQD2";
  console.log(url);
  var API = {
    getEvents: function() {
      return $.ajax({
        url: url,
        type: "GET"
      });
    }
  };

  API.getEvents().then(function(events) {
    var count = events.pagination.object_count;
    $("#addEventStart").css("color", "black");
    $("#addEventStartTime").css("color", "black");
    for (var i = 0; i < count; i++) {
      $("#eventRecommendations").append(
        "<p class=recommendEvents>Name:" + events.events[i].name.text + "</p>"
      );
      $("#eventRecommendations").append(
        "<p class=recommendEvents>URL: <a href=" +
          events.events[i].url +
          " target=\"_blank\"" +
          ">" +
          events.events[i].url +
          "</a></p>"
      );
      $("#eventRecommendations").append("<br>");
    }
  });
});
