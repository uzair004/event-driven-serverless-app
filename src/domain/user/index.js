'use strict';

const { buildMakeUser } = require('./user');
const { buildMakeOrder } = require('./order');

const { makeTs, makeId } = require('../../util/util');

const makeUser = buildMakeUser({
  makeTs,
});

const makeOrder = buildMakeOrder({ makeTs, makeId });

module.exports = {
  makeUser,
  makeOrder,
};
