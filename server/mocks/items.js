/*jshint node:true*/
var Faker = require('faker');

module.exports = function(app, DB) {
  var express = require('express');
  var itemsRouter = express.Router();
  var items = DB.createFor('items');
  var accounts = DB.accounts.query({}).asJSON('accounts').accounts;
  var accountIndex;
  var primaryAccount = accounts[0];
  var secondaryAccount = accounts[1];

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
    var activities = items.query(req.query).asJSON('items');
    var altAccountItems = [];

    activities.meta.markers = [];

    for (var i = 0; i < activities.items.length; i++) {
      var activity = activities.items[i];

      if (activity.account_id === primaryAccount.id) {
        if (altAccountItems.length > 2) {
          var groupEndedAt = i;
          var groupStartedAt = groupEndedAt - altAccountItems.length;
          var ids = altAccountItems.map(item => item.id);

          i -= altAccountItems.length;
          activities.items.splice(groupStartedAt, altAccountItems.length);
          activities.meta.markers.push({ ids: ids, at_index: groupStartedAt, account_id: secondaryAccount.id });
        }

        altAccountItems = [];
      } else {
        altAccountItems.push(activity);
      }
    }

    res.send(activities);
  });

  itemsRouter.get('/:id', function(req, res) {
    var item = items.find(parseInt(req.params.id));

    res.send({
      item: item
    });
  });

  app.use('/api/items', itemsRouter);
};
