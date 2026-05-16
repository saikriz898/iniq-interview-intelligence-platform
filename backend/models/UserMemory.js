// In-memory user storage (temporary replacement for MongoDB)
const users = new Map();

// Pre-populate with demo users
const bcrypt = require('bcrypt');

const initDemoUsers = async () => {
    const demoUsers = [
        { email: 'admin', password: 'admin123', name: 'Sai Kriz', role: 'admin' },
        { email: 'user', password: 'user123', name: 'Aditi Sharma', role: 'user' },
        { email: 'user1', password: 'user123', name: 'Rahul Kumar', role: 'user' }
    ];

    for (const user of demoUsers) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        users.set(user.email, {
            _id: user.email,
            email: user.email,
            password: hashedPassword,
            name: user.name,
            role: user.role,
            createdAt: new Date()
        });
    }
};

initDemoUsers();

module.exports = {
    users,
    findOne: async (query) => {
        if (query.email) {
            return users.get(query.email) || null;
        }
        return null;
    },
    create: async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = {
            _id: userData.email,
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            createdAt: new Date()
        };
        users.set(userData.email, user);
        return user;
    },
    findById: async (id) => {
        return users.get(id) || null;
    }
};
