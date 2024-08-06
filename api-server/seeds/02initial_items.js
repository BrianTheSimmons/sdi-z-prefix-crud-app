/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      user_id: 1,
      item_name: "Thingamajig",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      quantity: 12,
    },
    {
      user_id: 1,
      item_name: "Bouncy stuff",
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit.",
      quantity: 2,
    },
    {
      user_id: 2,
      item_name: "Doohicky",
      description:
        "Lorem ipsum odor amet, consectetuer adipiscing elit. Posuere condimentum arcu diam mus dapibus platea praesent adipiscing.",
      quantity: 34,
    },
  ]);
};
