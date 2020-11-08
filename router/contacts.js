const express = require("express");
const router = express.Router();
const ContactsController = require("../controllers/contactsController");
const checkAuth = require("../middleware/checkAuth");

router.get("/contacts", checkAuth, async (req, res) => {
  const contacts = await ContactsController.getUserContacts(req.userId);

  if (contacts) {
    res.send({ contacts });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user contacts",
    });
  }
});

router.post("/contacts", checkAuth, async (req, res) => {
  const params = {
    userId: req.userId,
    contactId: req.contactId,
  };
  const result = await ContactsController.addUserToContacts(params);

  if (result) {
    res.send({ result });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot add user contacts",
    });
  }
});

router.get("/users", checkAuth, async (req, res) => {
  const users = await ContactsController.getUsers();

  if (users) {
    res.send({ users });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user contacts",
    });
  }
});

router.post("/contacts/deposit", checkAuth, async (req, res) => {
  const params = {};
  const users = await ContactsController.getUsers();

  if (users) {
    res.send({ users });
  } else {
    res.status(500).send({
      status: "error",
      message: "Cannot get user contacts",
    });
  }
});

module.exports = router;
