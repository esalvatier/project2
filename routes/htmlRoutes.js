var db = require("../models");

var script = "../public/js/auth.js";

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples,
        script: script
      });
    });
  });

  app.get("/history", function(req, res) {
    res.render("history");
  });
  
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/events", function(req, res) {

    res.render("events");
  });

  app.get("/sign-in", function(req, res) {
    
    res.render("sign-in");
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });



};
