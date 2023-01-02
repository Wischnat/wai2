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

  addAuthor(firstname, lastname, age) {
    const author = this.knex('authors').insert({
      firstname: firstname,
      lastname: lastname,
      age: age
    }).returning(['author_id', 'firstname', 'lastname', 'age']);
    return author;
  }

  updateAuthor(author_id, updateValues) {
    const author = this.knex('authors').update(updateValues)
    .where('author_id', author_id).returning(['author_id', 'firstname', 'lastname', 'age']);
    return author;
  }

  deleteAuthor(author_id) {
    const author = this.knex('authors')
    .where('author_id', author_id).delete().returning(['author_id', 'firstname', 'lastname', 'age']);
    return author;
  }
}

module.exports = MyDatabase;