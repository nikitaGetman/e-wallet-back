const dbDriver = require("../database/db");

const AccountsController = {
  getCardsByUserId: async (id) => {
    if (id === undefined) return;
    const [rows, fields] = await dbDriver.getCardsByUserId(id);
    return rows;
  },

  addCardToUser: async ({
    number,
    cvc,
    expireMonth,
    expireYear,
    holderName,
    userId,
  }) => {
    const params = {
      number,
      cvc,
      expireMonth,
      expireYear,
      holderName,
      userId,
    };

    const [rows, fields] = await dbDriver.addCardToUser(params);
    return rows.affectedRows > 0;
  },

  getBanksByUserId: async (id) => {
    if (id === undefined) return;
    const [rows, fields] = await dbDriver.getBanksByUserId(id);
    return rows;
  },

  addBankToUser: async ({ account, bankName, userId }) => {
    const params = { account, bankName, userId };
    const [rows, fields] = await dbDriver.addBankToUser(params);
    return rows.affectedRows > 0;
  },

  getUserAccount: async (id) => {
    if (id === undefined) return;
    const [rows, fields] = await dbDriver.getUserAccount(id);
    return rows;
  },

  createDeposit: async ({ userId, amount, cardId = null, bankId = null }) => {
    if (cardId) {
      const [rows, fields] = await dbDriver.createDepositFromCard({
        userId,
        cardId,
        amount,
      });
      return rows;
    }
    if (bankId) {
      const [rows, fields] = await dbDriver.createDepositFromBank({
        userId,
        bankId,
        amount,
      });
      return rows;
    }
  },

  getUserActivity: async (id) => {
    if (id === undefined) return;
    const [rows, fields] = await dbDriver.getUserActivity(id);
    return rows;
  },
};

module.exports = AccountsController;
