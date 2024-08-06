/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_info", (table) => {
    table.increments("id").primary;
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_info");
};
