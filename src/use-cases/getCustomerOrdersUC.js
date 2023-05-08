'use strict';

function makeGetCustomerOrdersUC({ orderDb, makeOrder }) {
  return async function getCustomerOrdersUC(requestInfo) {
    const { userId } = requestInfo;

    const allOrders = [];

    const ordersInfo = await orderDb.getCustomerOrders({ userId });
    ordersInfo.forEach((orderInfo) => {
      const order = makeOrder(orderInfo);
      allOrders.push({
        createdAt: order.getCreatedAt(),
        updatedAt: order.getUpdatedAt(),
        id: order.getId(),
        userId: order.getUserId(),
        products: order.getProducts(),
        orderStatus: order.getOrderStatus(),
      });
    });

    return {
      statusCode: 200,
      body: { orders: allOrders },
    };
  };
}

module.exports = { makeGetCustomerOrdersUC };
