import { connectDB } from './sequelize';
import User from '../modules/user/user.model';
import Store from '../modules/store/store.model';
import Rating from '../modules/rating/rating.model';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    await User.deleteMany({});
    await Store.deleteMany({});
    await Rating.deleteMany({});

    const hash = (pw: string) => bcrypt.hash(pw, 10);

    const admin = await User.create({ name: 'System Administrator User', email: 'admin@example.com', password: await hash('Admin@123'), address: '123 Admin Street, Admin City, AC 12345', role: UserRole.ADMIN });
    const owner1 = await User.create({ name: 'Rahul Sharma Owner Store', email: 'owner1@example.com', password: await hash('Owner@123'), address: '45 Market Road, Bangalore, KA 560001', role: UserRole.STORE_OWNER });
    const owner2 = await User.create({ name: 'Priya Patel Owner Store', email: 'owner2@example.com', password: await hash('Owner@123'), address: '78 Gandhi Nagar, Mumbai, MH 400001', role: UserRole.STORE_OWNER });
    const owner3 = await User.create({ name: 'Amit Singh Owner Store', email: 'owner3@example.com', password: await hash('Owner@123'), address: '12 Nehru Place, Delhi, DL 110001', role: UserRole.STORE_OWNER });
    const user1 = await User.create({ name: 'Sneha Gupta Customer User', email: 'user1@example.com', password: await hash('User@1234'), address: '22 Park Street, Kolkata, WB 700001', role: UserRole.USER });
    const user2 = await User.create({ name: 'Vikram Reddy Customer User', email: 'user2@example.com', password: await hash('User@1234'), address: '33 Lake View, Chennai, TN 600001', role: UserRole.USER });
    const user3 = await User.create({ name: 'Anjali Nair Customer User', email: 'user3@example.com', password: await hash('User@1234'), address: '55 MG Road, Hyderabad, TG 500001', role: UserRole.USER });
    console.log('Users created');

    const store1 = await Store.create({ name: 'Reliance Digital Electronics Store', email: 'reliance.digital@example.com', address: '100 Electronics Market, Bangalore', ownerId: owner1._id });
    const store2 = await Store.create({ name: 'Big Bazaar Fashion Retail Store', email: 'bigbazaar.fashion@example.com', address: '200 Fashion Street, Mumbai', ownerId: owner2._id });
    const store3 = await Store.create({ name: 'DMart Grocery Supermarket Store', email: 'dmart.grocery@example.com', address: '300 Grocery Lane, Delhi', ownerId: owner3._id });
    const store4 = await Store.create({ name: 'Croma Digital Appliances Store', email: 'croma.appliances@example.com', address: '400 Tech Hub, Bangalore', ownerId: owner1._id });
    console.log('Stores created');

    const ratings = [
      { userId: user1._id, storeId: store1._id, rating: 4 },
      { userId: user2._id, storeId: store1._id, rating: 5 },
      { userId: user3._id, storeId: store1._id, rating: 3 },
      { userId: user1._id, storeId: store2._id, rating: 5 },
      { userId: user2._id, storeId: store2._id, rating: 4 },
      { userId: user3._id, storeId: store3._id, rating: 2 },
      { userId: user1._id, storeId: store3._id, rating: 3 },
      { userId: user2._id, storeId: store4._id, rating: 4 },
      { userId: user3._id, storeId: store4._id, rating: 5 },
      { userId: user1._id, storeId: store4._id, rating: 4 },
    ];
    await Rating.insertMany(ratings);
    console.log('Ratings created');

    console.log('SEED COMPLETE');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
