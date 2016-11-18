/*jshint node:true*/
var Faker = require('faker');

module.exports = function(app, DB) {
  var express = require('express');
  var itemsRouter = express.Router();
  var items = DB.createFor('items');
  var accounts = DB.accounts.query({}).asJSON('accounts').accounts;
  var accountIndex;

  for (var i = 0; i < 1000; i++) {
    accountIndex = Math.floor(2 * Math.random());

    items.add({
      first_name: Faker.name.firstName(),
      last_name: Faker.name.lastName(),
      birthdate: Faker.date.past(),
      account_id: accounts[accountIndex].id,
    });
  }

  itemsRouter.get('/', function(req, res) {
    res.send(items.query(req.query).asJSON('items'));
  });

  app.use('/api/items', itemsRouter);
};
