/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_info").del();
  await knex("user_info").insert([
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      username: "jdoe24",
      password: "pass123",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Doe",
      username: "jdoe2424",
      password: "pass456",
    },
    {
      id: 3,
      firstname: "Mike",
      lastname: "Wazowski",
      username: "monsterman11",
      password: "scarytimes",
    },
  ]);
};
