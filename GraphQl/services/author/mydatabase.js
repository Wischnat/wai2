const { SQLDataSource } = require("datasource-sql");

class MyDatabase extends SQLDataSource {
  getAuthors() {
    let result = this.knex
      .select("*")
      .from("authors").where("author_id", '>', "0");
    return result;
  }

  getAuthorByID(author_id) {
    return this.knex
      .select("*")
      .from("authors").where({author_id: author_id});
  }
}

module.exports = MyDatabase;