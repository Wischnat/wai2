let express = require("express");
const { getClient } = require("./connect");
let app = express();

app.get("/authors", async (req, res, next) => {
  const client = await getClient();

  const entries = await client.query("SELECT * FROM authors;");
  console.log(`Database entries for authors: ${entries.rowCount} row(s)`);
  console.log(Object.keys(entries.rows?.[0]).join("\t"));
  console.log(
    `${entries.rows.map((r) => Object.values(r).join("\t")).join("\n")}`
  );
  await client.end();
  res.json(entries.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
