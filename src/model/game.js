'use strict';

const uuid = require('uuid/v1');

class Game {
  constructor(game, type) {
    this.game = game;
    this.type = type;
    this.id = uuid();
    this.timestamp = new Date();
  }
}

module.exports = Game; 
