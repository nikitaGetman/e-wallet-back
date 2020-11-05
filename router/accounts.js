const express = require("express");
const router = express.Router();
const CardAccounts = require("../controllers/cardAccounts");
const BankAccounts = require("../controllers/bankAccounts");
const checkAuth = require("../middleware/checkAuth");

router.get("/cards", checkAuth, async (req, res) => {
  const cards = await CardAccounts.getCardsByUserId(req.userId);

  if (cards) {
    res.send({ ...cards });
  } else {
    res.status(401).send({
      status: "error",
      message: "Cannot get user cards. Unauthorize",
    });
  }
});

router.get("/banks", checkAuth, async (req, res) => {
  const banks = await BankAccounts.getBanksById(req.userId);

  if (banks) {
    res.send({ ...banks });
  } else {
    res.status(401).send({
      status: "error",
      message: "Cannot get user banks. Unauthorize",
    });
  }
});

module.exports = router;
