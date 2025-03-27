// server/medusa/data/seed/seed.js
const seedProducts = require("./products"); // Import the products seeding function

module.exports = async function (container) {
  // Execute the product seeding function
  await seedProducts(container);
};

//const seedProducts = require("./products");

//module.exports = async function seed({ container }) {
//await seedProducts(container);
//};
