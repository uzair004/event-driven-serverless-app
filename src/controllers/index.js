'use strict';

const {
  getApiInfo,
  getRemoteIp,
  isValidEmail,
  missingItem,
} = require('../util/util');

const { helloWorldUC, createOrderUC } = require('../use-cases');
const { makeHelloWorldC } = require('./helloWorldC');
const { makeCreateOrderC } = require('./createOrderC');

const helloWorldC = makeHelloWorldC({
  helloWorldUC,
  getApiInfo,
  getRemoteIp,
  isValidEmail,
  missingItem,
});

const createOrderC = makeCreateOrderC({
  getApiInfo,
  getRemoteIp,
  missingItem,
  createOrderUC,
});

const requestController = Object.freeze({
  helloWorldC,
  createOrderC,
});

module.exports = { helloWorldC, createOrderC, requestController };
