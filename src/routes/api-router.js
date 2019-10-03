/* eslint-disable no-use-before-define */

'use strict';

const express = require('express');

//  Hanna - import express, and create a router

const apiRouter = express.Router();

const modelFinder = require('../../middleware/model-finder');
// const auth = require('../../middleware/auth');

apiRouter.param('model', modelFinder);

apiRouter.get('/api/v1/:model', handleGetAll);
apiRouter.get('/api/v1/:model/:id', handleGetOne);


apiRouter.post('/api/v1/:model/', handlePost);
apiRouter.put('/api/v1/:model/:id', handlePut);
apiRouter.delete('/api/v1/:model/:id', handleDelete);


function handleGetAll(request, response, next) {
  console.log('getall');
  request.model.get() 
    .then((results) => {
      response.json(results);
    })
    .catch((error) => next(error));
}

function handleGetOne(request, response, next) {
  console.log('getone');
  const { id } = request.params.id;
  request.model.get(id)
    .then((results) => response.json(results[0]))
    .catch(next);
}

function handlePost(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then((results) => response.json(results))
    .catch((error) => next(error));
}

function handlePut(request, response, next) {
  console.log(request.body);
  const { id } = request.params.id;
  const data = request.body;
  request.model.put(id, data)
    .then((results) => response.json(results))
    .catch((error) => next(error));
}

function handleDelete(request, response, next) {
  console.log('delete');
  const { id } = request.params.id;
  console.log('hello');
  request.model.delete(id)
    .then((results) => {
      response.status = 204;
    })
    .catch((error) => next(error));
}

module.exports = apiRouter;
