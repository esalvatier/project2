"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var nodemailer = require('nodemailer');
var http = require('http');
var request=require('request');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

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

// request.get('https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=2018-12-01T13:00:00Z&start_date.range_end=2018-12-01T18:00:00Z&categories=103,113,105,104,108,107,102,109,110,111,114,115,116,106,117,118,119&token=E3HXKGT4QLZPWYHIGQD2', function(err,res,body){
//   if(err) {
//     console.log ("Error: "+err.message);
//   }
//   if(res.statusCode == 200 ) {
//     console.log("Response:" + res.body );
//     var events = JSON.parse(res.body);
//     console.log("Parsed JSON: " + events);
//     var count = events.pagination.object_count;
//     console.log("count: " + count);

//     for (var i=0; i<count; i++) {
//       console.log("Name: " + events.events[i].name.text);
//       //console.log("Description: " + events.events[i].description.text);
//       console.log("Url: " + events.events[i].url);
//       console.log("\n");
//     }

//   }
// });

// request.get('https://www.eventbriteapi.com/v3/categories/?token=E3HXKGT4QLZPWYHIGQD2', function(err,res,body){
//   if(err) {
//     console.log ("Error: "+err.message);
//   }
//   // if(res.statusCode == 200 ) {
//     console.log(body);
//     for (var i=0; i<21; i++) {
//       console.log(JSON.parse(body).categories[i].id);
//       console.log(JSON.parse(body).categories[i].short_name);
//       console.log("\n");
//     }
    


  
// });
