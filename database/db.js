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

  async createUser(params) {
    const sql =
      "INSERT INTO `mydb`.`users` (`login`,`password`,`salt`,`name`,`surname`,`user_type`) VALUES(?,?,?,?,?,1);";

    const conn = await this.getConnection();
    return await conn.execute(sql, [
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

    const conn = await this.getConnection();
    return await conn.execute(sql, [login, password]);
  },
  async getProfileById(id) {
    const sql =
      "SELECT  `users`.`name`,`users`.`surname`,`users`.`login` FROM `mydb`.`users` WHERE `users`.`id` = ?; ";

    const conn = await this.getConnection();
    return await conn.execute(sql, [id]);
  },

  // закрытие подключения
  disconnect() {
    this.connection.end(function (err) {
      if (err) {
        return console.log("Ошибка: " + err.message);
      }
      console.log("Подключение закрыто");
    });
  },
};

module.exports = driver;
