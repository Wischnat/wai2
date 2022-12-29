const { SQLDataSource } = require("datasource-sql");

class MyDatabase extends SQLDataSource {
  getAuthors() {
    return this.knex
      .select("*")
      .from("authors");
  }
}

module.exports = MyDatabase;