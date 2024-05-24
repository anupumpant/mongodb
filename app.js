const express = require("express");
const { connectToDb, getDb } = require("./local_db");
const { get } = require("https");

let db;

const app = express();

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app is listening on port 3000");
    });
    db = getDb();
  }
});

app.get("/classes", (req, res) => {
  let classes = [];
  db.collection("classes")
    .find()
    .sort({ name: 1 })
    .forEach((item) => {
      classes.push(item);
    })
    .then(() => res.status(200).json(classes))
    .catch((err) => res.status(500).json({ error: "couldn't fetch" }));
});
