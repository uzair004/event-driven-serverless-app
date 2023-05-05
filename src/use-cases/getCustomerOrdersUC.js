'use strict';

function makeGetCustomerOrdersUC({ orderDb, makeOrder }) {
  return async function getCustomerOrdersUC(requestInfo) {
    const { userId } = requestInfo;

    const allOrders = [];

    const ordersInfo = await orderDb.getCustomerOrder({ userId });
    ordersInfo.forEach((orderInfo) => {
      const order = makeOrder(orderInfo);
      allOrders.push(order.getItem());
    });

    return {
      statusCode: 200,
      body: allOrders,
    };
  };
}

module.exports = { makeGetCustomerOrdersUC };
