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

  console.log(db.items);

  itemsRouter.get('/', function(req, res) {
    res.send({
      'items': []
    });
  });

  itemsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  itemsRouter.get('/:id', function(req, res) {
    res.send({
      'items': {
        id: req.params.id
      }
    });
  });

  itemsRouter.put('/:id', function(req, res) {
    res.send({
      'items': {
        id: req.params.id
      }
    });
  });

  itemsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/items', require('body-parser').json());
  app.use('/api/items', itemsRouter);
};
