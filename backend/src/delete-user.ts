import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function deleteUser() {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: process.env.MONGO_DB_NAME || 'assignmentBackend',
  });
  const r = await mongoose.connection.db!.collection('users').deleteOne({ email: 'snehakoshta1@gmail.com' });
  console.log('Deleted:', r.deletedCount);
  await mongoose.disconnect();
}
deleteUser();
