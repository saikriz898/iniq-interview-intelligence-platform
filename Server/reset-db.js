require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iniq';

const resetAndSeed = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');

        // Drop the whole database
        await mongoose.connection.db.dropDatabase();
        console.log('✅ Database dropped successfully');

        // Seed Admin
        await User.create({
            name: 'INIQ Admin',
            email: 'admin@gmail.com',
            password: 'Welcome@123',
            role: 'admin'
        });
        console.log('✅ Seeded Admin Account');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    }
};

resetAndSeed();
