'use strict';

const { missingItem } = require('../util/util');

const {
  createOrderUC,
  processOrderUC,
  updateStockUC,
  getCustomerOrdersUC,
} = require('../use-cases');
const { makeCreateOrderC } = require('./createOrderC');
const { makeProcessOrderC } = require('./processOrderC');
const { makeGetCustomerOrdersC } = require('./getCustomerOrdersC');
const { makeUpdateStockC } = require('./updateStockC');

const createOrderC = makeCreateOrderC({
  missingItem,
  createOrderUC,
});

const processOrderC = makeProcessOrderC({ processOrderUC });

const getCustomerOrdersC = makeGetCustomerOrdersC({
  getCustomerOrdersUC,
});

const updateStockC = makeUpdateStockC({ updateStockUC });

const requestController = Object.freeze({
  createOrderC,
  processOrderC,
  getCustomerOrdersC,
  updateStockC,
});

module.exports = {
  createOrderC,
  processOrderC,
  requestController,
  getCustomerOrdersC,
  updateStockC,
};
