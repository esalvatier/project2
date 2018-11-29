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



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bootcampproject44@gmail.com',
    pass: 'YESYESYES'
  }
});

var mailOptions = {
  from: 'bootcampproject44@gmail.com',
  to: 'dmitrii_zakharov@hotmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});




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

request.get('https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&start_date.range_start=2018-11-29T13:00:00Z&start_date.range_end=2018-11-29T18:00:00Z&token=E3HXKGT4QLZPWYHIGQD2', function(err,res,body){
  if(err) {
    console.log ("Error: "+err.message);
  }
  if(res.statusCode == 200 ) {
    console.log("Response:" + res.body );
  }
});




