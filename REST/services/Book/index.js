let express = require("express");
let app = express();
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
app.get("/books", (req, res, next) => {
  let array_books = [
    "Mission Impossible",
    "Pirates of Carribean",
    "Inception",
    "Gladiator",
    "The Terminal",
  ];
  res.json(array_books);
});
