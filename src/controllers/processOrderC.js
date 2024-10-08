/* eslint-disable no-console */
'use strict';

const { createSuccessResponseHeaders } = require('../util/util');

function makeProcessOrderC({ processOrderUC }) {
  return async function processOrderC(event) {
    try {
      const {
        Records: [{ body }],
      } = event;

      const { orderId, userId, products } = JSON.parse(body);

      await processOrderUC({ orderId, userId, products });
    } catch (err) {
      console.error(err);
      return createResponse({
        response: {
          statusCode: 500,
          body: { message: 'Interval Server Error' },
        },
      });
    }
  };
}

const createResponse = ({ response }) => {
  return {
    statusCode: response.statusCode,
    headers: createSuccessResponseHeaders(),
    body: JSON.stringify(response.body),
  };
};

module.exports = { makeProcessOrderC };
