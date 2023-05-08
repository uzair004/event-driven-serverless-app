/* eslint-disable no-console */
'use strict';

const { makeTs, head } = require('../util/util');

const { OrderDM } = require('../model/dataModel');

function makeOrderDb({ makeDb, makeDbConnect, getTableName }) {
  return Object.freeze({
    createOrder,
    getCustomerOrders,
    getOrder,
    updateItem,
    getCustomerOrder,
  });

  async function createOrder({ id, userId, ...itemInput }) {
    const db = makeDb({ makeDbConnect, getTableName });

    const requestInfo = {
      ...itemInput,
      ...{ createdAt: makeTs(), updatedAt: makeTs() },
    };

    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: OrderDM.makeSK({ orderId: id, userId }),
      orderId: id,
      userId,
      ...requestInfo,
    };

    await db.putItem({ itemInfo });
  }

  async function getCustomerOrders({ userId }) {
    const db = makeDb({ makeDbConnect, getTableName });

    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: `${userId}`,
    };

    const result = await db.query({
      itemInfo,
      operator: 'begins_with',
      limit: 10,
    });

    return result;
  }

  async function getOrder({ userId, orderId }) {
    const db = makeDb({ makeDbConnect, getTableName });

    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: OrderDM.makeSK({ orderId, userId }),
    };

    const result = await db.getItem({ itemInfo });

    return result;
  }

  async function getCustomerOrder({ userId }) {
    const db = makeDb({ makeDbConnect, getTableName });

    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: `${userId}`,
    };

    const result = await db.query({ itemInfo, operator: 'begins_with' });

    return result;
  }

  async function updateItem({ orderId, userId, ...info }) {
    const db = makeDb({ makeDbConnect, getTableName });
    console.log({ orderId, userId });
    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: OrderDM.makeSK({ orderId, userId }),
      ...info,
    };

    console.log({ itemInfo });
    await db.updateItem({ itemInfo });
  }
}

module.exports = {
  makeOrderDb,
};
