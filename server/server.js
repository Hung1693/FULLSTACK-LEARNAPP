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
    console.log("PostgresSQL Connected");
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
    res.send("Invalid username or password");
  }
});
//////////////////////////////////////////////////////////////

//*-----------------GET ALL POSTS FROM {username}-----------------*/
app.get("/dashboard/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const result = await pool.query(
      `select * from posts where username = $1;`,
      [username]
    );
    res.send({"success": true, "allPosts": result.rows } );
  } catch (err) {
    res.send("Error " + err);
  }
});
//-----------------------------------------------------------------/

//*-----------------DELETE POSTS FROM {username}-----------------*/
app.delete("/dashboard/:username/:post_id", async (req, res) => {
  const { username, post_id } = req.params;
  try {
    const result = await pool.query(
      `delete from posts where username = $1 and post_id = $2;`,
      [username, post_id]
    );
    res.send("Post deleted");
  } catch (err) {
    res.send("Error " + err);
  }
});
//---------------------------------------------------//
//*-----------------ADD POSTS FROM {username}-----------------*/
app.post("/dashboard/add/:username", async (req, res) => {
  const { username } = req.params;
  const { title, description, url, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO posts(title, description, url, status, username) VALUES($1, $2, $3, $4, $5) returning *;`,
      [title, description, url, status, username]
    );
    res.send(
    {"success": true, "post": result.rows[0]});
  } catch (err) {
    res.send("Error " + err);
  }
});
//---------------------------------------------------//

//*-----------------UPDATE POSTS FROM {username}-----------------*/
app.put("/dashboard/:username/:post_id", async (req, res) => {
  const { username, post_id } = req.params;
  const { title, description, url, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE posts SET title = coalesce($1, title), description = coalesce($2, description), url = coalesce($3, url), status = coalesce($4, status)
       WHERE username = $5 and post_id = $6 returning *;`,
      [title, description, url, status, username, post_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error " + err);
  }
});
//---------------------------------------------------//

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}.`);
});
