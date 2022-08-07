const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    username: "jwilloughway1",
    email: "willoughway1@fake.com",
    password: "password123",
  },
  {
    username: "Ana",
    email: "Ana1@fake.com",
    password: "password12",
  },
  {
    username: "Emily",
    email: "Emily1@fake.com",
    password: "password1",
  },
  {
    username: "Daryllbae",
    email: "daryllbae@fake.com",
    password: "password",
  },
  {
    username: "melania",
    email: "melania@fake.com",
    password: "pass1",
  },
  {
    username: "girlpower",
    email: "girlpower@fake.com",
    password: "pass12",
  },
  {
    username: "codingfun",
    email: "codingfun1@fake.com",
    password: "pass1234",
  },
  {
    username: "Elena",
    email: "Elena@fake.com",
    password: "secret1234",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
