require("dotenv").config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
  test: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
  production: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
};
