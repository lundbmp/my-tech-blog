const { User } = require('../models');

const userdata = [
  {
    username: 'testuser1',
    email: 'testuser1@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser2',
    email: 'testuser2@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser3',
    email: 'testuser3@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser4',
    email: 'testuser4@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser5',
    email: 'testuser5@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser6',
    email: 'testuser6@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser7',
    email: 'testuser7@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser8',
    email: 'testuser8@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser9',
    email: 'testuser9@gmail.com',
    password: 'password123'
  },
  {
    username: 'testuser10',
    email: 'testuser10@gmail.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
