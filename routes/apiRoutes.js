var db = require("../models");
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
      .findAll({ where: { [Op.and]:{[Op.or]: [{ fromUser: uid }, {targetUser: uid} ], [Op.not]: {code: 3}}, include: [db.Status] }
      })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/user", function(req, res) {
    console.log(req.query);
    db.User.findOne({where: {uid: req.query.uid}}).then(function(dbExample) {
      res.json(dbExample);
    });
  });


  app.post("/api/event", function(req, res) {
    var event = {
      title: "Mark's Event",
      start: "2018-12-17T12:00:00"
    };
    var test = {
      date: "2018-12-17",
      eventOwner: "qdcULZhNITN4rBQUe0lIWP9SvIt2",
      eventObj: JSON.stringify(event)
    };
    db.Event.create(test).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/friend", function(req, res) {
    var fromUser = req.body.fromUser;
    var targetUser = req.body.targetUser;
    var status = req.body.status;
    db.userRelationship
      .create({ fromUser: fromUser, targetUser: targetUser, meaning: status })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });

  app.put("/api/friend", function(req, res) {
    var relID = req.body.id;
    var newStatus = req.body.status;
    db.userRelationship
      .update({ meaning: newStatus }, { where: { relID: relID } })
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
};
