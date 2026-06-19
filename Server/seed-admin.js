require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const User = require('./models/User');

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iniq';

const seedAdmin = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
        if (existingAdmin) {
            console.log('Admin already exists.');
        } else {
            // Seed Admin
            await User.create({
                name: 'INIQ Admin',
                email: 'admin@gmail.com',
                password: 'Welcome@123',
                role: 'admin'
            });
            console.log('✅ Seeded Admin Account');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
