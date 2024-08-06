const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

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
// WILL NEED FURTHER TESTING TO AVOID DUPLICATE USER ACCOUNTS
app.post("/users", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  console.log("Received request to make account:", req.body);
  // const existingUser = await knex("user_info").where(username);
  // if (existingUser) {
  //   console.log(`Username: ${username} already exist`);
  //   return;
  // }
  // const hashedPassword = await bcrypt.hash(password, 10);
  await knex("user_info")
    .insert({
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
    })
    .then((data) => {
      console.log(`Username: ${username} was made successfully`);
      res.status(201).send("User succesfully created!");
    })
    .catch((err) => {
      res.status(503).json({
        message: "Post request failed. Please try again.",
      });
    });
});

// Listen
app.listen(port, () =>
  console.log(`Server is up and running on port: ${port}`)
);
