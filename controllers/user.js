const dbDriver = require("../database/db");

const User = {
  signup: ({ name, surname, password, email }) => {
    return { name: "Ivan", surname: "Ivanov" };
  },
  signin: ({ login, password }) => {
    if (login === "user" && password === "123") {
      return { token: "123123" };
    }
    return false;
  },
};

module.exports = User;
