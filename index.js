const { Pool } = require("pg");

require("dotenv").config({
  path: `${__dirname}/.env`,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

module.exports = new Pool();
