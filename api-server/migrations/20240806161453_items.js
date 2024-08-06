/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary;
    table.integer("userid").notNullable();
    table.foreign("userid").references("id").inTable("user_info");
    table.string("itemname").notNullable();
    table.string("description").notNullable();
    table.integer("quantity").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
