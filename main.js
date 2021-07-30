const mongoose = require("mongoose");
const Todo = require("./models/todo");

// tutorial https://www.youtube.com/watch?v=5QEwqX5U_2M

// first install mongo db and robo T3
// https://robomongo.org/download
// https://www.mongodb.com/try/download/community

const init = async () => {
  mongoose.connect("mongodb://localhost/berry-db");
  // await create();
  await read();
};

const create = async () => {
  const response = await Todo.create({ record: "Muneeb 1" });
  console.log({ response });
};

const read = async () => {
  const response = await Todo.find({});
  console.log({ response });
};

init();
