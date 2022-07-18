const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  record: {
    type: {},
    required: true,
  },
  date: { type: Number, default: new Date() },
});

const readRoyaltySettings = async () => {
  const Todo = new mongoose.model('TodoModel', TodoSchema);

  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.find({ _id: '62d4f26ae0242c27a4e39ebf' });
  await mongoose.connection.close();

  if (response.length === 0) return {};
  return response[0].record;
};

const saveRoyaltySettings = async (record) => {
  const Todo = new mongoose.model('TodoModel', TodoSchema);
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.updateOne({ _id: '62d4f26ae0242c27a4e39ebf' }, { record });
  await mongoose.connection.close();

  return response;
};

// (async () => {
//   // const data = await saveRoyaltySettings({ 1: 1 });
//   // console.log({ data });
//   // const data = await readRoyaltySettings();
//   // console.log({ data });
// })();

// module.exports = { readRoyaltySettings, saveRoyaltySettings };
