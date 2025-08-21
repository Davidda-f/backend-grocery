const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URL;

// const connectDb = async () => {
//   try {
//     await mongoose.connect(mongo_url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }).then(()=> console.log('Database connected successfully'));
//   }catch (error) {
//     console.log('Mongo connection error');
//   }
// }

const connectDb = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};

module.exports = connectDb;