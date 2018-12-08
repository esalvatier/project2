var db = require("../models");

var script = "../public/js/auth.js";

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/history", function(req, res) {
    res.render("history");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/friends", function(req, res) {
    res.render("friends");
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
