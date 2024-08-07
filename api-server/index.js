const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { findUserByUsername } = require("./findUser.js");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// GET all items
app.get("/items", (req, res) => {
  knex("items")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The items you are looking for could not be found. Please try again.",
      })
    );
});

// GET individual item by ID
app.get("/items/:id", (req, res) => {
  const { id } = req.params;
  knex("items")
    .where({ id })
    .first()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

// POST new item
app.post("/items", async function (req, res) {
  let newItem = req.body;
  try {
    const [id] = await knex("items").insert(newItem).returning("id");

    res.status(201).json({
      message: "item added",
      game: { ...newItem, id },
    });
  } catch (error) {
    console.error("error adding item:", error);
    res.status(500).json({
      message: "item not added",
      error: error.message,
      stack: error.stack,
    });
  }
});

// DELETE item by ID
app.delete("/items/:id", function (req, res) {
  const { id } = req.params;
  knex("items")
    .where({ id })
    .del()
    .then((data) => {
      if (data > 0) {
        res.status(204).json(data);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

// UPDATE item by ID
app.patch("/items/:id", function (req, res) {
  const { id } = req.params;
  const updatedInfo = req.body;
  knex("items")
    .where({ id })
    .update(updatedInfo)
    .then((data) => {
      if (data > 0) {
        res.status(204).json(data);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: err,
      })
    );
});

// POST new user
app.post("/users", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.log("Received request to make account:", req.body);
  // Grab any users with the input username
  const existingUser = await knex("user_info").where({ username });
  // If a user with that username already exists, exit
  if (existingUser.length > 0) {
    console.log(`${username} already exists and will not be created.`);
    res.status(409).send(`${username} already exists.`);
    return;
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Input the data to the user_info table
  await knex("user_info")
    .insert({
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: hashedPassword,
    })
    .then((data) => {
      console.log(`Username: ${username} was made successfully`);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(503).json({
        message: "Post request failed. Please try again.",
      });
    });
});

// POST for user login
// WILL NEED TO TEST USING FRONT END TO MAKE SURE IT WORKS
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login request:", req.body); // Add this line
  try {
    const user = await findUserByUsername(username);
    console.log("USER: ", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    console.log("MATCH: ", match);
    if (!match) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // Passwords match
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Listen
app.listen(port, () =>
  console.log(`Server is up and running on port: ${port}`)
);
