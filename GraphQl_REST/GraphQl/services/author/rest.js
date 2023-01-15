// https://www.apollographql.com/docs/apollo-server/data/fetching-data/#creating-data-source-classes
// const RESTDataSource = require("@apollo/datasource-rest");
const http = require("http");

class AuthorAPI {
  baseURL = "http://rest-gateway";

  async getAuthors() {
    const options = {
      hostname: "localhost",
      port: 80,
      path: "/authors",
      method: "GET",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        Connection: "keep-alive",
        Host: "localhost",
        "If-None-Match": `W/"1d456-wQakIC314Cb95VmMijIyYoEWYEc"`,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": 1,
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
      },
    };

    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on("data", (d) => {
        console.log(d);
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  }

  async getAuthorByID(author_id) {
    // return await this.get(`/author/${encodeURIComponent(author_id)}`);
  }

  async addAuthor(firstname, lastname, age) {
    // const data = await this.post("/author", {
    //   body: {
    //     author: {
    //       firstname: firstname,
    //       lastname: lastname,
    //       age: age,
    //     },
    //   },
    // });
    // return data.results;
  }

  async updateAuthor(author_id, updateValues) {
    // const data = await this.put(`/author/${encodeURIComponent(author_id)}`, {
    //   body: { updateValues },
    // });
    // return data.results;
  }

  async deleteAuthor(author_id) {
    // return await this.delete(`/author/${encodeURIComponent(author_id)}`);
  }
}

module.exports = AuthorAPI;
