var db = require("../models");
var nodemailer = require("nodemailer");

var Op = db.Sequelize.Op;
function procResp(response) {
  var data = [];
  response.forEach(function(element) {
    var event = JSON.parse(element.dataValues.eventObj);
    event.id = element.dataValues.eventID;
    event = JSON.stringify(event);
    data.push(event);
  });
  return data;
};

module.exports = function(app) {
  app.get("/api/event/true", function(req, res) {
    var date = req.query.date;
    var uid = req.query.uid;
      db.Event.findAll({ where: {[Op.and]: {eventOwner: uid, date: {[Op.lt]: date} }}}).then(function(dbResponse) {
        res.json(procResp(dbResponse));
      });
  });

  app.get("/api/event/false", function(req, res) {
    var date = req.query.date;
    var uid = req.query.uid;
      db.Event.findAll({ where: {[Op.and]: {eventOwner: uid, date: {[Op.gte]: date} }}}).then(function(dbResponse) {
        res.json(procResp(dbResponse));
      });
  });

  app.get("/api/friend/:uid", function(req, res) {

    var uid = req.params.uid;

    db.userRelationship
      .findAll(
        { 
          where: 
          { 
            [Op.and]:
            { [Op.or]: 
              [
                { fromUser: uid }, {targetUser: uid} 
              ], 
              [Op.not]: {code: 3}}
            } 
        }
      )
      .then(function(dbResponse) {
        var responseObj = {
          friends: [],
          requests: []
        };
        dbResponse.forEach(function(elem) {
          if (elem.dataValues.fromUser === uid && elem.dataValues.code === 2) {
            responseObj.friends.push(elem.dataValues);
          } else if (elem.dataValues.fromUser !== uid && elem.dataValues.code === 1) {
            responseObj.requests.push(elem.dataValues);
          }
        });
        res.json(responseObj);
      })
    });


  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/user", function(req, res) {
    db.User.findOne({where: {uid: req.query.uid}}).then(function(dbExample) {
      res.json(dbExample);
    });
  });


  app.post("/api/event", function(req, res) {
    db.Event.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/friend", function(req, res) {
    var fromUser = req.body.fromUser;
    var targetUser = req.body.targetUser;
    var status = req.body.status;
    db.userRelationship
      .create({ fromUser: fromUser, targetUser: targetUser, code: status })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  app.put("/api/friend", function(req, res) {
    var relID = req.body.id;
    var newStatus = req.body.status;
    db.userRelationship
      .update({ code: newStatus }, { where: { relID: relID } })
      .then(function(dbExample) {
        res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });


app.post("/api/email", function(req, res) {
  var email = req.body.email;
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bootcampproject44@gmail.com',
      pass: 'YESYESYES'
    }
  });
   
  var inviteeName = "friend";
   
  var mailOptions = {
    from: 'bootcampproject44@gmail.com',
    to: email,
    subject: 'You are invited!',
    text: 'Dear '+inviteeName+',\n'+'you are invited to join http://localhost:3000/ \n\nCheers!\nTristan, Mark, Dmitrii'
  };
   
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});


app.get("/api/search", function(req, res) {
  db.User.findAll({where: {[Op.or]: 
    [
      { firstName: req.query.searchterm }, {lastName: req.query.searchterm}, {email: req.query.searchterm} 
    ], 
    }}).then(function(dbExample) {
    res.json(dbExample);
  });
});

};

