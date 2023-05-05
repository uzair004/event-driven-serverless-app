/* eslint-disable no-console */
'use strict';

function makeProcessOrderUC({ pushToQueue, makeOrder, orderDb }) {
  return async function processOrderUC(requestInfo) {
    const { orderId, userId, products } = requestInfo;

    // get order by Id
    const orderInfo = await orderDb.getOrder({ userId, orderId });
    const order = makeOrder({ ...orderInfo, id: orderId });

    // change its status to 'PROCESSED'
    order.updateOrderStatus();

    // update it to db
    await orderDb.updateItem({
      ...order.getItem(),
      orderId: order.getId(),
      userId,
    });

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
