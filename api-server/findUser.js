const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

const findUserByUsername = async (username) => {
  return await knex("user_info").where({ username }).first();
};

module.exports = {
  findUserByUsername,
};
