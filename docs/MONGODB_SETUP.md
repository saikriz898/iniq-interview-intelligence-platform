# ✅ MONGODB CONFIGURED

## 🔧 Configuration Updated

Your backend now uses **MongoDB** with the connection:
```
mongodb://127.0.0.1:27017/iniq
```

## 🚀 How to Start

### Step 1: Start MongoDB
**You MUST start MongoDB before running the backend.**

#### Windows:
```bash
# Option 1: If MongoDB is installed as a service
net start MongoDB

# Option 2: Run manually
mongod
```

#### Mac:
```bash
# Using brew
brew services start mongodb-community

# Or manually
mongod --config /usr/local/etc/mongod.conf
```

#### Linux:
```bash
sudo systemctl start mongod
```

### Step 2: Start Backend
```bash
cd "d:\internship part-2\backend"
npm start
```

You should see:
```
INIQ DB is connected
✅ Server running in development mode on port 5000
```

### Step 3: Start Frontend
```bash
cd "d:\internship part-2\frontend"
npm run dev
```

## 📊 Database Details

- **Database Name:** `iniq`
- **Host:** `127.0.0.1` (localhost)
- **Port:** `27017` (default MongoDB port)
- **Connection String:** `mongodb://127.0.0.1:27017/iniq`

## 🗄️ Collections Created

When you register users, MongoDB will automatically create:
- **Collection:** `users`
- **Fields:** 
  - `_id` (auto-generated)
  - `name`
  - `email` (unique)
  - `password` (hashed)
  - `createdAt`
  - `updatedAt`

## ✅ Data Persistence

✅ **Data is now PERMANENT**
✅ Users registered will stay in database
✅ Data survives server restarts
✅ Real database storage

## 🧪 Test the Setup

### 1. Check MongoDB is Running
```bash
# Windows
tasklist | findstr mongod

# Mac/Linux
ps aux | grep mongod
```

### 2. Connect to MongoDB (Optional)
```bash
# Using MongoDB Shell
mongosh

# Then:
use iniq
db.users.find()
```

### 3. Register a User
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Register with:
   - Email: `test@example.com`
   - Name: `Test User`
   - Password: `test123`

### 4. Check Database
```bash
mongosh
use iniq
db.users.find().pretty()
```

You should see your registered user!

## ⚠️ Important Notes

### MongoDB Must Be Running
- Backend will NOT start without MongoDB
- You'll see error: "Error in connecting to the db"
- Start MongoDB first, then start backend

### No Demo Users
- Unlike in-memory mode, there are NO pre-loaded users
- You must register users through the signup page
- Or manually insert users into MongoDB

## 🔧 Troubleshooting

### Error: "Error in connecting to the db"
**Solution:** Start MongoDB
```bash
mongod
```

### Error: "MongoServerError: connect ECONNREFUSED"
**Solution:** MongoDB is not running. Start it:
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

## 📁 Files Modified

- `backend/config/db.js` - Updated connection method
- `backend/server.js` - Uses db.connect()
- `backend/controllers/authController.js` - Uses MongoDB User model
- `backend/middleware/authMiddleware.js` - Uses MongoDB User model

## 🎯 Summary

✅ MongoDB connection configured
✅ Database: `iniq`
✅ Connection: `mongodb://127.0.0.1:27017/iniq`
✅ Data persistence enabled
✅ Real database storage
✅ JWT tokens working
✅ Password hashing working

## 🚀 Quick Start

```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Backend
cd backend && npm start

# Terminal 3 - Start Frontend
cd frontend && npm run dev
```

Then open: http://localhost:3000

---

**MongoDB is now configured and ready to use!** 🎉
