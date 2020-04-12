require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = process.env.PORT;
const knex = require("knex");
const { Model } = require("objection");
const cors = require("cors");
const knexConfig = require("./knexfile");

if (process.env.NODE_ENV === "development") {
  Model.knex(knex(knexConfig.development));
} else {
  Model.knex(knex(knexConfig.production));
}
app.use(cors());
app.use(bodyParser.json({ extended: true, limit: "10000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10000mb" }));
app.use(express.static("public"));

const routers = require("./routes");

app.use(routers);
app.listen(port, "localhost");
