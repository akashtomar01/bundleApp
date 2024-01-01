import mongoose from "mongoose"
const dbURI = 'mongodb://127.0.0.1:27017/bundleapp'; // Replace with your MongoDB URI

function db (){
  mongoose.set('strictQuery', false);
    mongoose.connect(dbURI)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.log('MongoDB connection error:', err);
    });
}

export default db;