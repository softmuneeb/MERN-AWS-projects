const mongoose = require("mongoose");
const Todo = require("./models/todo");

// tutorial https://www.youtube.com/watch?v=5QEwqX5U_2M

// first install mongo db and robo T3
// https://robomongo.org/download
// https://www.mongodb.com/try/download/community

const init = async () => {
  mongoose.connect("mongodb://localhost/berry-db");
  await read();
  // await create();
  // await update();
  // await deleteRecord();
};

const read = async () => {
  const response = await Todo.find({});
  console.log({ response });
};

const create = async () => {
  const response = await Todo.create({ record: "Muneeb Khan", date: 200 });
  console.log({ response });
};

const update = async () => {
  const response = await Todo.updateOne({ record: "mzk" }, { record: "mzk.." });
  console.log({ response });
};

const deleteRecord = async () => {
  const response = await Todo.deleteOne({ record: "mzk.." });
  console.log({ response });
};

init();
