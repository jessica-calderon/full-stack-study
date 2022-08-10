const { Post } = require("../models");
const postdata = [
  {
    title: "Your personal challenges?",
    post_text:
      "Lets share what personal challenges you have when you are coding?",
    user_id: 8,
  },
  {
    title: "Your field of specialty? ",
    post_text: "Which field of web development do you want to work in?",
    user_id: 1,
  },
  {
    title: "Challenges on MVC?",
    post_text:
      "Lets share what challenges you have when you are working on MVC project?",
    user_id: 3,
  },
  {
    title: "ORM and OOP",
    post_text:
      "Please explain how you understand ORM and OOP? Lets share our knowledge about this topic!",
    user_id: 2,
  },
  {
    title: "Favorite frameworks?",
    post_text: "What frameworks do you love to work with?",
    user_id: 5,
  },
  {
    title: "Imposter syndrome in real life",
    post_text:
      "What are some powerful ways to combat programmer imposter syndrome? ",
    user_id: 4,
  },
  {
    title: "Always tired!",
    post_text:
      "What are some practical ways to stay alert and focused while coding?",
    user_id: 7,
  },
];
const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
