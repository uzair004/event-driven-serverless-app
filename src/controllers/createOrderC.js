'use strict';

const { createSuccessResponseHeaders } = require('../util/util');

function makeCreateOrderC({ getApiInfo, missingItem, createOrderUC }) {
  return async function createOrderC(event) {
    try {
      const apiInfo = getApiInfo(event);

      const { body } = event;
      if (!body) return createResponse(missingItem('Body'));

      const { data, userId } = JSON.parse(body); // get userId from token instead if auth implemented
      if (!data) return createResponse(missingItem('Data'));

      if (!userId) return createResponse(missingItem('UserID'));
      if (userId < 5) {
        return createResponse({
          response: {
            statusCode: 400,
            body: {
              message: 'Invalid User ID',
            },
          },
        });
      }

      const { products } = data;
      if (!products) return createResponse(missingItem('Products'));
      if (!products.length) {
        return createResponse({
          response: {
            statusCode: 400,
            body: {
              message: 'No Products Selected',
            },
          },
        });
      }

      const result = await createOrderUC({
        apiInfo,
        products,
        userId,
      });

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

module.exports = { makeCreateOrderC };
