var db = require("../models");
var Op = db.Sequelize.Op;
function traverseResponse(response) {
  var data = [];
  response.forEach(function(element) {
    
    data.push(element.dataValues.eventObj);
  });
  return data;
};

module.exports = function(app) {
  app.get("/api/event/true", function(req, res) {
    var date = req.query.date;
    var uid = req.query.uid;
      db.Event.findAll({ where: {[Op.and]: {eventOwner: uid, date: {[Op.lt]: date} }}}).then(function(dbResponse) {
        res.json(traverseResponse(dbResponse));
      });
  });

  app.get("/api/event/false", function(req, res) {
    var date = req.query.date;
    var uid = req.query.uid;
      db.Event.findAll({ where: {[Op.and]: {eventOwner: uid, date: {[Op.gte]: date} }}}).then(function(dbResponse) {
        res.json(traverseResponse(dbResponse));
      });
  });

  app.get("/api/friend/:uid", function(req, res) {
    
    var uid = req.params.uid;

    console.log("uid: " + uid);

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
              [Op.not]: {code: 3}} //, include: [db.status]
            } 
        }
      )
      .then(function(dbExample) {

        console.log("dbExample: " + dbExample);

        dbExample.map(function(relationship) {

        console.log("relationship: " + relationship);
        console.log(relationship);

        db.User.findAll(
          {
            where:
            {
              uid: relationship.targetUser
            }
          }
        )
        .then(function(userFound) {
          console.log("userFound: " + userFound);
          res.json(userFound);
        });

      });

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
    db.Event.create(req.body).then(function(dbExample) {
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
