'use strict';

const { createSuccessResponseHeaders } = require('../util/util');

function makeUpdateStockC({ updateStockUC }) {
  return async function updateStockC(event) {
    try {
      const {
        Records: [{ body }],
      } = event;

      const { products, orderId, userId } = JSON.parse(body);

      const result = await updateStockUC({ products, orderId, userId });

      return createResponse({ response: result });
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

module.exports = { makeUpdateStockC };
