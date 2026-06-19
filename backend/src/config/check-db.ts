import { connectDB } from './sequelize';
import './associations';
import User from '../modules/user/user.model';
import Store from '../modules/store/store.model';
import Rating from '../modules/rating/rating.model';

(async () => {
  await connectDB();

  const users = await User.find({}, { password: 0 }).lean();
  const stores = await Store.find().lean();
  const ratings = await Rating.find().lean();

  console.log('Users:', JSON.stringify(users, null, 2));
  console.log('Stores:', JSON.stringify(stores, null, 2));
  console.log('Ratings:', JSON.stringify(ratings, null, 2));
  process.exit();
})();
