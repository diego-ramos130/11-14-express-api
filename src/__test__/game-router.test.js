'use strict';

process.env.PORT = 3000;

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const gameMock = require('./lib/mockGame');

const API_URL = `http://localhost:${process.env.PORT}/api/games`;

describe('/api/games', () => {
  beforeAll(server.start);
  afterAll(server.end);
  beforeEach(gameMock.pCleanGameMocks);

  test('should break to 404 in case of $insert_url_that_doesn\'t_exist', () => {
    return superagent.get(`http://localhost:${process.env.PORT}/aaaaaaahhhhhhhhh`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
  test('should give a 200 on a post + json data', () => {
    const originalRequest = {
      game: faker.lorem.words(1),
      type: faker.lorem.words(3),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.game).toEqual(originalRequest.game);
        expect(response.body.type).toEqual(originalRequest.type);
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
  test('should give a 404 on a get that don\'t exist', () => {
    return superagent.get(`${API_URL}/LUUUUUUUUUUUL`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
  test('should give a 400 on passing a get with nothing in the object', () => {
    return superagent.get(`${API_URL}/`)
      .set('Content-Type', 'application/json')
      .send({
        game: 'crontent',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should give 200 if you actually request something with a correct id', () => {
    const originalRequest = {
      game: faker.lorem.words(2),
      type: faker.lorem.words(4),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(originalRequest)
      .then((postResponse) => {
        originalRequest.id = postResponse.body.id;
        return superagent.get(`${API_URL}/${postResponse.body.id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body.timestamp).toBeTruthy();
        expect(getResponse.body.id).toEqual(originalRequest.id);
        expect(getResponse.body.game).toEqual(originalRequest.game);
      });
  });
  test('should give 400 if you post without a required field', () => {
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        game: 'Path of Exile',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should give 200 if you modify a file that does exist', () => {
    let storageID;
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        game: 'Path of Exile',
        type: 'Action Role Playing Game',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.game).toEqual('Path of Exile');
        expect(response.body.type).toEqual('Action Role Playing Game');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        storageID = response.body.id;
        return superagent.put(`${API_URL}/${storageID}`)
          .set('Content-Type', 'application/json')
          .send({
            type: 'Diablo Clone',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.game).toEqual('Path of Exile');
        expect(response.body.type).toEqual('Diablo Clone');
      });
  });
});
