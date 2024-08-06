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
// Get Users
app.get("/users", (req, res) => {
  knex("user_info")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again.",
      })
    );
});

// Listen
app.listen(port, () =>
  console.log(`Server is up and running on port: ${port}`)
);
