const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  record: {
    type: {},
    required: true,
  },
  date: { type: Number, default: new Date() },
});

const Todo = new mongoose.model('TodoModel', TodoSchema);

const readRoyaltySettings = async () => {
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.find({ _id: '62d4f26ae0242c27a4e39ebf' });
  await mongoose.connection.close();
  console.log({ response: response[0].record });
  return response[0].record;
};

const saveRoyaltySettings = async (record) => {
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.updateOne({ _id: '62d4f26ae0242c27a4e39ebf' }, { record });
  await mongoose.connection.close();

  console.log({ response });
  return response;
};

// saveRoyaltySettings({ a: { c: "power", d: 2 }, b: { e: 3, f: 'hi' } });
readRoyaltySettings();
