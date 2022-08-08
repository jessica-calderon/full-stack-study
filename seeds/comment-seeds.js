// todo: add comment seeds for testing
const { Comment } = require("../models");

const commentdata = [
  {
    comment_text:
      "My personal challenges when I am coding is to not overthink it, I think I always complicate things because I am overthinking",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text:
      "My field of specialty would probably be doing front end and back end, but that could change in the future!",
    user_id: 8,
    post_id: 2,
  },
  {
    comment_text:
      "MVC is actually pretty neat system, it keeps things organized and easy to read and understand",
    user_id: 5,
    post_id: 3,
  },
  {
    comment_text:
      "ORM is a technique that lets you query and manipulate data from a database using an object-oriented paradigm.",
    user_id: 7,
    post_id: 4,
  },
  {
    comment_text:
      "Favorite framewors got to be the node.js, because it is easy to learn, and has a high performance. yes it can be difficult to learn but once you learn it its a blast!",
    user_id: 2,
    post_id: 5,
  },
  {
    comment_text:
      "It is important to share your feelings and your failures with others. its best practice is to let go of perfectionism. Always celebrate your successes! you will do great!",
    user_id: 1,
    post_id: 6,
  },
  {
    comment_text:
      "The best way is to get a bit of rest, and distract and then come back and continue coding. Music helps too and coffee sometimes too.",
    user_id: 4,
    post_id: 7,
  },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
