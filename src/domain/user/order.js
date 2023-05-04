'use strict';

const { OrderDM } = require('../../model/dataModel');

function buildMakeOrder({ makeTs, makeId }) {
  return function makeOrder({
    id = makeId(),
    userId,
    products,
    address,
    version,
    createdAt = makeTs(),
    type = OrderDM.makeType(),
    updatedAt = makeTs(),
    status = '1',
    statusReason = 'active',
  } = {}) {
    validateInputData();

    return Object.freeze({
      getId: () => id,
      getUserId: () => userId,
      getType: () => type,
      getStatus: () => status,
      getStatusReason: () => statusReason,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getVersion: () => version,
      getProducts: () => products,
      getAddress: () => address,
      hasRequiredAtts: function () {
        if (!id || !userId) {
          return false;
        }
        return true;
      },
      getItem: function () {
        if (!this.hasRequiredAtts()) {
          return undefined;
        }
        return {
          type: this.getType(),
          createdAt: this.getCreatedAt(),
          id: this.getId(),
          userId: this.getUserId(),
          version: this.getVersion(),
          status: this.getStatus(),
          updatedAt: this.getUpdatedAt(),
          statusReason: this.getStatusReason(),
          products: this.getProducts(),
          address: this.getAddress(),
        };
      },

      deactivate: function () {
        statusReason = 'inactive';
        status = '0';
      },
    });

    function validateInputData() {}
  };
}

module.exports = { buildMakeOrder };
