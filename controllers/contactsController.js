const dbDriver = require("../database/db");

const ContactsController = {
  getUserContacts: async (id) => {
    if (id === undefined) return;
    const [rows, fields] = await dbDriver.getUserContacts(id);
    return rows;
  },
  getUsers: async () => {
    const [rows, fields] = await dbDriver.getAllUsers();
    return rows;
  },
  addUserToContacts: async ({ userId, contactId }) => {
    const [rows, fields] = await dbDriver.addUserToContacts({
      userId,
      contactId,
    });
    return rows;
  },
  depositToContact: async ({ fromUserId, toUserId, amount }) => {
    const [rows, fields] = await dbDriver.addUserToContacts({
      fromUserId,
      toUserId,
      amount,
    });
    return rows;
  },
};

module.exports = ContactsController;
