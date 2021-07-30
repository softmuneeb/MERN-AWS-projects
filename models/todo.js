const mongoose = require("mongoose");
const nestedObj = new mongoose.Schema({ field1: String });
const TodoSchema = new mongoose.Schema({
  record: {
    type: String,
    required: true,
  },
  date: { type: Number, default: 100 },
  obj: nestedObj,
});

const model = new mongoose.model("TodoModel", TodoSchema);
module.exports = model;
