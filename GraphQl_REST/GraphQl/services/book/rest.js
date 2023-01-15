// const RESTDataSource = require("@apollo/datasource-rest");
const http = require("http");

class BookAPI {
  baseURL = "http://rest-gateway";

  async getBooks() {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "rest-gateway",
        port: 8080,
        path: "/books",
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Host: "rest-gateway",
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
        let responseData = "";
        res.on("data", (chunk) => {
          console.log("test3");
          responseData += chunk;
        });
        res.on("end", () => {
          const array = Array.from(JSON.parse(responseData.toString()));
          resolve(array);
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.end();
    });
  }

  async getBookByID(book_id) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "rest-gateway",
        port: 8080,
        path: `/book/${encodeURIComponent(book_id)}`,
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Host: "rest-gateway",
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
        let responseData = "";
        res.on("data", (chunk) => {
          console.log("test3");
          responseData += chunk;
        });
        res.on("end", () => {
          const json = JSON.parse(responseData.toString());
          resolve(json);
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.end();
    });
  }

  async addBook(title, author, release_year) {
    return new Promise((resolve, reject) => {
      const data = {
        book: {
          title: title,
          author: author,
          release_year: release_year,
        },
      };
      const options = {
        hostname: "rest-gateway",
        port: 8080,
        path: "/book",
        method: "POST",
        // body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(data).length,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Host: "rest-gateway",
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
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          const json = JSON.parse(responseData.toString());
          resolve(json);
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.write(JSON.stringify(data));
      req.end();
    });
  }

  async updateBook(book_id, updateValues) {
    return new Promise((resolve, reject) => {
      const data = { updateValues };
      const options = {
        hostname: "rest-gateway",
        port: 8080,
        path: `/book/${encodeURIComponent(book_id)}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(data).length,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Host: "rest-gateway",
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
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          const json = JSON.parse(responseData.toString());
          resolve(json);
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.write(JSON.stringify(data));
      req.end();
    });
  }

  async deleteBook(book_id) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "rest-gateway",
        port: 8080,
        path: `/book/${encodeURIComponent(book_id)}`,
        method: "DELETE",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          Host: "rest-gateway",
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
        let responseData = "";
        res.on("data", (chunk) => {
          responseData += chunk;
        });
        res.on("end", () => {
          let json;
          if (responseData == "") {
            json = {
              book_id: -1,
              title: null,
              author: null,
              release_year: null,
            };
          } else {
            json = JSON.parse(responseData.toString());
          }
          console.log(json);
          resolve(json);
        });
      });
      req.on("error", (error) => {
        reject(error);
      });
      req.end();
    });
  }
}

module.exports = BookAPI;
