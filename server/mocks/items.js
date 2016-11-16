/*jshint node:true*/
var Faker = require('faker');

module.exports = function(app, db) {
  var express = require('express');
  var itemsRouter = express.Router();

  for (var i = 0; i < 1000; i++) {
    db.add({
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      birthdate: Faker.date.past(),
    });
  }

  itemsRouter.get('/', function(req, res) {
    res.send(db.query(req.query).asJSON('items'));
  });

  app.use('/api/items', itemsRouter);
};
