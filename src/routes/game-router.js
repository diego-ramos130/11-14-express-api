'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');


const Game = require('../model/game');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const storageById = [];
const storageByHash = {};

router.post('/api/games', jsonParser, (request, response, next) => {
  if (!request.body) {
    return next(new HttpError(400, 'body is required'));
  }
  if (!request.body.game) {
    return next(new HttpError(400, 'game name is required'));
  }
  if (!request.body.type) {
    return next(new HttpError(400, 'game type is required'));
  }
  const game = new Game(request.body.game, request.body.type);
  storageById.push(game.id);
  storageByHash[game.id] = game;

  logger.log(logger.INFO, 'successful, sending a 200 and returning json object of what user made');
  logger.log(logger.INFO, storageById);
  logger.log(logger.INFO, storageByHash);
  return response.json(game);
});

router.get('/api/games/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `trying to get a game by the id of ${request.params.id}`);
  if (storageByHash[request.params.id]) {
    logger.log(logger.INFO, 'successful, responding with a 200 status code and json data');
    return response.json(storageByHash[request.params.id]);
  }
  return next(new HttpError(404, 'The note was not found'));
});
router.get('/api/games/', jsonParser, (request, response, next) => {
  return next(new HttpError(400, 'provide an id'));
});

router.delete('/api/games/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `trying to delete a game by the id of ${request.params.id}`);
  if (storageByHash[request.params.id]) {
    logger.log(logger.INFO, 'element found');
    const idx = storageById.indexOf(request.params.id);
    storageById.splice(idx, 1);
    delete storageByHash[request.params.id];
    return response.sendStatus(204);
  }
  return next(new HttpError(404, 'the game wasn\'t found'));
});

router.put('/api/games/:id', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, `trying to update a game by the id of ${request.params.id}`);
  if (storageByHash[request.params.id]) {
    logger.log(logger.INFO, 'element to be updated found');
    if (request.body.game) {
      storageByHash[request.params.id].game = request.body.game;
    }
    if (request.body.type) {
      storageByHash[request.params.id].type = request.body.type;
    }
    return response.json(storageByHash[request.params.id]);
  }
  return next(new HttpError(404, 'could not find element!'));
});
