import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/deliveroo';

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to Database!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}
