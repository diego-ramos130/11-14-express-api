'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Game = require('../model/game');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/games', jsonParser, (request, response, next) => {
  return new Game(request.body).save()
    .then((savedGame) => {
      logger.log(logger.INFO, 'responding with a 200 status code & json data');
      return response.json(savedGame);
    })
    .catch(next);
});

router.get('/api/games/:id', jsonParser, (request, response, next) => {
  return Game.findById(request.params.id)
    .then((game) => {
      if (game) {
        logger.log(logger.INFO, 'responding with 200 status code and JSON return data.');
        return response.json(game);
      }
      logger.log(logger.INFO, '404 response, game not found.');
      return next(new HttpError(404, 'game not found'));
    })
    .catch(next);
});

router.delete('/api/games/:id', jsonParser, (request, response, next) => {
  return Game.findByIdAndRemove(request.params.id)
    .then(() => {
      logger.log(logger.INFO, `successfully deleted game by id of ${request.params.id}`);
      return response.sendStatus(200);
    })
    .catch(next);
});

router.put('/api/games/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `trying to update a game by the id of ${request.params.id}`);
  return Game.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((newGame) => {
      if (newGame) {
        logger.log(logger.INFO, 'responding with 200 status code and JSON return data');
        return response.json(newGame);
      }
      logger.log(logger.INFO, '404 response, game not found.');
      return next(new HttpError(404, 'game not found'));
    })
    .catch(next);
});
