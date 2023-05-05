'use strict';

const { pushToQueue } = require('../util/aws');
const { makeOrder } = require('../domain/user');
const { orderDb } = require('../data-access');

const { makeHelloWorldUC } = require('./helloWorldUC');
const { makeCreateOrderUC } = require('./createOrderUC');
const { makeProcessOrderUC } = require('./processOrderUC');

const helloWorldUC = makeHelloWorldUC({});
const createOrderUC = makeCreateOrderUC({ orderDb, makeOrder, pushToQueue });
const processOrderUC = makeProcessOrderUC({ orderDb, makeOrder, pushToQueue });

const requestService = Object.freeze({
  helloWorldUC,
  createOrderUC,
  processOrderUC,
});

module.exports = {
  requestService,
  helloWorldUC,
  createOrderUC,
  processOrderUC,
};
