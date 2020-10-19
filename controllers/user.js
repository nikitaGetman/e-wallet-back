const dbDriver = require("../database/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { token } = require("../config.json");

const User = {
  signup: async ({ name, surname, password, email }) => {
    const salt = crypto.createHash("md5").update(email).digest("hex");
    const passwordHash = crypto
      .createHash("md5")
      .update(password + salt)
      .digest("hex");

    const params = {
      name,
      surname,
      login: email,
      password: passwordHash,
      salt,
    };

    const [rows, fields] = await dbDriver.createUser(params);

    return rows.affectedRows > 0;
  },
  signin: async ({ email, password }) => {
    if (!email || !password) return;

    const salt = crypto.createHash("md5").update(email).digest("hex");
    const passwordHash = crypto
      .createHash("md5")
      .update(password + salt)
      .digest("hex");

    const [rows, fields] = await dbDriver.authUser({
      login: email,
      password: passwordHash,
    });

    if (rows.length > 0) {
      const user = rows[0];
      const key = await jwt.sign({ id: user.id }, token);
      return { access: key };
    } else {
      return undefined;
    }
  },

  getProfileById: async (id) => {
    if (id === undefined) return;

    const [rows, fields] = await dbDriver.getProfileById(id);
    if (rows.length > 0) {
      return rows[0];
    } else return;
  },
};

module.exports = User;
