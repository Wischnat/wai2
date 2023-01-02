const { SQLDataSource } = require("datasource-sql");

class MyDatabase extends SQLDataSource {
  getBooks() {
    let result = this.knex
      .select("*")
      .from("books").where("book_id", '>', "0");
    return result;
  }

  getBookByID(book_id) {
    return this.knex
      .select("*")
      .from("books").where({book_id: book_id});
  }

  addBook(title, author, release_year) {
    const book = this.knex('books').insert({
      title: title,
      author: author,
      release_year: release_year
    }).returning(['book_id', 'title', 'author', 'release_year']);
    return book;
  }

  updateBook(book_id, updateValues) {
    const book = this.knex('books').update(updateValues)
    .where('book_id', book_id).returning(['book_id', 'title', 'author', 'release_year']);
    return book;
  }

  deleteBook(book_id) {
    const book = this.knex('books')
    .where('book_id', book_id).delete().returning(['book_id', 'title', 'author', 'release_year']);
    return book;
  }
}

module.exports = MyDatabase;