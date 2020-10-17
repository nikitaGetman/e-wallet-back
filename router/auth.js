const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const User = require("../controllers/user");

router.post("/signin", (req, res) => {
  console.log(req.body);
  const token = User.signin(req.body);

  if (token) {
    res.send(token);
  } else {
    res.status(400).send({ status: "error", message: "Can not authorize" });
  }
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  const result = User.signup(req.body);
  const token = User.signin({
    password: req.body.password,
    login: req.body.email,
  });

  console.log(result, token);
  if (result && token) {
    res.send({ ...result, ...token });
  } else {
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/secret", checkAuth, (req, res) => {
  res.send(" this is protected route");
});

module.exports = router;
