var express = require('express');
var Flight = require('../models/flight-model');
var itemRouter = express.Router();

itemRouter
    .route('/flights')
    .post(function (request, response) {

        console.log('POST /items');

        var item = new Flight(request.body);

        item.save(function(param){
            console.log(param);
        });

        console.log('POST /items:', item);
        response.status(201).send(item);
    })
    .get(function (request, response) {

        console.log('GET /items');

        Flight.find(function (error, items) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            console.log(items);

            response.json(items);
        });
    });

itemRouter
    .route('/flight/:id')
    .get(function (request, response) {

        console.log('GET /items/:itemId');

        var itemId = request.params.id;

        Flight.findOne({_id: itemId}, function (error, item) {

            if (error) {
                response.status(500).send(error);
                return;
            }
            response.json(item);

        });
    })
    .put(function (request, response) {

        console.log('PUT /items/:itemId');

        var itemId = request.params.id;

        Flight.findOne({_id: itemId}, function (error, item) {

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

        console.log('PATCH /items/:itemId');

        var itemId = request.params.id;

        Flight.findOne({_id: itemId}, function (error, item) {

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

        console.log('DELETE /items/:itemId');

        var itemId = request.params.id;

        Flight.findOne({_id: itemId}, function (error, item) {

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