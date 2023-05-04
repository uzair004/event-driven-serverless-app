'use strict';

const { pushToQueue } = require('../util/aws');
const { makeOrder } = require('../domain/user');
const { orderDb } = require('../data-access');

const { makeHelloWorldUC } = require('./helloWorldUC');
const { makeCreateOrderUC } = require('./createOrderUC');

const helloWorldUC = makeHelloWorldUC({});
const createOrderUC = makeCreateOrderUC({ orderDb, makeOrder, pushToQueue });

const requestService = Object.freeze({ helloWorldUC, createOrderUC });

module.exports = {
  requestService,
  helloWorldUC,
  createOrderUC,
};
