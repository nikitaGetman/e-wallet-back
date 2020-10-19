const express = require("express");
const router = express.Router();
const User = require("../controllers/user");
const checkAuth = require("../middleware/checkAuth");

router.post("/signin", async (req, res) => {
  const token = await User.signin(req.body);

  if (token) {
    res.send(token);
  } else {
    res.status(400).send({ status: "error", message: "Can not authorize" });
  }
});

router.post("/signup", async (req, res) => {
  const result = await User.signup(req.body);

  if (!result) {
    res.status(400).send({ status: "error", message: "Cannot create user" });
  }

  const token = await User.signin(req.body);

  if (result && token) {
    res.send({ ...token });
  } else {
    res.status(400).send({ status: "error", message: "Something went wrong" });
  }
});

router.get("/me", checkAuth, async (req, res) => {
  const user = await User.getProfileById(req.userId);
  if (user) {
    res.send({ ...user });
  } else {
    res.status(401).send({
      status: "error",
      message: "Cannot get current user. Unauthorize",
    });
  }
});

module.exports = router;
