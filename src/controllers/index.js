'use strict';

const { getApiInfo, isValidEmail, missingItem } = require('../util/util');

const {
  helloWorldUC,
  createOrderUC,
  processOrderUC,
  getCustomerOrdersUC,
  updateStockUC,
} = require('../use-cases');
const { makeHelloWorldC } = require('./helloWorldC');
const { makeCreateOrderC } = require('./createOrderC');
const { makeProcessOrderC } = require('./processOrderC');
const { makeGetCustomerOrdersC } = require('./getCustomerOrdersC');
const { makeUpdateStockC } = require('./updateStockC');

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

const updateStockC = makeUpdateStockC({ updateStockUC });

const requestController = Object.freeze({
  helloWorldC,
  createOrderC,
  processOrderC,
  getCustomerOrdersC,
  updateStockC,
});

module.exports = {
  helloWorldC,
  createOrderC,
  processOrderC,
  requestController,
  getCustomerOrdersC,
  updateStockC,
};
