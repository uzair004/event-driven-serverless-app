'use strict';
const { ulid } = require('ulid');

function getApiInfo(event) {
  let splitPath;
  if (event.path) {
    splitPath = event.path.split('/'); // for rest APIs
  } else {
    splitPath = event.rawPath.split('/'); // for http APIs
  }
  const apiInfo = {
    apiVersion: splitPath[1],
    apiCategory: splitPath[2],
    apiName: splitPath[3],
  };
  return apiInfo;
}

//  Todo:
//  1.  Detect type of API (HTTP-API or REST) and process accordingly.
function getRemoteIp(event) {
  if (event.headers['X-Forwarded-For']) {
    return event.headers['X-Forwarded-For'].split(', ')[0];
  } else {
    return event.headers['x-forwarded-for'].split(', ')[0];
  }
}

//  1.  Detect type of API (HTTP-API or REST) and process accordingly.
function getPath(event) {
  if (event.httpMethod) {
    return event.path;
  } else {
    return event.rawPath;
  }
}

function makeId() {
  return ulid();
}

function makeTs() {
  return new Date().valueOf();
}

const isValueTrue = (value) => value.toUpperCase() === 'TRUE';

const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getAuthorizationToken = (event) => {
  if (!event.headers) {
    return undefined;
  }
  if (event.headers.authorization) {
    if (event.headers.authorization.split(' ')[0] !== 'Bearer')
      return undefined;
    else return event.headers.authorization.split(' ')[1];
  } else if (event.headers.Authorization) {
    if (event.headers.Authorization.split(' ')[0] !== 'Bearer')
      return undefined;
    else return event.headers.Authorization.split(' ')[1];
  }
  return undefined;
};

const unique = (array) => {
  return [...new Set(array)];
};

const createSuccessResponseHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  Accept: '*',
});

const missingItem = (item) => {
  return {
    response: {
      statusCode: 400,
      body: { message: `Missing ${item}` },
    },
  };
};

const head = (array) => {
  if (array !== null && array.length) {
    return array[0];
  } else {
    return undefined;
  }
};

module.exports = {
  getApiInfo,
  getRemoteIp,
  makeId,
  makeTs,
  isValueTrue,
  titleCase,
  getAuthorizationToken,
  unique,
  getPath,
  createSuccessResponseHeaders,
  missingItem,
  head,
};
