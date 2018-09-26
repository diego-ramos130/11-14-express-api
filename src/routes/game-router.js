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
  storageByHash[note.id] = note;
});
