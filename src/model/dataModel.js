'use strict';

const AllDM = {};
const Prefix = {};
const BaseDM = {
  PK: 'PK',
  SK: 'SK',
  type: 'type',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status',
  statusReason: 'statusReason',
};

const BaseGSI1DM = {
  PK1: 'PK1',
  SK1: 'SK1',
};

const UserDM = {
  ...BaseDM,
  ...BaseGSI1DM,
  userId: 'userId',
  profileImage: 'profileImage',
  fullName: 'fullName',
  email: 'email',
  password: 'password',

  makeType: () => 'USER',

  makePK: (userId) => `U#${userId}`,
  makeSK: () => `A`,
  splitPK: (_PK) => ({ userId: _PK.split('#')[1] }),
  splitSK: () => undefined,

  makePK1: (email) => `UE#${email}`,
  makeSK1: () => `A`,
  splitPK1: (_PK) => ({ email: _PK.split('#')[1] }),
  splitSK1: () => undefined,
};
AllDM[UserDM.makeType()] = UserDM;
Prefix[UserDM.makeType()] = 'U';

const OrderDM = {
  ...BaseDM,

  userId: 'userId',

  products: [
    {
      id: 'product id',
      name: 'product name',
      quantity: 'quantity',
    },
  ],

  address: {
    city: 'city name',
    zip: 'city zip code',
    state: 'state name',
  },

  makeType: () => 'ORDER',

  makePK: () => `Orders`,
  splitPK: () => undefined,

  makeSK: ({ userId, orderId }) => `${userId}#${orderId}`,
  splitSK: (_SK) => {
    return {
      userId: _SK.split('#')[0],
      orderId: _SK.split('#')[1],
    };
  },
};

module.exports = {
  AllDM,
  UserDM,
  OrderDM,
};
