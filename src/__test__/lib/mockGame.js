'use strict';

const faker = require('faker');
const Game = require('../../model/game');

const gameMock = module.exports = {};

gameMock.pCreateGameMock = () => {
  return new Game({
    title: faker.lorem.words(10),
    content: faker.lorem.words(10),
  }).save();
};

gameMock.pCleanGameMocks = () => {
  return Game.remove({});
};
