'use strict';

const { getApiInfo, isValidEmail, missingItem } = require('../util/util');

const { helloWorldUC, createOrderUC, processOrderUC } = require('../use-cases');
const { makeHelloWorldC } = require('./helloWorldC');
const { makeCreateOrderC } = require('./createOrderC');
const { makeProcessOrderC } = require('./processOrderC');

const helloWorldC = makeHelloWorldC({
  helloWorldUC,
  getApiInfo,
  isValidEmail,
  missingItem,
});

const createOrderC = makeCreateOrderC({
  getApiInfo,
  missingItem,
  createOrderUC,
});

const processOrderC = makeProcessOrderC({ processOrderUC });

const requestController = Object.freeze({
  helloWorldC,
  createOrderC,
  processOrderC,
});

module.exports = {
  helloWorldC,
  createOrderC,
  processOrderC,
  requestController,
};
