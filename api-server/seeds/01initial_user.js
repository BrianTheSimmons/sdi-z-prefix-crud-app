/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_info").del();
  await knex("user_info").insert([
    {
      first_name: "John",
      last_name: "Doe",
      username: "jdoe24",
      password: "pass123",
    },
    {
      first_name: "Jane",
      last_name: "Doe",
      username: "jdoe2424",
      password: "pass456",
    },
    {
      first_name: "Mike",
      last_name: "Wazowski",
      username: "monsterman11",
      password: "scarytimes",
    },
  ]);
};
