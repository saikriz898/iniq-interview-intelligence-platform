# 🚀 QUICK START - CREATE DB & CONNECT

## Step-by-Step Commands

### 1️⃣ Start MongoDB
```bash
mongod --dbpath "C:\data\db"
```
**Keep this terminal open!**

---

### 2️⃣ Create Database (New Terminal)
```bash
mongosh
```

Then run these commands:
```javascript
use iniq
db.createCollection("users")
db.users.createIndex({ email: 1 }, { unique: true })
show collections
exit
```

**Expected Output:**
```
switched to db iniq
{ ok: 1 }
users
```

---

### 3️⃣ Start Backend (New Terminal)
```bash
cd "D:\internship part-2\backend"
npm start
```

**Expected Output:**
```
✅ INIQ DB is connected
✅ Server running in development mode on port 5000
```

---

### 4️⃣ Start Frontend (New Terminal)
```bash
cd "D:\internship part-2\frontend"
npm run dev
```

**Expected Output:**
```
➜  Local:   http://localhost:3000/
```

---

### 5️⃣ Open Browser
```
http://localhost:3000
```

---

## 🔍 Verify Database

### Check Database Exists
```bash
mongosh
show dbs
```

You should see `iniq` in the list.

### Check Collection
```javascript
use iniq
show collections
```

You should see `users`.

### Check Indexes
```javascript
db.users.getIndexes()
```

You should see index on `email` field.

---

## 📋 All Commands in One Place

```bash
# Terminal 1: MongoDB
mongod --dbpath "C:\data\db"

# Terminal 2: Create DB
mongosh
use iniq
db.createCollection("users")
db.users.createIndex({ email: 1 }, { unique: true })
exit

# Terminal 3: Backend
cd "D:\internship part-2\backend"
npm start

# Terminal 4: Frontend
cd "D:\internship part-2\frontend"
npm run dev
```

---

## ✅ Success Indicators

### MongoDB Running:
```
[initandlisten] waiting for connections on port 27017
```

### Database Created:
```javascript
use iniq
// switched to db iniq
```

### Backend Connected:
```
✅ INIQ DB is connected
```

### Frontend Running:
```
➜  Local:   http://localhost:3000/
```

---

## 🧪 Test Registration

1. Go to: http://localhost:3000
2. Click "Sign Up"
3. Register:
   - Email: `test@example.com`
   - Name: `Test User`
   - Password: `test123`
4. Complete registration

### Verify in MongoDB:
```bash
mongosh
use iniq
db.users.find().pretty()
```

You should see your registered user!

---

## 🎯 Summary

**4 Terminals Needed:**

1. **MongoDB:** `mongod --dbpath "C:\data\db"`
2. **Setup DB:** `mongosh` → create database
3. **Backend:** `npm start`
4. **Frontend:** `npm run dev`

**Then open:** http://localhost:3000

---

**Your database is ready to use!** 🚀
