'use strict';

function makeCreateOrderUC({ /*userDb*/ orderDb, makeOrder, pushToQueue }) {
  return async function createOrderUC(requestInfo) {
    const { userId, products, remoteIp, apiInfo } = requestInfo;

    for (const product of products) {
      const { id, quantity } = product;
      if (!id) {
        return {
          statusCode: 400,
          body: { message: 'Invalid Product Requested' },
        };
      }

      if (!quantity) {
        return {
          statusCode: 400,
          body: { message: 'Invalid quantity Requested' },
        };
      }
    }

    // other business logic goes here

    // e.g check if user exists, allowed to place order etc

    // const user = await userDb.getUser({ userId });
    // if (!user) {
    //   return { statusCode: 404, body: { message: 'User Not Found!' } };
    // }

    // e.g verify if requested products exists and not out of stock

    // create order
    const order = makeOrder({
      products,
      userId,
      remoteIp,
      version: apiInfo.version,
    });

    await Promise.all([
      orderDb.createOrder(order.getItem()),
      pushToQueue({ products, userId, orderId: order.getId() }),
    ]);
  };
}

module.exports = { makeCreateOrderUC };
