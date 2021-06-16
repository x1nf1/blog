'use strict';

class Database {
  constructor() {
    this.host = process.env.MYSQL_HOST;
    this.port = process.env.MYSQL_PORT;
    this.user = process.env.MYSQL_USER;
    this.password = process.env.MYSQL_PASSWORD;
    this.database = process.env.MYSQL_DATABASE;
  }
}

module.exports = new Database();
