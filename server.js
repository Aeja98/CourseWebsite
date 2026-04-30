
//Import modules
const express = require("express");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : undefined
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

//Start page & show courses
app.get("/", (req, res) => {
  const sql = "SELECT * FROM coursetable WHERE deleted = false ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send("Ett fel uppstod vid hämtning av kurser.");
    }

    res.render("index", {
      title: "Mina kurser",
      courses: results
    });
  });
});

//Add course page
app.get("/addcourse", (req, res) => {
  res.render("addcourse", {
    title: "Lägg till kurs",
    error: null,
    formData: {}
  });
});

//Add course form
app.post("/addcourse", (req, res) => {
  let { coursecode, coursename, syllabus, progression } = req.body;

  coursecode = coursecode?.trim();
  coursename = coursename?.trim();
  syllabus = syllabus?.trim();
  progression = progression?.trim().toUpperCase();

  //Server validation
  if (!coursecode || !coursename || !syllabus || !progression) {
    return res.render("addcourse", {
      title: "Lägg till kurs",
      error: "Alla fält måste fyllas i.",
      formData: { coursecode, coursename, syllabus, progression }
    });
  }

  const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
  if (!urlRegex.test(syllabus)) {
    return res.render("addcourse", {
      title: "Lägg till kurs",
      error: "Kursplan måste vara en giltig URL.",
      formData: { coursecode, coursename, syllabus, progression }
    });
  }

  const validProgression = ["A", "B", "C"];
  if (!validProgression.includes(progression)) {
    return res.render("addcourse", {
      title: "Lägg till kurs",
      error: "Progression måste vara A, B eller C.",
      formData: { coursecode, coursename, syllabus, progression }
    });
  }

  const sql = `
    INSERT INTO coursetable (coursecode, coursename, syllabus, progression, deleted)
    VALUES (?, ?, ?, ?, false)
  `;

  db.query(sql, [coursecode, coursename, syllabus, progression], (err) => {
    if (err) {
      return res.status(500).send("Ett fel uppstod vid lagring av kursen.");
    }

    res.redirect("/");
  });
});

//Delete course
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE coursetable SET deleted = true WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).send("Ett fel uppstod vid radering av kursen.");
    }

    res.redirect("/");
  });
});

//About page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Om sidan"
  });
});

//Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});