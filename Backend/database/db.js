import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN);
    console.log('Mongodb Connection Successfully!!'.bgMagenta.white);
  } catch (error) {
    console.log('Mongodb Connection error', error.message);
  }
};

export default connectDB();
