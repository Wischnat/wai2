let express = require("express");
let app = express();
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
app.get("/movies", (req, res, next) => {
  let array_movies = [
    "Mission Impossible",
    "Pirates of Carribean",
    "Inception",
    "Gladiator",
    "The Terminal",
  ];
  res.json(array_movies);
});
