const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  record: {
    type: {},
    required: true,
  },
  date: { type: Number, default: new Date() },
});

const readRoyaltySettings = async (mode = 'normal') => {
  const Todo = new mongoose.model('TodoModel', TodoSchema);

  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.find({ _id: '62d4f26ae0242c27a4e39ebf' });
  await mongoose.connection.close();

  console.log({ response });

  if (mode === 'normal') {
    if (response.length === 0) return {};
    return response[0].record;
  } else return response[0];
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

(async () => {
  const data = await readRoyaltySettings();
  console.log({ data });

  // await saveRoyaltySettings(data);
})();

// module.exports = { readRoyaltySettings, saveRoyaltySettings };
