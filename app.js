const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config.json");
const auth = require("./router/auth");
const accounts = require("./router/accounts");
const contacts = require("./router/contacts");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", auth);
app.use("/api", accounts);
app.use("/api", contacts);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(config.port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
