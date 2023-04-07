const { Client } = require("pg");

const DB_NAME = "fitness-tracker"; 

const DB_URL = `postgres://localhost:5432/${DB_NAME}`

const client = new Client(DB_URL);

module.exports = client;