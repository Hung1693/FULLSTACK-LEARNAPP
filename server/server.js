const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express(); //Initialized express
const cors = require("cors");
const { DATABASE_URL, NODE_ENV, PORT } = process.env;
const pool = require("./configs/database");
pool.connect((err) => {
  //Connected Database
  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from users;");
    res.send(result.rows);
  } catch (err) {
    res.send("Error " + err);
  }
});

//////////////REGISTER & LOGIN/////////////////////////
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      `select * from users where username = $1;`,
      [username]
    );
    if (result.rows.length === 0) {
      pool.query(
        `INSERT INTO users(username, password) VALUES($1, $2) returning *;`,
        [username, password],
        (data) => {}
      );
      return res.status(201).send("Success");
    } else {
      res.status(400).send("Username exists");
    }
  } catch (err) {
    res.send("Error" + err);
  }
});
/********************************************************/
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      `select * from users where username = $1;`,
      [username]
    );
    if (password === result.rows[0].password) {
      return res.send(result.rows[0]);
    } else {
      return res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    res.send("Error from server " + err);
  }
});
//////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Here we go, Engines started at ${PORT}.`);
});
