'use strict';

const express = require('express');
const logger = require('./logger');
const loggerMiddleware = require('./logger-middleware');
const errorMiddleware = require('./error-middleware');

const gameRoutes = require('../routes/game-router');

const app = express();

app.use(loggerMiddleware);

app.use(gameRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from catch-all/default route (the route was not found');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const server = module.exports = {};
let internalServer = null;

server.start = () => {
  internalServer = app.listen(process.env.PORT, () => {
    logger.log(logger.INFO, `server is listening on port ${process.env.PORT}`);
  });
};

server.end = () => {
  internalServer.close(() => {
    logger.log(logger.INFO, 'the server is off!');
  });
};