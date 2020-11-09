const mysql = require("mysql2/promise");

const driver = {
  connection: null,
  async init() {
    try {
      this.connection = await mysql.createConnection({
        host: "localhost",
        user: "admin",
        database: "mydb",
        password: "admin",
      });
    } catch (err) {
      if (err.code === "ECONNREFUSED") {
        console.log("Cannot connect to database");
      } else {
        console.log(err);
      }
    }
  },
  async getConnection() {
    if (!this.connection) await this.init();
    return this.connection;
  },
  async exec(sql, params) {
    if (sql.length === 0) {
      console.log("EMPTY SQL", params);
      return;
    }
    const conn = await this.getConnection();
    return await conn.execute(sql, params);
  },
  disconnect() {
    this.connection.end(function (err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });
  },

  // user
  async createUser(params) {
    const sql =
      "INSERT INTO `mydb`.`users` (`login`,`password`,`salt`,`name`,`surname`,`user_type`) VALUES(?,?,?,?,?,1);";

    return await this.exec(sql, [
      params.login,
      params.password,
      params.salt,
      params.name,
      params.surname,
    ]);
  },
  async authUser({ login, password }) {
    const sql =
      "SELECT `users`.`id`,  `users`.`name`,`users`.`surname`,`users`.`created_at`,`users`.`user_type` FROM `mydb`.`users` WHERE `users`.`login` = ? and `users`.`password` = ?; ";
    return await this.exec(sql, [login, password]);
  },
  async getProfileById(id) {
    const sql =
      "SELECT  `users`.`name`,`users`.`surname`,`users`.`login` FROM `mydb`.`users` WHERE `users`.`id` = ?; ";
    return await this.exec(sql, [id]);
  },

  // accounts
  async getCardsByUserId(id) {
    const sql = "SELECT * FROM `mydb`.`cards` WHERE `cards`.`user_id` = ?;";
    return this.exec(sql, [id]);
  },
  async addCardToUser({
    number,
    cvc,
    expireMonth,
    expireYear,
    holderName,
    userId,
  }) {
    const sql =
      "INSERT INTO `mydb`.`cards` (`user_id`,`card_number`,`expire_year`,`expire_month`,`holder_name`,`cvv`) VALUES (?,?,?,?,?,?);";
    return this.exec(sql, [
      userId,
      number,
      expireYear,
      expireMonth,
      holderName,
      cvc,
    ]);
  },
  async getBanksByUserId(id) {
    const sql =
      "SELECT * FROM `mydb`.`bank_accounts` WHERE `bank_accounts`.`user_id` = ?;";
    return this.exec(sql, [id]);
  },
  async addBankToUser({ account, bankName, userId }) {
    const sql =
      "INSERT INTO `mydb`.`bank_accounts` (`user_id`,`bank_name`,`account`) VALUES (?,?,?);";
    return this.exec(sql, [userId, bankName, account]);
  },

  async getAccountByUserId(userId) {
    const sqlForAccountId =
      "SELECT * FROM `mydb`.`accounts` WHERE `accounts`.`user_id` = ?;";
    const res = await this.exec(sqlForAccountId, [userId]);
    return res[0][0]; // TODO TEST it
  },

  async getUserAccount(id) {
    const accountId = await this.getAccountByUserId(id);
    const sql = "call `get_account_balance`(?);";
    return this.exec(sql, [accountId]);
  },
  async getUserActivity(id) {
    const accountId = await this.getAccountByUserId(id);
    const sql =
      "SELECT * FROM `mydb`.`transactions` WHERE `transactions`.`from` = ? or `transactions`.`to` = ?;";
    return this.exec(sql, [accountId, accountId]);
  },

  async createDepositFromCard({ userId, cardId, amount }) {
    const accountId = await this.getAccountByUserId(userId);
    const sql =
      "INSERT INTO `mydb`.`transactions`(`to`,`amount`) VALUES (?, ?);";
    return this.exec(sql, [accountId, amount]);
  },
  async createDepositFromBank({ userId, bankId, amount }) {
    const accountId = await this.getAccountByUserId(userId);
    const sql =
      "INSERT INTO `mydb`.`transactions`(`to`,`amount`) VALUES (?, ?);";
    return this.exec(sql, [accountId, amount]);
  },

  // contacts
  async getUserContacts(id) {
    const sql =
      "SELECT * FROM `mydb`.`contacts` WHERE `contacts`.`owner_id` = ?";
    return await this.exec(sql, [id]);
  },
  async getAllUsers(id) {
    const sql = "SELECT * FROM `mydb`.`users` WHERE `users`.`id` != ?";
    return this.exec(sql, [id]);
  },
  async addUserToContacts({ userId, contactId }) {
    const sql =
      "INSERT INTO `mydb`.`contacts` (`owner_id`, `contact_id`) VALUES (?,?);";
    return this.exec(sql, [userId, contactId]);
  },
  async depositToContact({ fromUserId, toUserId, amount }) {
    const fromAccountId = await this.getAccountByUserId(fromUserId);
    const toAccountId = await this.getAccountByUserId(toUserId);
    const sql =
      "INSERT INTO `mydb`.`transactions`(`from`,`to`,`amount`) VALUES (?, ?, ?);";
    return this.exec(sql, [fromAccountId, toAccountId, amount]);
  },
};

module.exports = driver;
