# ✅ MONGODB CONFIGURED - FINAL SETUP

## 🎉 What Changed

Your backend now uses **real MongoDB database** with the exact connection you specified:

```javascript
mongodb://127.0.0.1:27017/iniq
```

## 🔧 Configuration

### Database Connection (db.js)
```javascript
const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/iniq");
    console.log("INIQ DB is connected");
  } catch (e) {
    console.log("Error in connecting to the db");
  }
};
```

### Server (server.js)
```javascript
const db = require('./config/db');
db.connect();  // Connects to MongoDB
```

## 🚀 HOW TO START

### ⚠️ IMPORTANT: Start MongoDB First!

#### Step 1: Start MongoDB
```bash
# Windows
mongod

# Or if installed as service
net start MongoDB
```

#### Step 2: Start Backend
```bash
cd "d:\internship part-2\backend"
npm start
```

**Expected Output:**
```
INIQ DB is connected ✅
✅ Server running in development mode on port 5000
🌐 Backend API: http://localhost:5000
📝 Demo Users: admin/admin123, user/user123
```

#### Step 3: Start Frontend
```bash
cd "d:\internship part-2\frontend"
npm run dev
```

## 🗄️ Database Structure

### Database: `iniq`
### Collection: `users`

**Schema:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## ✅ Features

### Data Persistence
- ✅ **Permanent Storage** - Data saved in MongoDB
- ✅ **Survives Restarts** - Data persists after server restart
- ✅ **Real Database** - Not in-memory storage

### Authentication
- ✅ **JWT Tokens** - Used for login and register
- ✅ **Password Hashing** - bcrypt with 10 rounds
- ✅ **Token Expiration** - 1 day validity
- ✅ **Secure Storage** - Passwords never stored in plain text

### User Flow
- ✅ **Register** - Create account → Saved to MongoDB
- ✅ **Login** - Verify credentials → Generate JWT token
- ✅ **Protected Routes** - Token verification on each request

## 🧪 Test the Complete Flow

### 1. Start MongoDB
```bash
mongod
```

### 2. Register New User
- Go to: http://localhost:3000
- Click "Sign Up"
- Fill form:
  ```
  Email: myemail@test.com
  Name: My Name
  Password: mypass123
  ```
- Complete registration
- ✅ User saved to MongoDB!

### 3. Check Database
```bash
mongosh
use iniq
db.users.find().pretty()
```

You'll see your registered user in the database!

### 4. Login with Same Credentials
- Go to login page
- Enter:
  ```
  Email: myemail@test.com
  Password: mypass123
  ```
- ✅ Login successful!

### 5. Restart Backend
```bash
# Stop backend (Ctrl+C)
# Start again
npm start
```

### 6. Login Again
- Your account still exists!
- Data persisted in MongoDB ✅

## 📊 MongoDB Commands

### View All Users
```bash
mongosh
use iniq
db.users.find()
```

### Count Users
```bash
db.users.countDocuments()
```

### Find Specific User
```bash
db.users.findOne({ email: "test@example.com" })
```

### Delete User
```bash
db.users.deleteOne({ email: "test@example.com" })
```

### Drop Collection
```bash
db.users.drop()
```

## 🔍 Verify MongoDB Connection

### Check if MongoDB is Running
```bash
# Windows
tasklist | findstr mongod

# Mac/Linux
ps aux | grep mongod
```

### Test Connection
```bash
mongosh
# If connected, you'll see MongoDB shell
```

## ⚠️ Troubleshooting

### Error: "Error in connecting to the db"
**Cause:** MongoDB is not running
**Solution:**
```bash
mongod
```

### Error: "MongoServerError: connect ECONNREFUSED"
**Cause:** MongoDB service not started
**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### MongoDB Not Installed?
**Download:** https://www.mongodb.com/try/download/community

**Installation Guide:**
- Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- Mac: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
- Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

## 📁 Modified Files

1. `backend/config/db.js` - MongoDB connection
2. `backend/server.js` - Uses db.connect()
3. `backend/controllers/authController.js` - Uses User model
4. `backend/middleware/authMiddleware.js` - Uses User model

## 🎯 Summary

✅ **MongoDB configured** with your exact connection string
✅ **Database:** `iniq`
✅ **Connection:** `mongodb://127.0.0.1:27017/iniq`
✅ **Data persistence** enabled
✅ **JWT tokens** working
✅ **Password hashing** working
✅ **Register/Login** flow complete

## 🚀 Quick Start Commands

```bash
# Terminal 1 - MongoDB
mongod

# Terminal 2 - Backend
cd backend && npm start

# Terminal 3 - Frontend
cd frontend && npm run dev
```

**Then open:** http://localhost:3000

---

## ✅ READY TO USE!

1. Start MongoDB: `mongod`
2. Start Backend: `cd backend && npm start`
3. Start Frontend: `cd frontend && npm run dev`
4. Open: http://localhost:3000
5. Register and login!

**Your app now uses real MongoDB database!** 🎉
