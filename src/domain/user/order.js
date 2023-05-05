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
    orderStatus = 'pending',
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
      getOrderStatus: () => orderStatus,
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
          orderStatus: this.getOrderStatus(),
        };
      },

      deactivate: function () {
        statusReason = 'inactive';
        status = '0';
      },

      updateOrderStatus: function () {
        orderStatus = 'PROCESSED';
      },
    });

    function validateInputData() {}
  };
}

module.exports = { buildMakeOrder };
