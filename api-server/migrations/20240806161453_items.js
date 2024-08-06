/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary;
    table.integer("user_id").unsigned;
    table.foreign("user_id").references("id").inTable("user_info");
    table.string("item_name").notNullable();
    table.string("description").notNullable();
    table.integer("quantity").unsigned;
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("items", (table) => {
      table.dropForeign("user_id");
    })
    .then(function () {
      return knex.schema.dropTableIfExists("items");
    });
};
