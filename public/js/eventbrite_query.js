// var options = {
//   host: 'www.eventbriteapi.com',
//   path: '/v3/events/search/?location.address=Seattle&start_date.range_start=2018-11-29T13:00:00Z&start_date.range_end=2018-11-29T18:00:00Z&token=E3HXKGT4QLZPWYHIGQD2'
// };

// var req = http.get(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));

//   // Buffer the body entirely for processing as a whole.
//   var bodyChunks = [];
//   res.on('data', function(chunk) {
//     // You can process streamed parts here...
//     bodyChunks.push(chunk);
//   }).on('end', function() {
//     var body = Buffer.concat(bodyChunks);
//     console.log('BODY: ' + body);
//     // ...and/or process the entire body here.
//   })
// });

// req.on('error', function(e) {
//   console.log('ERROR: ' + e.message);
// });

// request.get('https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=2018-11-29T13:00:00Z&start_date.range_end=2018-11-29T18:00:00Z&categories=103,108,110&token=E3HXKGT4QLZPWYHIGQD2', function(err,res,body){
//   if(err) {
//     console.log ("Error: "+err.message);
//   }
//   if(res.statusCode == 200 ) {
//     console.log("Response:" + res.body );
//     var events = JSON.parse(res.body);
//     console.log("Parsed JSON: " + events);
//     console.log("events.events[0].name.text: " + events.events[0].name.text);
//     console.log("events.events[0].description.text: " + events.events[0].description.text);
//     console.log("events.events[0].url: " + events.events[0].url);

//     console.log("events.events[1].name.text: " + events.events[1].name.text);
//     console.log("events.events[1].description.text: " + events.events[1].description.text);
//     console.log("events.events[1].url: " + events.events[1].url);


//   }
// });

request.get('https://www.eventbriteapi.com/v3/categories/?token=E3HXKGT4QLZPWYHIGQD2', function(err,res,body){
  if(err) {
    console.log ("Error: "+err.message);
  }
  // if(res.statusCode == 200 ) {
    console.log(body);
    for (var i=0; i<21; i++) {
      console.log(JSON.parse(body).categories[i].id);
      console.log(JSON.parse(body).categories[i].short_name);
      console.log("\n");
    }
    


  
});
