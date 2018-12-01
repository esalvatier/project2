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

var inviteeName = "PLACEHOLDER";
var eventName = "PLACEHOLDER";
var eventDate = "PLACEHOLDER";
var eventTime = "PLACEHOLDER";

var mailOptions = {
  from: 'bootcampproject44@gmail.com',
  to: 'dmitrii_zakharov@hotmail.com',
  subject: 'You are invited!',
  text: 'Dear '+inviteeName+',\n'+'You are invited to attend '+eventName+' on '+eventDate+' at '+ eventTime+ '\n\nCheers!\nTristan, Mark, Dmitrii' 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});









