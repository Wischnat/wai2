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
      host: "api-author-db",
      user: "postgres",
      password: "postgres",
      database: "author_db",
      debug: true,
    },
  });

  app.get("/author/:id", async (req, res, next) => {
    const author_id = req.params.id;
    knex
      .select("*")
      .from("authors")
      .where({ author_id: author_id })
      .then((author) => {
        console.log(author[0]);
        res.json(author[0]);
      });
  });

  app.get("/authors", async (req, res, next) => {
    knex
      .select("*")
      .from("authors")
      .where("author_id", ">", "0")
      .then((authors) => {
        console.log(authors);
        res.json(authors);
      });
  });

  app.post("/author", jsonParser, async (req, res, next) => {
    const { author } = req.body;
    knex("authors")
      .insert(author)
      .returning(["author_id", "firstname", "lastname", "age"])
      .then((author) => {
        console.log(author[0]);
        res.json(author[0]);
      });
  });

  app.put("/author/:id", jsonParser, async (req, res, next) => {
    const author_id = req.params.id;
    const { updateValues } = req.body;
    knex("authors")
      .update(updateValues)
      .where("author_id", author_id)
      .returning(["author_id", "firstname", "lastname", "age"])
      .then((author) => {
        console.log(author[0]);
        res.json(author[0]);
      });
  });

  app.delete("/author/:id", async (req, res, next) => {
    const author_id = req.params.id;
    knex("authors")
      .where("author_id", author_id)
      .delete()
      .returning(["author_id", "firstname", "lastname", "age"])
      .then((author) => {
        console.log(author[0]);
        res.json(author[0]);
      });
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

initializeServer();
