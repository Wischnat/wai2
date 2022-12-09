let express = require("express");
let app = express();

app.get("/actors", (req, res, next) => {
  let array_actors = [
    "Tom Cruise",
    "Johnny Depp",
    "Di Caprio",
    "Russel Crowe",
    "Tom Hanks",
  ];
  res.json(array_actors);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
