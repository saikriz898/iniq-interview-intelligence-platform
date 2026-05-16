# ❌ ERROR FIXED: MongoDB Connection

## 🔴 Error You're Getting
```
connect ECONNREFUSED 127.0.0.1:27017
```

## ✅ Solution

### MongoDB is NOT installed on your system.

## 🚀 QUICK FIX - 3 Steps

### Step 1: Download MongoDB
**Go to:** https://www.mongodb.com/try/download/community

**Select:**
- Platform: **Windows**
- Package: **MSI**
- Click **Download**

### Step 2: Install
1. Run the downloaded file
2. Choose **Complete** installation
3. ✅ Check "Install MongoDB as a Service"
4. Click Install

### Step 3: Start MongoDB
```bash
# Open Command Prompt (as Administrator)
net start MongoDB
```

## ✅ Then Start Your App

```bash
# Terminal 1 - Backend
cd backend
npm start

# You should see:
# ✅ INIQ DB is connected

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📋 Alternative: Manual Start

If service doesn't work:

```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB manually
mongod --dbpath "C:\data\db"
```

Keep this terminal open, then start your backend in another terminal.

## 🔍 Verify MongoDB is Running

```bash
# Check if MongoDB is running
sc query MongoDB

# Or connect to MongoDB shell
mongosh
```

## 📚 Full Guide

See **`INSTALL_MONGODB.md`** for complete installation instructions.

---

## 🎯 Summary

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install:** Choose "Complete" + "Install as Service"
3. **Start:** `net start MongoDB`
4. **Run App:** `npm start` in backend folder

**Your app will work once MongoDB is installed!** 🚀
