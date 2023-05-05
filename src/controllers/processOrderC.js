'use strict';

const { createSuccessResponseHeaders } = require('../util/util');

function makeProcessOrderC(/*{ getApiInfo, missingItem }*/) {
  return async function processOrderC(event) {
    try {
      //   const {
      //     Records: [message],
      //   } = event;
      // eslint-disable-next-line no-console
      console.log({ event });
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
