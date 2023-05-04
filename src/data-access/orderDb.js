'use strict';

const { makeTs, head } = require('../util/util');

const { OrderDM } = require('../model/dataModel');

function makeOrderDb({ makeDb, makeDbConnect, getTableName }) {
  return Object.freeze({ createOrder, getCustomerOrders, getOrder });

  async function createOrder({ orderId, userId, ...itemInput }) {
    const db = makeDb({ makeDbConnect, getTableName });

    const requestInfo = {
      ...itemInput,
      ...{ createdAt: makeTs(), updatedAt: makeTs() },
    };

    const itemInfo = {
      PK: OrderDM.makePK(),
      SK: OrderDM.makeSK({ orderId, userId }),
      orderId,
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

    const result = await db.query({ itemInfo, operator: 'begins_with' });

    return head(result);
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
}

module.exports = {
  makeOrderDb,
};