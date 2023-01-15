const RESTDataSource = require("@apollo/datasource-rest");

class BookAPI extends RESTDataSource.RESTDataSource {
  baseURL = "http://localhost:8080";
  

  async getBooks() {
    return await this.get(`/books`);
  }

  async getBookByID(book_id) {
    return await this.get(`/book/${encodeURIComponent(book_id)}`);
  }

  async addBook(title, author, release_year) {
    const data = await this.post("/book", {
      body: {
        book: {
          title: title,
          author: author,
          release_year: release_year,
        },
      },
    });
    return data.results;
  }

  async updateBook(book_id, updateValues) {
    const data = await this.put(`/book/${encodeURIComponent(book_id)}`, {
      body: { updateValues },
    });
    return data.results;
  }

  async deleteBook(book_id) {
    return await this.delete(`/book/${encodeURIComponent(book_id)}`);
  }
}

module.exports = BookAPI;
