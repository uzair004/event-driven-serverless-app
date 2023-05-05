'use strict';

function makeProcessOrderUC({ pushToQueue, makeOrder, orderDb }) {
  return async function processOrderUC(requestInfo) {
    const { orderId, userId, products } = requestInfo;

    // get order by Id
    const orderInfo = await orderDb.getOrder({ userId, orderId });
    const order = makeOrder(orderInfo);

    // change its status to 'PROCESSED'
    order.updateOrderStatus();

    // update it to db
    await orderDb.updateItem(order.getItem());

    // push to next processed orders queue
    await pushToQueue(
      {
        userId,
        orderId,
        products,
      },
      'ProcessedOrdersQueue'
    );
  };
}

module.exports = { makeProcessOrderUC };
