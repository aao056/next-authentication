const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production" });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: "mysql2",
  connection: {
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
