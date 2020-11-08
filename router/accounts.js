const express = require("express");
const router = express.Router();
const AccountsController = require("../controllers/accountsController");
const checkAuth = require("../middleware/checkAuth");

router.get("/account", checkAuth, async (req, res) => {
  const account = await AccountsController.getUserAccount(req.userId);

  if (account) {
    res.send({ account });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user account",
    });
  }
});

router.get("/activity", checkAuth, async (req, res) => {
  const activity = await AccountsController.getUserActivity(req.userId);

  if (activity) {
    res.send({ activity });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user activity",
    });
  }
});

router.post("/account/deposit", checkAuth, async (req, res) => {
  const params = {
    userId: req.userId,
    account: req.account,
    bankId: req.bankId,
    cardId: req.cardId,
  };

  const result = await AccountsController.createDeposit(params);

  if (result) {
    res.send({ status: "OK" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot create deposit",
    });
  }
});

router.get("/cards", checkAuth, async (req, res) => {
  const cards = await AccountsController.getCardsByUserId(req.userId);

  if (cards) {
    res.send({ cards });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user cards",
    });
  }
});

router.post("/cards/add", checkAuth, async (req, res) => {
  const params = {
    userId: req.userId,
    number: req.number,
    cvc: req.cvc,
    expireMonth: req.expireMonth,
    expireYear: req.expireYear,
    holderName: req.holderName,
  };

  const result = await AccountsController.addCardToUser(params);

  if (result) {
    res.send({ status: "OK" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot add card to user",
    });
  }
});

router.get("/banks", checkAuth, async (req, res) => {
  const banks = await AccountsController.getBanksByUserId(req.userId);

  if (banks) {
    res.send({ banks });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user banks",
    });
  }
});

router.post("/banks/add", checkAuth, async (req, res) => {
  const params = {
    userId: req.userId,
    account: req.account,
    bankName: req.bankName,
  };

  const result = await AccountsController.addBankToUser(params);

  if (result) {
    res.send({ status: "OK" });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot add bank to user",
    });
  }
});

module.exports = router;
