const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config.json");
const auth = require("./router/auth");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", auth);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(config.port, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
