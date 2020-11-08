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
    const sql = "";
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
    const sql = "";
    return this.exec(sql, [
      number,
      cvc,
      expireMonth,
      expireYear,
      holderName,
      userId,
    ]);
  },
  async getBanksByUserId(id) {
    const sql = "";
    return this.exec(sql, [id]);
  },
  async addBankToUser({ account, bankName, userId }) {
    const sql = "";
    return this.exec(sql, [account, bankName, userId]);
  },

  async getUserAccount(id) {
    const sql = "";
    return this.exec(sql, [id]);
  },
  async getUserActivity(id) {
    const sql = "";
    return this.exec(sql, [id]);
  },

  async createDepositFromCard({ userId, cardId, amount }) {
    const sql = "";
    return this.exec(sql, [userId, cardId, amount]);
  },
  async createDepositFromBank({ userId, bankId, amount }) {
    const sql = "";
    return this.exec(sql, [userId, bankId, amount]);
  },

  // contacts
  async getUserContacts(id) {
    const sql = "";
    return await this.exec(sql, [id]);
  },
  async getAllUsers() {
    const sql = "";
    return this.exec(sql);
  },
  async addUserToContacts({ userId, contactId }) {
    const sql = "";
    return this.exec(sql, [userId, contactId]);
  },
  async depositToContact({ fromUserId, toUserId, amount }) {
    const sql = "";
    return this.exec(sql, [fromUserId, toUserId, amount]);
  },
};

module.exports = driver;
