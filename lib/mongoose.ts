import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('Missing mongo db url');
  }

  if (isConnected) {
    return console.log('Mongo db is already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'DevOverflow',
    });

    isConnected = true;
    console.log('Mognodb connected');
  } catch (error) {
    console.log('Error connecting to mongodb', error);
  }
};
