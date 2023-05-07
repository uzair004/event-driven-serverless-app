'use strict';

const { createSuccessResponseHeaders } = require('../util/util');

function makeGetCustomerOrdersC({ missingItem, getCustomerOrdersUC }) {
  return async function getCustomerOrdersC(event) {
    try {
      const { userId } = event.pathParameters;

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

      const result = await getCustomerOrdersUC({
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

module.exports = { makeGetCustomerOrdersC };
