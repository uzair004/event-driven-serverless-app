'use strict';

const { pushToQueue } = require('../util/aws');
const { makeOrder, makeProduct } = require('../domain/user');
const { orderDb, productsDb } = require('../data-access');

const { makeCreateOrderUC } = require('./createOrderUC');
const { makeProcessOrderUC } = require('./processOrderUC');
const { makeGetCustomerOrdersUC } = require('./getCustomerOrdersUC');
const { makeUpdateStockUC } = require('./updateStockUC');

const createOrderUC = makeCreateOrderUC({ orderDb, makeOrder, pushToQueue });
const processOrderUC = makeProcessOrderUC({ orderDb, makeOrder, pushToQueue });
const getCustomerOrdersUC = makeGetCustomerOrdersUC({ orderDb, makeOrder });
const updateStockUC = makeUpdateStockUC({ productsDb, makeProduct });

const requestService = Object.freeze({
  createOrderUC,
  processOrderUC,
  getCustomerOrdersUC,
  updateStockUC,
});

module.exports = {
  requestService,
  createOrderUC,
  processOrderUC,
  getCustomerOrdersUC,
  updateStockUC,
};
