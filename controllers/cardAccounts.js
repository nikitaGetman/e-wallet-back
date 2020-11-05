const dbDriver = require("../database/db");

const CardAccounts = {
  getCardsByUserId: async (id) => {
    if (id === undefined) return;

    const [rows, fields] = await dbDriver.getCardsByUserId(id);
    if (rows.length > 0) {
      return rows[0];
    } else return;
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
};

module.exports = CardAccounts;
