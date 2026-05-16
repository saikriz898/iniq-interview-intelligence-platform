# 🚀 START YOUR APP - 3 SIMPLE STEPS

## ❌ You Got "Access Denied" Error

**Don't worry! Use this simple method (NO ADMIN NEEDED):**

---

## ✅ METHOD 1: Double-Click to Start (EASIEST!)

### Step 1: Start MongoDB
**Double-click:** `START_MONGODB.bat`

**Keep this window open!**

### Step 2: Start Backend (New Terminal)
```bash
cd "D:\internship part-2\backend"
npm start
```

**Wait for:** `✅ INIQ DB is connected`

### Step 3: Start Frontend (New Terminal)
```bash
cd "D:\internship part-2\frontend"
npm run dev
```

**Open:** http://localhost:3000

---

## ✅ METHOD 2: Manual Commands

### Terminal 1: MongoDB
```bash
mkdir C:\data\db
mongod --dbpath "C:\data\db"
```
**Keep open!**

### Terminal 2: Backend
```bash
cd backend
npm start
```

### Terminal 3: Frontend
```bash
cd frontend
npm run dev
```

---

## ✅ METHOD 3: With Admin Rights

### Step 1: Open Command Prompt as Administrator
- Press **Windows Key**
- Type: `cmd`
- **Right-click** → "Run as administrator"

### Step 2: Start MongoDB Service
```bash
net start MongoDB
```

### Step 3: Start Backend (Regular Terminal)
```bash
cd "D:\internship part-2\backend"
npm start
```

### Step 4: Start Frontend (New Terminal)
```bash
cd "D:\internship part-2\frontend"
npm run dev
```

---

## 🔍 Check if MongoDB is Running

```bash
# Check service
sc query MongoDB

# Check port
netstat -ano | findstr :27017

# Connect to shell
mongosh
```

---

## 🎯 RECOMMENDED: Use Method 1

1. **Double-click:** `START_MONGODB.bat`
2. **New terminal:** `cd backend && npm start`
3. **New terminal:** `cd frontend && npm run dev`
4. **Open:** http://localhost:3000

**No admin rights needed!** 🚀

---

## ⚠️ Important

- **Keep MongoDB terminal open** while using the app
- **Don't close** the MongoDB window
- **Stop:** Press Ctrl+C in MongoDB terminal

---

## ✅ You're Ready!

**Just double-click `START_MONGODB.bat` and start your app!**
