var express = require('express');
var Tourist = require('../models/tourist-model');
var mongoose = require('mongoose');

var itemRouter = express.Router();



itemRouter
  .route('/tourists')
  .post(function (request, response) {

    console.log('POST /tourists', request.body);

    var item = new Tourist(request.body);
    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {

    console.log('GET /tourists');

      Tourist.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);

      response.json(items);
    });
  });

itemRouter
  .route('/tourist/:id')
  .get(function (request, response) {

    console.log('GET /tourist/:itemId');

    var itemId = request.params.id;

      Tourist.findOne({ _id: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(item);

      response.json(item);

    });
  })
  .put(function (request, response) {

    console.log('PUT /tourist/:itemId');

    var itemId = request.params.id;

      Tourist.findOne({ _id: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
          for (var property in request.body) {
              if (request.body.hasOwnProperty(property)) {
                  if (typeof item[property] !== 'undefined') {
                      item[property] = request.body[property];
                  }
              }
          }
        
        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /tourist/:itemId');

    var itemId = request.params.id;

      Tourist.findOne({ _id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
            }
          }
        }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /tourist/:itemId');

    var itemId = request.params.id;

      Tourist.findOne({ _id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Item with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      }
    });
  });

module.exports = itemRouter;