# ✅ FIX: Access Denied Error

## 🔴 Error You're Getting
```
System error 5 has occurred.
Access is denied.
```

## ✅ Solution: Run as Administrator

### Method 1: Command Prompt as Admin (Recommended)

1. **Press Windows Key**
2. **Type:** `cmd`
3. **Right-click** on "Command Prompt"
4. **Click:** "Run as administrator"
5. **Run:**
   ```bash
   net start MongoDB
   ```

### Method 2: PowerShell as Admin

1. **Press Windows Key**
2. **Type:** `powershell`
3. **Right-click** on "Windows PowerShell"
4. **Click:** "Run as administrator"
5. **Run:**
   ```bash
   net start MongoDB
   ```

### Method 3: Check if MongoDB is Already Running

```bash
# Run this (no admin needed)
sc query MongoDB
```

**If you see:**
```
STATE: 4 RUNNING
```
MongoDB is already running! Just start your backend.

### Method 4: Start MongoDB Manually (No Admin Needed)

```bash
# Create data directory (if not exists)
mkdir C:\data\db

# Start MongoDB manually
mongod --dbpath "C:\data\db"
```

**Keep this terminal open!** Then start your backend in a new terminal.

## 🚀 After MongoDB Starts

### Terminal 1: MongoDB is Running
```bash
# Either service is running or mongod is running manually
```

### Terminal 2: Start Backend
```bash
cd "D:\internship part-2\backend"
npm start
```

**Expected Output:**
```
✅ INIQ DB is connected
✅ Server running in development mode on port 5000
```

### Terminal 3: Start Frontend
```bash
cd "D:\internship part-2\frontend"
npm run dev
```

## 🔍 Verify MongoDB is Running

### Check Service Status (No Admin Needed)
```bash
sc query MongoDB
```

### Check if Port 27017 is in Use
```bash
netstat -ano | findstr :27017
```

If you see output, MongoDB is running!

### Connect to MongoDB Shell
```bash
mongosh
```

If it connects, MongoDB is working!

## 📋 Quick Commands

### Start MongoDB (Admin Required)
```bash
# Run Command Prompt as Administrator
net start MongoDB
```

### Stop MongoDB (Admin Required)
```bash
net stop MongoDB
```

### Check Status (No Admin Required)
```bash
sc query MongoDB
```

### Manual Start (No Admin Required)
```bash
mongod --dbpath "C:\data\db"
```

## ✅ Recommended Approach

**Use Manual Start (Easiest):**

1. Open regular Command Prompt (no admin needed)
2. Run:
   ```bash
   mkdir C:\data\db
   mongod --dbpath "C:\data\db"
   ```
3. Keep this terminal open
4. Open new terminal for backend:
   ```bash
   cd backend
   npm start
   ```
5. Open another terminal for frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## 🎯 Summary

**Option A: Service (Needs Admin)**
```bash
# Run as Administrator
net start MongoDB
```

**Option B: Manual (No Admin Needed)**
```bash
# Regular terminal
mongod --dbpath "C:\data\db"
```

**Then start your app:**
```bash
cd backend && npm start
cd frontend && npm run dev
```

---

**Use Option B (Manual) if you don't have admin access!** 🚀
