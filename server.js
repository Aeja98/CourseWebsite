
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//Access my database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Juno2024!",
  database: "courses"
});

//connect to database - or return error mess
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

//Get all courses
app.get("/api/courses", (req, res) => {
  //filters rows + shows courses that havent been deleted
  db.query("SELECT * FROM coursetable WHERE deleted = false", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Get all deleted courses
app.get("/api/courses/deleted", (req, res) => {
  //filters rows that are deleted -> 
    //these dont show up on table unless restore btn is pressed
  db.query("SELECT * FROM coursetable WHERE deleted = true", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//Delete course
app.put("/api/courses/restore", (req, res) => {
  //resets all deleted courses 
  const sql = "UPDATE coursetable SET deleted = false WHERE deleted = true";
  db.query(sql, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "All deleted courses restored" });
  });
});
