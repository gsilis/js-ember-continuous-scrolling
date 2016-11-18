/*jshint node:true*/
var Faker = require('faker');

module.exports = function(app, DB) {
  var express = require('express');
  var accountsRouter = express.Router();
  var accounts = DB.createFor('accounts');

  for (var i = 0; i < 2; i++) {
    accounts.add({ first_name: Faker.name.firstName(), last_name: Faker.name.lastName() });
  }

  accountsRouter.get('/', function(req, res) {
    res.send(accounts.query(req.query).asJSON('accounts'));
  });

  accountsRouter.get('/:id', function(req, res) {
    var intId = parseInt(req.params.id);
    res.send({ account: accounts.find(intId) });
  });

  app.use('/api/accounts', accountsRouter);
};
