require("dotenv").config({ path: ".env.local" });

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
});

export default knex;
