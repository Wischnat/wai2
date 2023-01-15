let express = require("express");
let bodyParser = require("body-parser");

let app = express();
let jsonParser = bodyParser.json();

const initializeServer = async () => {
  app.use((req, res, next) => {
    console.info(`New request to ${req.path}`);
    next();
  });

  const knex = require("knex")({
    client: "pg",
    connection: {
      host: "rest-api-book-db",
      user: "postgres",
      password: "postgres",
      database: "book_db",
      debug: true,
    },
  });

  app.get("/book/:id", async (req, res, next) => {
    const book_id = req.params.id;
    knex
      .select("*")
      .from("books")
      .where({ book_id: book_id })
      .then((book) => {
        console.log(book[0]);
        res.json(book[0]);
      });
  });

  app.get("/books", async (req, res, next) => {
    knex
      .select("*")
      .from("books")
      .where("book_id", ">", "0")
      .then((books) => {
        console.log(books);
        res.json(books);
      });
  });

  app.post("/book", jsonParser, async (req, res, next) => {
    const { book } = req.body;
    knex("books")
      .insert(book)
      .returning(["book_id", "title", "author", "release_year"])
      .then((book) => {
        console.log(book[0]);
        res.json(book[0]);
      });
  });

  app.put("/book/:id", jsonParser, async (req, res, next) => {
    const book_id = req.params.id;
    const { updateValues } = req.body;
    knex("books")
      .update(updateValues)
      .where("book_id", book_id)
      .returning(["book_id", "title", "author", "release_year"])
      .then((book) => {
        console.log(book[0]);
        res.json(book[0]);
      });
  });

  app.delete("/book/:id", async (req, res, next) => {
    const book_id = req.params.id;
    knex("books")
      .where("book_id", book_id)
      .delete()
      .returning(["book_id", "title", "author", "release_year"])
      .then((book) => {
        console.log(book[0]);
        res.json(book[0]);
      });
  });

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
};

initializeServer();
