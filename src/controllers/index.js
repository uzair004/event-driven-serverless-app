'use strict';

const { getApiInfo, isValidEmail, missingItem } = require('../util/util');

const {
  helloWorldUC,
  createOrderUC,
  processOrderUC,
  getCustomerOrdersUC,
} = require('../use-cases');
const { makeHelloWorldC } = require('./helloWorldC');
const { makeCreateOrderC } = require('./createOrderC');
const { makeProcessOrderC } = require('./processOrderC');
const { makeGetCustomerOrdersC } = require('./getCustomerOrders');

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

const getCustomerOrdersC = makeGetCustomerOrdersC({
  getApiInfo,
  missingItem,
  getCustomerOrdersUC,
});

const requestController = Object.freeze({
  helloWorldC,
  createOrderC,
  processOrderC,
  getCustomerOrdersC,
});

module.exports = {
  helloWorldC,
  createOrderC,
  processOrderC,
  requestController,
  getCustomerOrdersC,
};
