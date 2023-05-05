/* eslint-disable no-console */
'use strict';

function makeUpdateStockUC({ productsDb, makeProduct }) {
  return async function updateStockUC(requestInfo) {
    const { /*orderId, userId,*/ products } = requestInfo;

    // get products from db
    const queries = [];
    products.forEach((product) => {
      const { id } = product;
      queries.push(productsDb.getProduct({ productId: id }));
    });

    const productsInfo = await Promise.all(queries);
    console.log({ productsInfo });
    console.log({ makeProduct });
    // TODO: to be implemented

    // for each retrieved product, subract its quantity by given value (ordered quanity)

    // make a list of db update quires
    // update products using promise.all in database
  };
}

module.exports = { makeUpdateStockUC };
