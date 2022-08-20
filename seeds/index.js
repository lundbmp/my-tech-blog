const seedUsers = require('./user-seed');
const seedPosts = require('./post-seed');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  process.exit(0);
};

seedAll();
