const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const TodoSchema = new mongoose.Schema({
  record: {
    type: {},
    required: true,
  },
  date: { type: Number, default: new Date() },
});

const readBook = async (_id) => {
  const mode = 'normal';

  const Todo = new mongoose.model('TodoModel', TodoSchema);

  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.find({ _id });
  await mongoose.connection.close();

  // console.log({ response });

  if (mode === 'normal') {
    if (response.length === 0) return null;
    return response[0].record;
  } else return response[0];
};

const writeBook = async (_id, record) => {
  const Todo = new mongoose.model('TodoModel', TodoSchema);
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.updateOne({ _id }, { record });
  await mongoose.connection.close();

  return response;
};

const createBook = async (record) => {
  const Todo = new mongoose.model('TodoModel', TodoSchema);
  mongoose.connect('mongodb+srv://User123:pakistan0047@verysmallcluster.gq04lby.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const response = await Todo.create({ record });
  console.log({ response });
  await mongoose.connection.close(); // TODO: can we omit await

  return response;
};

// createBook({balance: '0'});
// (async () => {
//   const data = await readBook();
//   console.log({ data });

//   // const data = { msg: 'hi' };
//   // await writeBook(data);
// })();

module.exports = { readBook, writeBook };
